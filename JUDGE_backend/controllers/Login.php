<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');
use Restserver\Libraries\REST_Controller;

class Login extends REST_Controller {

    public function index_get() {
        $this->response([]);
		die();
    }

    public function admin_post() {
		$email = $this->post('email');
		$password = $this->post('password');

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
			$data['admin'] = prepare_for_frontend(array($admin));
			$data['status'] = 200;
			$this->response($data);
		} else {
			$this->response([], 401);
		}
		die();
	}

    public function judge_post() {
        $email = $this->post('email');
        $pin = $this->post('pin');

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
            $data['judge'] = prepare_for_frontend(array($judge));
            $data['status'] = 200;
            $this->response($data);
        } else {
            $this->response([], 401);
        }
        die();
    }

}