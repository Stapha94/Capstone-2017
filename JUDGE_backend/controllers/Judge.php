<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->judge->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$query = $this->judge->get($params);
			$safeColumns = array(
				0 => 'judge_id',
				1 => 'user_name'
			);
			$query = retrieve_columns($query, $safeColumns);
			$this->response(prepare_for_frontend($query));
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->judge->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

    public function index_post()
    {
    	$method = $this->uri->segment(2);
    	$data = array();
		$fields = $this->judge->fields;
		foreach($fields as $index=>$field) {
			if($this->post($field)) {
				$data[$field] = $this->post($field);
			}
		}
		if($method === 'create') {
			$query = $this->judge->create($data);
			if($query) {
				$this->response(prepare_for_frontend($query), 201);
			} else {
				$this->response([], 400);
			}
		}
    }

}