<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->judge->fields);
		$this->generate_get_response($auth, $this->judge, $params);
	}

    public function index_post()
    {
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->judge->fields);
		$this->generate_post_response($auth, $this->judge);
    }

}