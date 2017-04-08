<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Form extends REST_Controller {

	public function index_get()
	{
		$this->generate_get_response($this->form);
	}

	public function index_post()
	{
		$method = $this->uri->segment(2);
		if($method === 'delete') {
			$id = $this->post('form_id');
			if (isset($id)) {
				$this->generate_delete_response($this->form, $id);
			} else {
				$this->response([], 404);
			}
		} else {
			$this->generate_post_response($this->form);
		}
	}

}