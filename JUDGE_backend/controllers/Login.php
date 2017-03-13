<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require('Authorize.php');

class Login extends Authorize {

    public function judge_login() {
        if($this->authenticate('POST')) {
            $this->load->model('Judge_model');
            $post_data = file_get_contents('php://input');
            $request = json_decode($post_data);

            $judge_id = $request->judgeId;
            $user_name = $request->userName;
            $pin = $request->pin;

            $matches = $this->Judge_model->check_judge($judge_id, $pin);

            if (count($matches) === 1) {
                $judge = array(
                    'id' => $judge_id,
                    'user_name' => $user_name,
                    'type' => 'Judge'
                );
                $auth_token = $this->create_auth_token($judge);
                $data['token'] = $auth_token;
                $data['judge'] = $judge;
                $data['status'] = 200;
                $this->load->view('judge_login', $data);
            } else {
                $data = get_error(401);
            }
        }
    }

    public function logout() {
        $session = array(
            'user' => '',
            'logged_in' => FALSE,
            'userLevel' => 0
        );

        $this->session->set_userdata($session);

        $this->load->view('logout');
    }

    public function check_pin() {
        if($this->authenticate('POST')) {
            $this->load->model('Summit_model');
            $post_data = file_get_contents('php://input');
            $request = json_decode($post_data);

            $pin = $request->pin;
            $date = date('Y-m-d H:i:s');

            $matches = $this->Summit_model->check_pin($pin, $date);
            if (count($matches) === 1) {
                $data['correct'] = TRUE;
            } else {
                $data['correct'] = FALSE;
            }

            $this->load->view('pin', $data);
        }
    }

}