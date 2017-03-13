<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Judge extends CI_Controller {

    public function index()
    {
        $this->load->model('Judge_model');
        $data['judges'] = $this->Judge_model->get_all_judges();

        $this->load->view('judges', $data);
    }

    public function get_user_names()
    {
        $this->load->model('Judge_model');
        $data['judges'] = $this->Judge_model->get_usernames();

        $this->load->view('judge_usernames', $data);
    }

    public function get($id)
    {
        $this->load->model('Judge_model');
        $data['judge'] = $this->Judge_model->get_judge($id);

        $this->load->view('judge', $data);
    }

}