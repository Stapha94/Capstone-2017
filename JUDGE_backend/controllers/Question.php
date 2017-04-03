<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Question extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->question->fields);
		$this->generate_get_response($auth, $this->question, $params);
	}

  public function index_post()
  {
	  $params = get_paramters();
	  $auth = $this->sanitize_uri($params, $this->question->fields);
	  $this->generate_post_response($auth, $this->question);
  }
}