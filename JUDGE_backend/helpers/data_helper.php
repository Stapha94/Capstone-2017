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

function retrieve_columns($data = array(), $columns = array())
{
    $newColumns = array();
    $newResult = array();
    if(count($columns) > 0 && count($data) > 0)
    {
        foreach($data as $index=>$json) {
            $jsonString = json_encode($json);
            $arr = json_decode($jsonString, TRUE);
            foreach ($arr as $key => $value) {
                if (in_array($key, $columns)) {
                    $newColumns[$key] = $value;
                }
            }
            $newResult[$index] = $newColumns;
        }
    }
	return $newResult;
}

function get_paramters()
{
	$ci =& get_instance();
	$params = $ci->uri->uri_to_assoc(2);
	foreach($params as $column=>$value) {
		$params[$column] = str_replace("%20", " ", $value);
	}
	return $params;
}

function set_active($active)
{
	$ci =& get_instance();
	if($ci->db->dbdriver === 'mysqli') {
		return $active;
	} else if($ci->db->dbdriver === 'postgre') {
		return "cast({$active} as BOOLEAN)";
	}
}