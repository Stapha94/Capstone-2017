<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Key_participant extends REST_Controller {

	public function index_get()
	{
		$this->generate_get_response($this->key_participant);
	}

	public function index_post()
	{
		$method = $this->uri->segment(2);
		if($method === 'delete') {
			$id = $this->post('key_participant_id');
			if (isset($id)) {
				$this->generate_delete_response($this->key_participant, $id);
			} else {
				$this->response([], 404);
			}
		} else {
			$this->generate_unauthorized_post_response($this->key_participant);
		}
	}

}