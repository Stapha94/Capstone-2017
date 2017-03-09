<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Unauthorized extends CI_Controller {
    function index() {
        $this->load->view('unauthorized');
        $this->load->helper('url');
        redirect(base_url() . 'JUDGE');
    }
}