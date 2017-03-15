<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge_poster extends REST_Controller {

	public function index_get($judge_id = NULL, $poster_id = NULL)
	{
		$authHeader = getHeader('Authorization');
		$query = $this->Judge_poster->get($judge_id, $poster_id);
		if($authHeader) {
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		$data['judge_posters'] = $this->Judge_poster->get_usernames();

		$this->load->view('poster_usernames', $data);
	}

}