<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Admin extends REST_Controller {

	public function index_get($admin_id = NULL)
	{
		$auth = $this->authorize->get_auth();
		$query = $this->Admin->get($admin_id);
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
		$data['admins'] = $this->Admin->get_usernames();

		$this->load->view('admin_usernames', $data);
	}

}