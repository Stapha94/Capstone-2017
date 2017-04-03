<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Presenter extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->presenter->fields);
		$this->generate_admin_get_response($auth, $this->presenter, $params);
	}

  public function index_post()
  {
	  $params = get_paramters();
	  $auth = $this->sanitize_uri($params, $this->presenter->fields);
	  $this->generate_post_response($auth, $this->presenter);
  }

}