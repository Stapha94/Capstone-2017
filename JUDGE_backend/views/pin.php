<?php
//http://stackoverflow.com/questions/942951/rest-api-error-return-good-practices
    header("Content-Type: application/json; charset=UTF-8");

    $output = '';
    if($correct === TRUE) {
        $output = '{ "success": { "correct": "true" } }';
    } else {
        header('HTTP/1.0 401 Unauthorized');
        $output = ' ( "error": { "message": "Incorrect pin!" } }';
    }

echo($output);
?>