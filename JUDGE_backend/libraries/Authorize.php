<?php
defined('BASEPATH') OR exit('No direct access allowed');
require_once('system/core/Security.php');
use Firebase\JWT\JWT;

class Authorize {

    public function get_auth_token($data = null)
    {
        if($data) {
            return $this->create_auth_token($data);
        }
        return 'Method to decode here.';
    }

    private function create_auth_token($data) {

        // Create the token values
        $token_id = base64_encode(openssl_random_pseudo_bytes(32)); //mcrypt_create_iv has been deprecated
        $issued_at = time();
        $not_before = $issued_at + 10;
        $expire = $not_before + 60;
        $server_name = config_item('base_url');

        //Create the token
        $token = array(
            'iat' => $issued_at,
            'jti' => $token_id,
            'iss' => $server_name,
            'nbf' => $not_before,
            'exp' => $expire,
            'data' => array(
                'id'        => $data['id'],
                'userName'  => $data['user_name'],
                'userType'  => $data['type']
            )
        );

        // Create and encode JWT
        $secret_key = base64_decode(config_item('secret_key'));

        $jwt = JWT::encode(
            $token,
            $secret_key,
            'HS256'
        );

        $unencoded_array = array( 'jwt' => $jwt);
        return json_encode($unencoded_array);
    }

}