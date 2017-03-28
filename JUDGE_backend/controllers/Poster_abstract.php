<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Poster_abstract extends REST_Controller {

	public function index_get()
	{
		$params = get_paramters();
		$auth = $this->sanitize_uri($params, $this->poster_abstract->fields);
		if($auth === 400) {
			$this->response([], 400);
		} else if($auth === 401) {
			$this->response([], 401);
		} else if($auth === 404) {
			$this->response([], 404);
		} else if($auth) {
			$query = $this->poster_abstract->get($params);
			$this->response(prepare_for_frontend($query));
		}
	}

	public function index_post()
	{
		//$data['poster_abstracts'] = $this->poster_abstract->get_usernames();

		//$this->load->view('poster_abstract_usernames', $data);

		$this->load->model('Poster_abstract_model');
		$postdata = file_get_contents('php://input');
		$request = json_decode($postdata);
		$data = [
			'title'      => $request->title,
			'objective'  => $request->objective,
			'methods'    => $request->methods,
			'results'    => $request->results,
			'conclusion' => $request->conclusion
  		];

		$this->Poster_abstract_model->create_poster_abstract($data);
	}

}