<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge extends REST_Controller {

    public function index_get($id = NULL)
    {
        $authHeader = getHeader('Authorization');
        if($authHeader) {
            $judges = $this->Judge->get();

            $this->response(prepare_for_frontend($judges));
        } else {
            $judges = $this->Judge->get_user_names();

            $this->response(prepare_for_frontend($judges));
        }
    }

    public function index_post()
    {
        $data['judges'] = $this->Judge->get_usernames();

        $this->load->view('judge_usernames', $data);
    }

}