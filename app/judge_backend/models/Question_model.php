<?php
class Question_model extends CI_Model {

        private $question_id;
        private $description;

        public function __construct()
        {
                parent::__construct();
        }

        public function get_all_questions()
        {
                $query = $this->db->select('*')
                                ->from('question')
                                ->get();

                $result = $query->result();

                return $result;
        }

}
?>
