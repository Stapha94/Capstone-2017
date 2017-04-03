<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Poster extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->poster->fields);
		$this->generate_admin_get_response($auth, $this->poster, $params);
	}

    public function index_post()
    {
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->poster->fields);
		$this->generate_post_response($auth, $this->poster);
    }

}