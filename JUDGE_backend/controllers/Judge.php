<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->judge->fields);
		if($auth === 400) {
			$query = $this->judge->get($params);
			$safeColumns = array(
				0 => 'judge_id',
				1 => 'user_name'
			);
			$query = retrieve_columns($query, $safeColumns);
			$this->response(prepare_for_frontend($query));
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->judge->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

    public function index_post()
    {

    }

}