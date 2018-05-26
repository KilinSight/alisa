<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Good;
use AppBundle\Entity\Torder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR
        ]);
    }

    /**
     * @Route("/catalog", name="catalog")
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
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            'goods' => $goods
        ]);
    }

    /**
     * @Route("/basket", name="basket")
     * @param Request $request
     * @return mixed
     */
    public function basketAction(Request $request)
    {
        $userId = 1;
        $em = $this->getEm();
        $basketGoods = [];

        /** @var Torder $unsuccessfullOrder */
        $unsuccessfullOrder = $em->getRepository('AppBundle\Entity\Torder')->findOneBy(['closedAt' => null], ['createdAt' => 'DESC']);

        if($unsuccessfullOrder){
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
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            'basketGoods' => $basketGoods
        ]);
    }

    /**
     * @Route("/admin", name="admin")
     * @param Request $request
     * @return mixed
     */
    public function adminAction(Request $request,\Swift_Mailer $mailer)
    {
        return $this->render('default/admin.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR
        ]);
    }

    /**
     * @Route("/login", name="login")
     * @param Request $request
     * @return mixed
     */
    public function loginAction(Request $request)
    {
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR
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
        $content = $apiController->getVacanciesAction($region,$town,$money1,$money2,$vacancy);
        // replace this example code with whatever you need
        return $this->render('default/results.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            'content' => $content,
            'regions' => $regions
        ]);
    }
}
