<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Question_section extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->question_section->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->question_section->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->question_section->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$method = $this->uri->segment(2);
			$data = array();
			$fields = $this->question_section->fields;
			foreach ($fields as $index => $field) {
				if ($this->post($field)) {
					$data[$field] = $this->post($field);
				}
			}
			if ($method === 'create') {
				$query = $this->question_section->create($data);
				if ($query) {
					$this->response(prepare_for_frontend($query), 201);
				} else {
					$this->response([], 400);
				}
			} else if ($method === 'update') {
				if ($this->question_section->update($data)) {
					$this->response([], 200);
				} else {
					$this->response([], 400);
				}
			}
		}
	}
}