<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');
use Restserver\Libraries\REST_Controller;

class Login extends REST_Controller {

    public function index_get() {
        $this->response([]);
    }

    public function index_post() {
		$email = $this->post('email');
		$password = $this->post('password');

		if(strlen($password) === 4) {
			$this->judge($email, $password);
		} else {
			$this->admin($email, $password);
		}
	}

    public function admin($email, $password) {

		$matches = $this->admin->check_admin($email, $password);

		if (count($matches) === 1) {
			$admin = array(
				'id' => $matches[0]->admin_id,
				'email' => $email,
				'first_name' => $matches[0]->first_name,
				'last_name' => $matches[0]->last_name,
				'type' => 'Admin'
			);
			$auth_token = $this->authorize->get_auth($admin);
			$data['token'] = json_decode($auth_token);
			$data['user'] = prepare_for_frontend(array($admin));
			$data['status'] = 200;
			$this->response($data);
		} else {
			$this->response([], 401);
		}
	}

    public function judge($email, $pin) {

        $matches = $this->judge->check_judge($email, $pin);

        if (count($matches) === 1) {
            $judge = array(
                'id' => $matches[0]->judge_id,
                'email' => $email,
				'first_name' => $matches[0]->first_name,
				'last_name' => $matches[0]->last_name,
                'type' => 'Judge'
            );
            $auth_token = $this->authorize->get_auth($judge);
            $data['token'] = json_decode($auth_token);
            $data['user'] = prepare_for_frontend(array($judge));
            $data['status'] = 200;
            $this->response($data);
        } else {
            $this->response([], 401);
        }
    }

}