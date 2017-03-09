<!-- http://stackoverflow.com/questions/30379100/error-you-must-use-the-set-method-to-update-an-entry-fix -->


<?php
class Presenter_model extends CI_Model {

        private $presenter_id;
        private $first_name;
        private $last_name;
        private $suffix;
        private $email;
        private $institution_id;
        private $role_id;
        private $abstract_id;
        private $is_registered;

        public function __construct()
        {
                parent::__construct();
        }

        public function get_all_presenters() {
                $query = $this->db->select('*')
                                ->from('presenter')
                                ->order_by('presenter_name', 'ASC')
                                ->get();

                $result = $query->result();

                return $result;
        }

        public function get_presenter($presenter_id) {
                $query = $this->db->select('*')
                                ->from('presenter')
                                ->where('presenter_id', $presenter_id)
                                ->get();

                $result = $query->result();

                return $result;
        }

        public function create_presenter($data) {
                echo '<script> console.log('. $this->input->post('presenter') . '); </script>';       

                $query = $this->db->insert('presenter', $data);
        }

        public function update_presenter() {
                //This is actually all wrong, I'll have to fix this
                $this->presenter_id     = $this->input->post('presenter_id');
                $this->presenter_name   = $this->input->post('presenter_name');
                $this->email            = $this->input->post('email');
                $this->institution      = $this->input->post('institution');
                $this->role             = $this->input->post('role');
                $this->$abstract_id     = $this->input->post('abstract_id');
                $this->$submission_date = $this->input->post('submission_date');
                $this->is_registered    = $this->input->post('is_registered');

                $this->db->update('presenter', $this, $this->presenter_id);                                       
        }

}
?>
