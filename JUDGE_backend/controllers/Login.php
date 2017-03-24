<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');
use Restserver\Libraries\REST_Controller;

class Login extends REST_Controller {

    public function index_get() {
        $this->response([]);
    }

    public function admin_post() {
		$email = $this->post('email');
		$password = $this->post('password');

		$matches = $this->admin->check_admin($email, $password);

		if (count($matches) === 1) {
			$admin = array(
				'id' => $matches[0]->admin_id,
				'user_name' => $email,
				'type' => 'Admin'
			);
			$auth_token = $this->authorize->get_auth($admin);
			$data['token'] = json_decode($auth_token);
			$data['admin'] = prepare_for_frontend(array($admin));
			$data['status'] = 200;
			$this->response($data);
		} else {
			$this->response([], 401);
		}
	}

    public function judge_post() {
        $user_name = $this->post('userName');
        $pin = $this->post('pin');

        $matches = $this->judge->check_judge($user_name, $pin);

        if (count($matches) === 1) {
            $judge = array(
                'id' => $matches[0]->judge_id,
                'user_name' => $user_name,
                'type' => 'Judge'
            );
            $auth_token = $this->authorize->get_auth($judge);
            $data['token'] = json_decode($auth_token);
            $data['judge'] = prepare_for_frontend(array($judge));
            $data['status'] = 200;
            $this->response($data);
        } else {
            $this->response([], 401);
        }
    }

}