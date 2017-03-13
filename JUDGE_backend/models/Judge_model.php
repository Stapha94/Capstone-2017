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

        public function get_usernames()
        {
                $query = $this->db->select('judge_id, user_name')
                                ->from('judge')
                                ->where('is_active', 1)
                                ->get();

                $result = $query->result();
                return $result;
        }

        public function get_judge($id) {
                $query = $this->db->select('judge_id, user_name, first_name, last_name, title, is_active')
                                ->from('judge')
                                ->join('judge_category', 'judge.judge_category_id = judge_category.judge_category_id')
                                ->where('judge_id', $id)
                                ->get();

                $result = $query->result();

                return $result;
        }

        public function check_judge($id, $pin) {
                $query = $this->db->select('judge.judge_id, pin')
                                ->from('judge')
                                ->join('judge_summit', 'judge.judge_id = judge_summit.judge_id')
                                ->join('summit', 'judge_summit.summit_id = summit.summit_id')
                                ->where('judge.judge_id', $id)
                                ->where('pin = SHA2(' . $pin . ', 256)')
                                ->limit(1)
                                ->get();

                $result = $query->result();

                return $result;
        }

}
?>
