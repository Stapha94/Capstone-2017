<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Poster extends REST_Controller {

    public function index_get($id = NULL)
    {
        $auth = $this->authorize->get_auth();
        $query = $this->Poster->get();
        if($auth === 400) {
        	$this->response([], 400);
		} else if($auth === 401) {
        	$this->response([], 401);
		} else if($auth) {
            $this->response(prepare_for_frontend($query));
        }
    }

    public function index_post()
    {
        $data['posters'] = $this->Poster->get_usernames();

        $this->load->view('poster_usernames', $data);
    }

}