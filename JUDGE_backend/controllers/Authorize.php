<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authorize extends CI_Controller {

    public function index() {
        $this->load->view('error');
    }

    public function judge_login() {
        $this->load->database();
        $this->load->library('session');
        $this->load->model('Judge_model');
        $post_data = file_get_contents('php://input');
        $request = json_decode($post_data);

        $judge_id = $request->judgeId;
        $pin = $request->pin;

        $matches = $this->Judge_model->check_judge($judge_id, $pin);

        if($matches->num_rows() === 1)
        {
            $session = array(
                'user' => $judge_id,
                'logged_in' => TRUE,
                'userLevel' => 2
            );
            $this->session->set_userdata($session);
            $data['session'] = $session;
            $data['correct'] = TRUE;
        } else {
            $data['correct'] = FALSE;
        }
        $this->load->view('judge_login', $data);
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
        $this->load->database();
        $this->load->model('Summit_model');
        $post_data = file_get_contents('php://input');
        $request = json_decode($post_data);

        $pin = $request->pin;
        $date = date('Y-m-d H:i:s');

        $matches = $this->Summit_model->check_pin($pin, $date);
        if(count($matches) === 1)
        {
            $data['correct'] = TRUE;
        } else {
            $data['correct'] = FALSE;
        }

        $this->load->view('pin', $data);
    }

    private function create_auth_token($data) {

        // Create the token values
        $token_id = base64_encde(random_bytes(32)); //mcrypt_create_iv has been deprecated
        $issued_at = time();
        $not_before = $issued_at + 10;
        $expire = $not_before + 60;
        $server_name = $this->config->item('base_url');

        //Create the token
        $token = array(
            'iat' => $issued_at,
            'jti' => $token_id,
            'iss' => $server_name,
            'nbf' => $not_before,
            'exp' => $expire,
            'data' => array(
                'userId'    => $data->id,
                'userName'  => $data->user_name
            )
        );

        // Create and encode JWT
        $secret_key = base64_decode($this->config->item('secret_key'));

        $jwt = JWT::encode(
            $token,
            $secret_key,
            'HS256'
        );

        $unencoded_array = array( 'jwt' => $jwt);
        return json_encode($unencoded_array);
    }

}