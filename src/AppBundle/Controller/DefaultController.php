<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Good;
use AppBundle\Entity\OrderGood;
use AppBundle\Entity\Torder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends BaseController
{
    /**
     * @Route("/", name="homepage", options = {"expose": true})
     * @param Request $request
     * @return mixed
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/home.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR
        ]);
    }

    /**
     * @Route("/catalog", name="catalog", options = {"expose": true})
     * @param Request $request
     * @return mixed
     */
    public function catalogAction(Request $request)
    {

        $em = $this->getEm();
        $qb = $em->createQueryBuilder();

        $qb->select('good')->from('AppBundle\Entity\Good', 'good');

        /** @var Good[] $goods */
        $goods = $qb->getQuery()->getResult();

        return $this->render('default/catalog.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR,
            'goods' => $goods
        ]);
    }

    /**
     * @Route("/basket", name="basket", options ={"expose" : true})
     * @param Request $request
     * @return mixed
     */
    public function basketAction(Request $request)
    {

        $user = $request->get('user');

        if ($user === 'admin') {
            $userId = 2;
        } else {
            $userId = 1;
        }

        $em = $this->getEm();
        $basketGoods = [];

        /** @var Torder $unsuccessfullOrder */
        $unsuccessfullOrder = $em->getRepository('AppBundle\Entity\Torder')->findOneBy(['closedAt' => null], ['createdAt' => 'DESC']);

        if ($unsuccessfullOrder) {
            $qb = $em->createQueryBuilder();
            $qb->select('orderGood')
                ->from('AppBundle\Entity\OrderGood', 'orderGood')
                ->innerJoin('AppBundle\Entity\Torder', 'torder', 'WITH')
                ->andWhere($qb->expr()->eq('orderGood.order', $unsuccessfullOrder->getId()))
                ->andWhere($qb->expr()->eq('torder.user', $userId));

            $basketGoods = $qb->getQuery()->getResult();
        }

//        print_r(count($basketGoods));
//        die;


        return $this->render('default/basket.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR,
            'basketGoods' => $basketGoods
        ]);
    }

    /**
     * @Route("/admin", name="admin")
     * @param Request $request
     * @return mixed
     */
    public function adminAction(Request $request)
    {
        $em = $this->getEm();
        $qb = $em->createQueryBuilder();
        $qb->select('torder')
            ->from('AppBundle\Entity\Torder', 'torder')
            ->innerJoin('AppBundle\Entity\OrderGood', 'orderGood', 'WITH', 'orderGood.order = torder.id')
            ->andWhere($qb->expr()->isNotNull('torder.closedAt'))
            ->orderBy('torder.createdAt')
            ->groupBy('torder');

        /** @var Torder $closedOrders */
        $closedOrders = $qb->getQuery()->getResult();
        foreach ($closedOrders as $key => $closedOrder){
            $basketQb = $em->createQueryBuilder();
            $basketQb->select('orderGood')
                ->from('AppBundle\Entity\OrderGood', 'orderGood')
                ->andWhere($basketQb->expr()->eq('orderGood.order', $closedOrder->getId()));

            $basket = $basketQb->getQuery()->getResult();
            $closedOrder->basket = $basket;
        }

        foreach ($closedOrders as $key => $closedOrder) {
            $closedOrder->summ = 0;
            /** @var OrderGood $item */
            foreach ($closedOrder->basket as $item) {
                $closedOrder->summ += $item->getGood()->getPrice() * $item->getCount();
            }
        }

        return $this->render('default/admin.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR,
            'closedOrders' => $closedOrders
        ]);
    }

    /**
     * @Route("/login", name="login", options ={"expose" : true})
     * @param Request $request
     * @return mixed
     */
    public function loginAction(Request $request)
    {
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR
        ]);
    }

    /**
     * @Route("/get_results", name="search_get_results", options = {"expose":true})
     * @param Request $request
     * @return mixed
     */
    public function getResultsAction(Request $request)
    {
        $apiController = new ApiController();
        $searchQuery = $request->get('searchQuery');
        $region = $request->get('region');
        $town = $request->get('town');
        $money1 = $request->get('money1');
        $money2 = $request->get('money2');
        $vacancy = $request->get('vacancy');
        $regions = $apiController->getRegionsAction();
//        foreach ($regions as $region){
//        }
        $content = $apiController->getVacanciesAction($region, $town, $money1, $money2, $vacancy);
        // replace this example code with whatever you need
        return $this->render('default/results.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')) . DIRECTORY_SEPARATOR,
            'content' => $content,
            'regions' => $regions
        ]);
    }
}
