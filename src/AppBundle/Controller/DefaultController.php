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


}
