<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once ('JUDGE_backend/libraries/REST_Controller.php');

use Restserver\Libraries\REST_Controller;


class Recaptcha extends REST_Controller {

    public function index_get()
    {
        $this->response([], 404);
    }

    public function index_post()
    {
        // Based on code here: http://stackoverflow.com/questions/27274157/new-google-recaptcha-with-checkbox-server-side-php
         try {

                $url = 'https://www.google.com/recaptcha/api/siteverify';
                $data = ['secret'   => config_item('recaptcha_key'),
                         'response' => $this->post('grecaptcha_response'),
                         'remoteip' => $_SERVER['REMOTE_ADDR']];

                $options = [
                    'http' => [
                        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                        'method'  => 'POST',
                        'content' => http_build_query($data)
                    ]
                ];

                $context  = stream_context_create($options);
                $result = file_get_contents($url, false, $context);
                return $this->response(json_decode($result), 200);
            }
        catch (Exception $e) {
            return $this->response([], 400);
        }
    }
}