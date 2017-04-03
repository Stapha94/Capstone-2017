<?php
defined('BASEPATH') OR exit('No direct access allowed');
require_once('system/core/Security.php');
use Firebase\JWT\JWT;

class Authorize {

    public function get_auth($data = null)
    {
        if($data) {
            return $this->create_auth_token($data);
        }
        $auth_header = getHeader('Authorization');
        if($auth_header) {
        	list($jwt) = sscanf($auth_header, 'Authorization: Bearer %s');

        	if($jwt) {
        		try {
        			$secret_key = base64_decode(config_item('secret_key'));

        			$token = JWT::decode($jwt, $secret_key, array('HS256'));

        			return $token;
				} catch (Exception $e) {
        			return 401;
				}
			} else {
        		return 400;
			}
		} else {
        	return 401;
		}
    }

    private function create_auth_token($data) {

        // Create the token values
        $token_id = base64_encode(openssl_random_pseudo_bytes(32)); //mcrypt_create_iv has been deprecated
        $issued_at = time();
        $not_before = $issued_at;
        $expire = $not_before + 3600;
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
                'email'  => $data['email'],
				'firstName' => $data['first_name'],
				'lastName' => $data['last_name'],
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

    // This is for checking to see if we're using the mysql or postgres database and using the correct hashing function.
    public function get_password_hash($pass, $is_pin = FALSE) {
    	$ci =& get_instance();
    	if($ci->db->dbdriver === 'mysqli') {
    		if($is_pin === true) {
				return "pin = SHA2('{$pass}', 256)";
			} else if($is_pin === false) {
    			return "password = SHA2('{$pass}', 256)";
			}
		} else if ($ci->db->dbdriver === 'postgre') {
    		if($is_pin === TRUE) {
				return "pin = crypt('{$pass}', pin)";
			} else if($is_pin === false) {
    			return "password = crypt('{$pass}', password)";
			}
		}
	}

	// Checks if the user is an admin
	public function is_admin($auth = NULL) {
		if($auth) {
			if($auth->data->userType === 'Admin') {
				return true;
			}
		}
		return false;
	}

	// Checks if the user is a judge
	public function is_judge($auth = NULL) {
		if($auth) {
			if($auth->data->userType === 'Judge') {
				return true;
			}
		}
		return false;
	}
}