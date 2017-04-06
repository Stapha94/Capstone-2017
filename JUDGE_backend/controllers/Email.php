<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Email extends REST_Controller {

	public function index_get()
	{
		$method = $this->uri->segment(2);
		if($method === 'test') {
			$this->load->view('mailtest');
		} else {
			$this->response([], 400);
		}
	}

	public function index_post()
	{
	}

}