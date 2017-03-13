<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authorize extends CI_Controller {

    // Based on tutorial found here: https://www.sitepoint.com/php-authorization-jwt-json-web-tokens/

    protected function create_auth_token($data) {

        // Create the token values
        $token_id = base64_encode(openssl_random_pseudo_bytes(32)); //mcrypt_create_iv has been deprecated
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
                'id'        => $data['id'],
                'userName'  => $data['user_name'],
                'userType'  => $data['type']
            )
        );

        // Create and encode JWT
        $secret_key = base64_decode($this->config->item('secret_key'));

        $jwt = \Firebase\JWT\JWT::encode(
            $token,
            $secret_key,
            'HS256'
        );

        $unencoded_array = array( 'jwt' => $jwt);
        return json_encode($unencoded_array);
    }

}