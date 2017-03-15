<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Poster extends REST_Controller {

    public function index_get($id = NULL)
    {
        $authHeader = getHeader('Authorization');
        $query = $this->Poster->get();
        if($authHeader) {
            $this->response(prepare_for_frontend($query));
        }
    }

    public function index_post()
    {
        $data['posters'] = $this->Poster->get_usernames();

        $this->load->view('poster_usernames', $data);
    }

}