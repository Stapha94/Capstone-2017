<?php
class Judge_model extends CI_Model {

        private $judge_id;
        private $summit_id;
        private $first_name;
        private $last_name;
        private $category;
        private $is_active;

        public function __construct()
        {
                parent::__construct();
        }

        public function get_all_judges()
        {
                $query = $this->db->get('judge');

                $result = $query->result();

                return $result;
        }

        public function get_judge($id) {
                $query = $this->db->get_where('judge', array('judge_id' => $id));

                $result = $query->result();

                return $result;
        }

        public function check_judge($id, $pin) {
                $query = $this->db->select('judge_id, pin')
                                ->from('judge')
                                ->join('judge_summit', 'judge.judge_id = judge_summit.judge_id')
                                ->join('summit', 'judge_summit.summit_id = summit.summit_id')
                                ->where('judge_id', $id)
                                ->where('pin = SHA2(' . $pin . ', 256)')
                                ->limit(1)
                                ->get();

                $result = $query->result();

                return $result;
        }

}
?>
