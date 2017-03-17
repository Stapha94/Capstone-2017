<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge_poster extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->judge_poster->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->judge_poster->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$data['judge_posters'] = $this->Judge_poster->get_usernames();

		$this->load->view('poster_usernames', $data);
	}

}