<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge_poster extends REST_Controller {

	public function index_get($judge_id = NULL, $poster_id = NULL)
	{
		$auth = $this->authorize->get_auth();
		$query = $this->Judge_poster->get($judge_id, $poster_id);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth) { // just to make sure it exists
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$data['judge_posters'] = $this->Judge_poster->get_usernames();

		$this->load->view('poster_usernames', $data);
	}

}