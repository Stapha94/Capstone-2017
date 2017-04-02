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
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->form_question->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$method = $this->uri->segment(2);
			$data = array();
			$fields = $this->form_question->fields;
			$batch_entries = $this->post();
			foreach ($batch_entries as $key => $value) {
				foreach ($fields as $index => $field) {
					if ($value[$field]) {
						$data[$key][$field] = $value[$field];
					}
				}
			}
			if ($method === 'create') {
				$query = $this->form_question->create($data);
				if ($query) {
					$this->response([], 201);
				} else {
					$this->response([], 400);
				}
			} else if ($method === 'update') {
				$query = $this->form_question->update($data);
				if ($query) {
					$this->response([], 201);
				} else {
					$this->response([], 400);
				}
			}
		}
	}

}