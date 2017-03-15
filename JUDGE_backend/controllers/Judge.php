<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;

class Judge extends REST_Controller {

    public function index_get($id = NULL)
    {
        $authHeader = getHeader('Authorization');
        $query = $this->Judge->get();
        if($authHeader) {
            $this->response(prepare_for_frontend($query));
        } else {
            $safeColumns = array(
                0 => 'judge_id',
                1 => 'user_name'
            );
            $query = retrieve_columns($query, $safeColumns);
            $this->response(prepare_for_frontend($query));
        }
    }

    public function index_post()
    {
        $data['judges'] = $this->Judge->get_usernames();

        $this->load->view('judge_usernames', $data);
    }

}