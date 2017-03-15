<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Award extends REST_Controller {

	public function index_get($award_id = NULL)
	{
		$auth = $this->authorize->get_auth();
		$query = $this->Award->get($award_id);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth) {
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$data['awards'] = $this->Award->get_usernames();

		$this->load->view('award_usernames', $data);
	}

}