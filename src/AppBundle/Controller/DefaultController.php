<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @param Request $request
     * @return mixed
     */
    public function indexAction(Request $request)
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
