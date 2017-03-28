<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Presenter extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->presenter->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->presenter->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

  public function index_post() {
      $this->load->model('Presenter_model');
      $postdata = file_get_contents('php://input');
      $request = json_decode($postdata);
      $data = [
          'first_name'       => $request->firstName,
          'last_name'        => $request->lastName,
          'suffix'           => $request->suffix,
          'email'            => $request->email,
          'institution_id'   => $request->institutionId,
          'role_id'          => $request->roleId,
          //'abstract_id'      => $request->abstractId,
          //'submission_date'  => $request->submissionDate,
          'is_registered'    => $request->isRegistered                                             
        ];
      $this->Presenter_model->create_presenter($data);
  }
}