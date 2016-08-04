<?php

namespace Dergipark\WorkflowBundle\Controller;

use Dergipark\WorkflowBundle\Entity\DialogPost;
use Dergipark\WorkflowBundle\Entity\StepDialog;
use Dergipark\WorkflowBundle\Params\DialogPostTypes;
use Ojs\CoreBundle\Controller\OjsController as Controller;
use Pagerfanta\Exception\LogicException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DialogPostController extends Controller
{
    /**
     * @param Request $request
     * @param $workflowId
     * @param $stepOrder
     * @param $dialogId
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getPostsAction(Request $request, $workflowId, $stepOrder, $dialogId)
    {
        $em = $this->getDoctrine()->getManager();
        $dialog = $em->getRepository(StepDialog::class)->find($dialogId);

        $posts = $em->getRepository(DialogPost::class)->findBy([
            'dialog' => $dialog,
        ], [
            'id' => 'ASC',
        ]);

        return $this->render('DergiparkWorkflowBundle:DialogPost:_dialog_posts.html.twig', [
            'posts' => $posts,
        ]);
    }

    /**
     * @param Request $request
     * @param $dialogId
     * @return LogicException|JsonResponse
     */
    public function postCommentAction(Request $request, $dialogId)
    {
        $comment = $request->get('comment');
        if(!$comment){
            return new LogicException('comment param must be!');
        }
        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        $dialog = $em->getRepository(StepDialog::class)->find($dialogId);

        $post = new DialogPost();
        $post
            ->setType(DialogPostTypes::TYPE_TEXT)
            ->setText($comment)
            ->setDialog($dialog)
            ->setSendedAt(new \DateTime())
            ->setSendedBy($user)
            ;
        $em->persist($post);
        $em->flush();

        return new JsonResponse([
            'success' => true,
        ]);
    }

    /**
     * @param Request $request
     * @param $dialogId
     * @return LogicException|JsonResponse
     */
    public function browseFilesAction(Request $request, $workflowId, $dialogId)
    {
        $em = $this->getDoctrine()->getManager();
        $workflowService = $this->get('dp.workflow_service');
        $journal = $this->get('ojs.journal_service')->getSelectedJournal();
        $workflow = $workflowService->getArticleWorkflow($workflowId);
        $dialog = $em->getRepository(StepDialog::class)->find($dialogId);

        return $this->render('DergiparkWorkflowBundle:DialogPost:_browse_files.html.twig', [
            'files' => $workflowService->getUserRelatedFiles($workflow),
        ]);
    }

    /**
     * @param Request $request
     * @param $dialogId
     * @return LogicException|JsonResponse
     */
    public function postFileAction(Request $request, $dialogId)
    {
        return new Response('hello there');
    }
}
