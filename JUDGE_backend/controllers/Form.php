<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Form extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->form->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->form->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$method = $this->uri->segment(2);
		$data = array();
		$fields = $this->form->fields;
		foreach($fields as $index=>$field) {
			if($this->post($field)) {
				$data[$field] = $this->post($field);
			}
		}
		if($method === 'create') {
			$query = $this->form->create($data);
			if($query) {
				$this->response(prepare_for_frontend($query), 201);
			} else {
				$this->response([], 400);
			}
		} else if($method === 'update') {
			if($this->form->update($data)) {
				$this->response([], 200);
			} else {
				$this->response([], 400);
			}
		}
	}

}