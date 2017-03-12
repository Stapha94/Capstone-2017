<?php
header("Content-Type: application/json; charset=UTF-8");

$output = '';
foreach($judges as $key=>$value) {
    if($output != '') {$output  .= ',';}
    $output .= ' { "judgeId": '   .  $value->judge_id .  ', ';
    $output .= '"firstName": "'   .  $value->first_name .  '", ';
    $output .= '"lastName": "'   .  $value->last_name .  '", ';
    $output .= '"category": "'   .  $value->category .  '", ';
    $output .= '"isActive": "'   .  $value->is_active .  '" } ';
}
$output = '{"judges": [ '.$output.' ] }';

echo($output);
?>
