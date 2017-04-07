<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Reports extends REST_Controller {

	public function index_get()
	{
		$this->response([], 404);
	}

	public function index_post()
	{
		$summit_id = $this->post('summit_id');
		if(intval($summit_id)) {
			$params['summit_id'] = $summit_id;
			$posters = $this->form->generate_report_posters($params);
			if(count($posters) > 0) {
				foreach($posters as $key=>$poster) {

				}
			} else {
				$this->response([], 404);
			}
		}
	}
}