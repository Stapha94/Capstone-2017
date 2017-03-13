<?php
header("Content-Type: application/json; charset=UTF-8");

$output = '';
$output .= ' { "judgeId": '   .  $judge[0]->judge_id .  ', ';
$output .= '"userName": "'   .  $judge[0]->user_name .  '", ';
$output .= '"firstName": "'   .  $judge[0]->first_name .  '", ';
$output .= '"lastName": "'   .  $judge[0]->last_name .  '", ';
$output .= '"category": "'   .  $judge[0]->title .  '", ';
$output .= '"isActive": "'   .  $judge[0]->is_active .  '" } ';

$output = '{"judge": '.$output.' }';

echo($output);
?>
