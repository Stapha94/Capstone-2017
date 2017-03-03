<?php
class Presenter_model extends CI_Model {

        public function __construct()
        {
                parent::__construct();
        }

        public function get_all_presenters() {
                $query = $this->db->select('*')
                                ->from('presenter')
                                ->order_by('presenter_name', 'ASC')
                                ->get();

                $result = $query->result_array();

                return $result;
        }

        public function get_presenter($presenter_id) {
                $query = $this->db->select('*')
                                ->from('presenter')
                                ->where('presenter_id =' . $presenter_id)
                                ->get();
                $result = $query->result_array();

                return $result;
        }

}
?>
