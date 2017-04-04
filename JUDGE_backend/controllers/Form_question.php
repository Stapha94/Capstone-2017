<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Form_question extends REST_Controller {

	public function index_get()
	{
		$this->generate_get_response($this->form_question);
	}

	public function index_post()
	{
		$this->generate_post_response($this->form_question, true);
	}

}