<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Poster extends CI_Controller {

    public function get_judge_posters($judge_id)
    {
        $this->load->model('Poster_model');
        $data['posters'] = $this->Poster_model->get_judge_posters($judge_id);

        $this->load->view('judge_posters', $data);
    }

    public function get($id)
    {
        $this->load->model('Judge_model');
        $data['judge'] = $this->Judge_model->get_judge($id);

        $this->load->view('judge', $data);
    }

}