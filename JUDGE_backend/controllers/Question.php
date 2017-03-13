<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Question extends CI_Controller {
  public function index()
  {
      $this->load->model('Question_model');
      $data['questions'] = $this->Question_model->get_all_questions();
      
      $this->load->view('questions', $data);
  }
}