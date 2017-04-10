<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $output = '';
    foreach($presenters as $key=>$value) {
        if($output != '') {$output  .= ',';}
        $output .= ' { "presenterId": '   .  $value->presenter_id .  ', ';
        $output .= '"firstName": "'   .  $value->first_name .  '", ';
        $output .= '"lastName": "'   .  $value->last_name .  '", ';
        $output .= '"suffix": "'   .  $value->suffix .  '", ';
        $output .= '"email": "'   .  $value->email .  '", ';
        $output .= '"institutionId": '   .  $value->institution_id .  ', ';
        $output .= '"roleId": '   .  $value->role_id .  ', ';
        $output .= '"abstractId": '   .  $value->abstract_id .  ', ';
        $output .= '"abstractId": '   .  $value->abstract_id .  ', ';
        $output .= '"submissionDate": '   .  $value->submission_date .  ', ';
        $output .= '"isRegistered": '   .  $value->is_registered . ' } ';
}
$output = '{"presenters": [ '.$output.' ] }';

echo($output);

?>
