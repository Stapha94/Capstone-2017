<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');
use Restserver\Libraries\REST_Controller;

class Login extends REST_Controller {

    public function index_get() {
        $this->response([]);
    }

    public function admin_post() {
		$post_data = file_get_contents('php://input');
		$request = json_decode($post_data);

		$email = $request->email;
		$password = $request->password;

		$matches = $this->Admin->check_admin($email, $password);

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
        $post_data = file_get_contents('php://input');
        $request = json_decode($post_data);

        $judge_id = $request->judgeId;
        $user_name = $request->userName;
        $pin = $request->pin;

        $matches = $this->Judge->check_judge($judge_id, $pin);

        if (count($matches) === 1) {
            $judge = array(
                'id' => $judge_id,
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

    public function check_pin_post() {
        $post_data = file_get_contents('php://input');
        $request = json_decode($post_data);

        $pin = $request->pin;
        $date = date('Y-m-d H:i:s');

        $matches = $this->Summit->check_pin($pin, $date);
        if (count($matches) === 1) {
            $this->response([], 200);
        } else {
            $this->response([], 401);
        }
    }

}