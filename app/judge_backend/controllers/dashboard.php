<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class dashboard extends CI_Controller {
    function index() {
        $this->load->view('admin_dash');
        $this->load->helper('url');
    }
}