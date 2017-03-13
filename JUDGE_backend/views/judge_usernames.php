<?php
header("Content-Type: application/json; charset=UTF-8");

$output = '';
foreach($judges as $key=>$value) {
    if($output != '') {$output  .= ',';}
    $output .= ' { "judgeId": '   .  $value->judge_id .  ', ';
    $output .= '"userName": "'   .  $value->user_name .  '" } ';
}
$output = '{"judges": [ '.$output.' ] }';

echo($output);
?>
