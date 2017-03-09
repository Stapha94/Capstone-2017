<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $output = '';
    foreach($questions as $key=>$value) {
        if($output != '') {$output  .= ',';}
        $output .= ' { "questionId": '   .  $value->question_id .  ', ';
        $output .= '"description": "'   .  $value->description .  '", ';
        $output .= '"score": 0 } '; // default score of 0 for client side.
}
$output = '{"questions": [ '.$output.' ] }';

echo($output);
?>
