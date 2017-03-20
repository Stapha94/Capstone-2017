<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Summit extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->summit->fields);
		if($auth === 400) {
			$query = $this->summit->get($params);
			$safeColumns = array(
				0 => 'summit_id',
			);
			$query = retrieve_columns($query, $safeColumns);
			$this->response(prepare_for_frontend($query));
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->summit->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
	}

}