<?php
header("Content-Type: application/json; charset=UTF-8");

$output = '';
foreach($posters as $key=>$value) {
    if($output != '') {$output  .= ',';}
    $output .= ' { "posterId": '   .  $value->poster_id .  ', ';
    $output .= '"title": "'   .  $value->title .  '", ';
    $output .= '"firstName": "'   .  $value->first_name .  '", ';
    $output .= '"lastName": "'   .  $value->last_name .  '", ';
    $output .= '"category": "'   .  $value->category .  '" } ';
}
$output = '{"posters": [ '.$output.' ] }';

echo($output);
?>
