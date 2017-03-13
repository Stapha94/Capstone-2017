<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Presenter extends CI_Controller {
  public function index()
  {
      $this->load->model('Presenter_model');
      $data['presenters'] = $this->Presenter_model->get_all_presenters();
      
      $this->load->view('presenters', $data);
  }

  public function create() {
      $this->load->model('Presenter_model');
      $postdata = file_get_contents('php://input');
      $request = json_decode($postdata);
      $data = [
          'first_name'       => $request->firstName,
          'last_name'        => $request->lastName,
          'suffix'           => $request->suffix,
          'email'            => $request->email,
          'institution_id'   => $request->institutionId,
          'role_id'          => $request->roleId,
          'abstract_id'      => $request->abstractId,
          'submission_date'  => $request->submissionDate,
          'is_registered'    => $request->isRegistered                                             
        ];
      $this->Presenter_model->create_presenter($data);
  }
}