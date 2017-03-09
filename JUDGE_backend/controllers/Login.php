<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function index() {
        $this->load->view('error');
    }

    public function judge_login() {
        $this->load->database();
        $this->load->model('Judge_model');
        $postdata = file_get_contents('php://input');
        $request = json_decode($postdata);

        $username = $request->judge_id;
        $pin = $request->pin;
        
        $this->db->select('judge_id, pin');
        $this->db->from('judge');
        $this->db->join('summit', 'judge.summit_id = summit.summit_id');
        $this->db->where('judge_id', $username);
        $this->db->where('pin', sha2($pin, 256));
        $this->db->limit(1);

        $query = $this->db->get();
        if($query->num_rows() === 1)
        {
            $session = array(
                'user' => $username,
                'logged_in' => TRUE
            );
            $this->session->set_userdata($session);
        }

        $this->load->view('login');
    }

    public function judge_logout() {
        $session = array(
            'user' => '',
            'logged_in' => FALSE
        );

        $this->session->set_userdata($session);

        $this->load->view('logout'); 
    }

    public function check_pin() {
            $this->load->database();
            $this->load->model('Judge_model');
            $postdata = file_get_contents('php://input');
            $request = json_decode($postdata);

            $pin = $request->pin;
            $date = date('Y-m-d H:i:s');

            $this->db->select('pin');
            $this->db->from('summit');
            $this->db->where('summit_start <', $date);
            $this->db->where('summit_end >', $date);
            $this->db->where('pin = SHA2(' . $pin . ', 256)');
            $this->db->limit(1);

            $query = $this->db->get();
            if($query->num_rows() === 1)
            {
                $data['correct'] = TRUE;
            } else {
                $data['correct'] = FALSE;
            }

            $this->load->view('pin', $data);
        }   
    
}