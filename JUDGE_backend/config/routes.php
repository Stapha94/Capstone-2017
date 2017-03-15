<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'unauthorized';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// Admin Routes
$route['admins'] = 'admin';
$route['admins/admin/(:num)'] = 'admin/$1';

// Presenter routes
$route['presenters'] ='presenter';
$route['presenter/create'] = 'presenter/create';

//Poster Routes
$route['posters/(:num)'] = 'poster/get_judge_posters/$1';

// Judge Routes
$route['judges'] = 'judge';
$route['judges/judge/(:num)'] = 'judge/$1';

// JudgePoster Routes
$route['judge_posters'] = 'judge_poster';
$route['judge_posters/judge/(:num)'] = 'judge_poster/$1';
$route['judge_posters/judge/(:num)/poster/(:num)'] = 'judge_poster/$1/$2';

//Login routes
$route['authorize/check-pin'] = 'login/check_pin';
$route['authorize/judge'] = 'login/judge';
$route['authorize/admin'] = 'login/admin';

//Migration
$route['migrate'] = 'migrate/recycle';
$route['migrate/(:num)'] = 'migrate/recycle/$1';
$route['migrate/up'] = 'migrate/up';
$route['migrate/down'] = 'migrate/down';
$route['migrate/down/(:num)'] = 'migrate/down/$1';

//Question Routes
$route['questions'] = 'question';
$route['questions/question/(:num)'] = 'question/$1';
$route['questions/question_section/(:num)'] = 'question/index/NULL/$1'; // codeigniter routing is annoying sometimes
$route['questions/question/(:num)/question_section/(:num)'] = 'question/$1/$2';

//QuestionSection Routes
$route['question_sections'] = 'question_section';
$route['question_sections/question_section/(:num)'] = 'question_section/$1';

//Redirects to error page if any invalid page is called
$route['(:any)'] = 'error';
