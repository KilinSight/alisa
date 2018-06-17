<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;

class BaseController extends Controller
{

    /**
     * @return EntityManager
     */
    public function getEm()
    {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();

        return $em;
    }

    /**
     * @return User
     */
    public function getCurrentUser()
    {
        $usr= $this->get('security.token_storage')->getToken()->getUser();

        return $usr;
    }

}
