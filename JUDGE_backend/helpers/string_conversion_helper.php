<?php
//Retrieved from here: http://stackoverflow.com/questions/2791998/convert-dashes-to-camelcase-in-php

function underscore_to_camel_case($string)
{
    $str = str_replace('_', '', ucwords($string, '_'));

    $str = lcfirst($str);

    return $str;
}