<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Summit extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->summit->fields);
		$safe_columns = array('summit_id');
		$this->generate_get_response($auth, $this->summit, $params, $safe_columns);
	}

	public function index_post()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->summit->fields);
		$this->generate_admin_post_response($auth, $this->summit);
	}

}