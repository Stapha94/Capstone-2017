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
$route['admins/(.+)'] = 'admin';

// Award Routes
$route['awards'] = 'award';
$route['awards/(.+)'] = 'award';

// Form Routes
$route['forms'] = 'form';
$route['forms/(:num)'] = 'form/index/$1'; // For delete
$route['forms/(.+)'] = 'form';

// FormQuestion Routes
$route['form_questions'] = 'form_question';
$route['form_questions/(.+)'] = 'form_question';

// Institution Routes
$route['institutions'] = 'institution';
$route['institutions/(.+)'] = 'institution';

// Judge Routes
$route['judges'] = 'judge';
$route['judges/(.+)'] = 'judge';

// JudgeCategory Routes
$route['judge_categories'] = 'judge_category';
$route['judge_categories/(.+)'] = 'judge_category';

// KeyParticipants Routes
$route['key_participants'] = 'key_participant';
$route['key_participants/(.+)'] = 'key_participant';

//Login routes
$route['authorize'] = 'login';

//Migration
$route['migrate'] = 'migrate/recycle';
$route['migrate/(:num)'] = 'migrate/recycle/$1';
$route['migrate/up'] = 'migrate/up';
$route['migrate/down'] = 'migrate/down';
$route['migrate/down/(:num)'] = 'migrate/down/$1';

//Poster Routes
$route['posters'] = 'poster';
$route['posters/(.+)'] = 'poster';

// PosterAbstract Routes
$route['poster_abstract'] = 'poster_abstract';
$route['poster_abstract/(.+)'] = 'poster_abstract';

// PosterCategory Routes
$route['poster_categories'] = 'poster_category';
$route['poster_categories/(.+)'] = 'poster_category';

// Presenter routes
$route['presenters'] ='presenter';
$route['presenters/(.+)'] ='presenter';
$route['presenter/create'] = 'presenter/create';

//Question Routes
$route['questions'] = 'question';
$route['questions/(.+)'] = 'question';

//QuestionSection Routes
$route['question_sections'] = 'question_section';
$route['question_sections/(.+)'] = 'question_section';

// Role Routes
$route['roles'] = 'role';
$route['roles/(.+)'] = 'role';

//Summit Routes
$route['summits'] = 'summit';
$route['summits/(.+)'] = 'summit';

// Email Route
$route['email/(.+)'] = 'email';

//Redirects to error page if any invalid page is called
$route['(:any)'] = 'error';
