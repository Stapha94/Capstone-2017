<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Form_question extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->form_question->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->form_question->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$data['form_questions'] = $this->Form_questions->get_usernames();

		$this->load->view('form_questions_usernames', $data);
	}

}