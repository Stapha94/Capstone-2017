<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Presenter extends CI_Controller {
  public function index()
  {
      $this->load->database();
      $this->load->model('Presenter_model');
      $data['presenters'] = $this->Presenter_model->get_all_presenters();
      
      $this->load->view('presenters', $data);
  }

  public function create() {
      $this->load->database();
      $this->load->model('Presenter_model');
      $postdata = file_get_contents('php://input');
      $request = json_decode($postdata);
      $data = [
          'presenter_name'   => $request->presenterName,
          'email'            => $request->email,
          'institution'      => $request->institution,
          'role'             => $request->role,
          'abstract_id'      => $request->abstractId,
          'is_registered'    => $request->isRegistered                                             
        ];
      $this->Presenter_model->create_presenter($data);
  }
}