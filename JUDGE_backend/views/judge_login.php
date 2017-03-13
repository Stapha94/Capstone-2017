<?php
//http://stackoverflow.com/questions/942951/rest-api-error-return-good-practices
    header("Content-Type: application/json; charset=UTF-8");

    $output = '';
    if($status === 401) {
        header($message);
        $data['status'] = $status;
        $this->view('unauthorized', $data);
    } else {
        $output = ' { "auth": ';
        $output .= '{ "judge": ';
        $output .= '{ "id": ' . $judge['id'] . ', ';
        $output .= '"userName": "' . $judge['user_name'] . '", ';
        $output .= '"userType": "' . $judge['type'] . '" }, ';
        $output .=  '"token": ' . $token . ' } } ';
        echo($output);
    }
?>