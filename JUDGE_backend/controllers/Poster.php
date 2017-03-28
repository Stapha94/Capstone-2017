<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Poster extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->poster->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->poster->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

    public function index_post()
    {
        //$data['posters'] = $this->Poster->get_usernames();
        //$this->load->view('poster_usernames', $data);

		$this->load->model('Poster_model');
		$postdata = file_get_contents('php://input');
		$request = json_decode($postdata);
		$this->db->select_max('presenter_id');
		$presenterId = $this->get_presenter_id($request->presenterId);
		//$presenterQuery = $this->db->get('presenter');
		//$presenterId = $presenterQuery->result;
		$data = [
			'poster_category_id' => $request->category,
			'presenter_id'       => $presenterId,
			'award_id'           => 0,
			'poster_abstract_id' => 1,
			'submission_date'    => $request->date,
			'summit_id'          => $request->summitId,
			'score'              => 0
		];

		$this->Poster_model->create_poster($data);
    }

	public function get_presenter_id($presenter_name) {
		return $result->presenter_id;
	}

}