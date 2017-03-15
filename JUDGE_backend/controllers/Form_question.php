<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Form_question extends REST_Controller {

	public function index_get($form_id = NULL, $question_id = NULL, $poster_id = NULL, $judge_id = NULL)
	{
		$auth = $this->authorize->get_auth();
		$query = $this->Form_question->get($form_id, $question_id, $poster_id, $judge_id);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth) { // just to make sure it exists
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$data['form_questions'] = $this->Form_questions->get_usernames();

		$this->load->view('form_questions_usernames', $data);
	}

}