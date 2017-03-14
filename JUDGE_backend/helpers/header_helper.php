<?php

function getHeader($name = NULL)
{
    $header = '';
    if($name === NULL) {
        $header = NULL;
    } else {
        foreach(getallheaders() as $headerName => $value) {
            if($headerName === $name) {
                if($value !== "null") { // for our auth token
                    $header = "$headerName: $value";
                }
            }
        }
        if($header === '') {
            $header = NULL;
        }
    }
    return $header;
}