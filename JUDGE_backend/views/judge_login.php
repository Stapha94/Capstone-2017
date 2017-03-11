<?php
//http://stackoverflow.com/questions/942951/rest-api-error-return-good-practices
    header("Content-Type: application/json; charset=UTF-8");

    $output = '';
    if($correct === TRUE) {
        $output = '{"data": {"judge": "' . $session['user'] . '", "authorization": ' . $session['userLevel'] .  ' } }';
    } else {
        $output = '{"error": {"code": 404, "message": "Incorrect Login" } }';
    }

echo($output);
?>