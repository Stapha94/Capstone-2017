<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Summit extends REST_Controller {

	public function index_get()
	{
		$safe_columns = array('summit_id');
		$this->generate_get_response($this->summit, $safe_columns);
	}

	public function index_post()
	{
		$this->generate_post_response($this->summit);
	}

}