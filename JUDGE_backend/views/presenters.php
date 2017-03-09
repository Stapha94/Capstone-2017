<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $output = '';
    foreach($presenters as $key=>$value) {
        if($output != '') {$output  .= ',';}
        $output .= ' { "presenterId": '   .  $value->presenter_id .  ', ';
        $output .= '"presenterName": "'   .  $value->presenter_name .  '", ';
        $output .= '"email": "'   .  $value->email .  '", ';
        $output .= '"institution": "'   .  $value->institution .  '", ';
        $output .= '"role": "'   .  $value->role .  '", ';
        $output .= '"abstractId": '   .  $value->abstract_id .  ', ';
        $output .= '"isRegistered": '   .  $value->is_registered . ' } ';
}
$output = '{"presenters": [ '.$output.' ] }';

echo($output);
?>
