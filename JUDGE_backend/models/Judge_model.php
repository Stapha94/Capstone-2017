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

        public function get($id = NULL)
        {
                $this->db->select('judge_id, user_name, first_name, last_name, judge_category.title AS category, is_active');
                $this->db->join('judge_category', 'judge.judge_category_id = judge_category.judge_category_id');
                if($id) {
                        $this->db->where('judge_id', $id);
                }
                $query = $this->db->get('judge');
                $result = $query->result();
                return $result;
        }

        public function get_user_names()
        {
                $this->db->select('judge_id, user_name');
                $this->db->where('is_active', 1);

                $query = $this->db->get('judge');

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
