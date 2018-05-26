<?php

namespace AppBundle\Controller;

use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends Controller
{

    /**
     * return EntityManager
     */
    public function getEm()
    {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();

        return $em;

    }

}
