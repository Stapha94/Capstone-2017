<?php

function get_error($status)
{
    if($status === 400) {
        $error = array(
            'message' => 'HTTP/1.0 400 Bad Request',
            'status'  => 400
        );
    } else if($status === 401) {
        $error = array(
            'message' => 'HTTP/1.0 401 Unauthorized',
            'status' => 401
        );
    } else if($status === 403) {
        $error = array(
            'message' => 'HTTP/1.0 403 Forbidden',
            'status' => 403
        );
    } else if($status === 404) {
        $error = array(
            'message' => 'HTTP/1.0 404 Not Found',
            'status' => 404
        );
    } else if($status === 405) {
        $error = array(
            'message' => 'HTTP/1.0 405 Method Not Allowed',
            'status' => 405
        );
    } else {
        // default to 400
        $error = array(
            'message' => 'HTTP/1.0 Bad Request',
            'status' => 400
        );
    }
    return $error;
}

function get_success($status) {
    if($status === 200) {
        $success = array(
            'message' => 'HTTP/1.0 200 OK',
            'status' => 200
        );
    } else if($status === 201) {
        $success = array(
            'message' => 'HTTP/1.0 201 Created',
            'status' => 201
        );
    } else if($status === 204) {
        $success = array(
            'message' => 'HTTP/1.0 204 No Content',
            'status' => 204
        );
    } else {
        // default to 200
        $success = array(
            'message' => 'HTTP/1.0 200 OK',
            'status' => 200
        );
    }
    return $success;
}