<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Report extends REST_Controller {

	public function index_get()
	{
		$this->response([], 404);
	}

	public function index_post()
	{
		$data['items'] = $this->post();
		$data['ctrl'] = $this;
		if(count($data['items']) > 0) {
			$this->load->view('report', $data);
		} else {
			$this->response([], 404);
		}
	}
}