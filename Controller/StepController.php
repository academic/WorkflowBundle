<?php

namespace Dergipark\WorkflowBundle\Controller;

use Ojs\CoreBundle\Controller\OjsController as Controller;
use Ojs\JournalBundle\Entity\Journal;
use Ojs\UserBundle\Entity\Role;
use Ojs\UserBundle\Entity\User;
use BulutYazilim\WorkflowBundle\Entity\Flow;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class StepController extends Controller
{
    /**
     * @return Response
     */
    public function indexAction()
    {
        return $this->render('DergiparkWorkflowBundle:Step:_workflow_setting.html.twig');
    }
}
