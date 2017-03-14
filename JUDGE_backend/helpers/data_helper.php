<?php

// This takes each database field and converts it to camel-case for the frontend
function prepare_for_frontend($data = NULL)
{
    if($data)
    {
        foreach($data as $index=>$json) {
            $jsonString = json_encode($json); // Annoying but needed for json_decode
            $arr = json_decode($jsonString, TRUE); // converts to associative array
            foreach($arr as $key=>$value) {
                $new_key = underscore_to_camel_case($key);
                if($new_key !== $key) {
                    $arr[$new_key] = $value;
                    unset($arr[$key]);
                }
            }
            $data[$index] = $arr;
        }
    }
    return $data;
}