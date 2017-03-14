<?php
class Poster_model extends CI_Model {

        private $poster_id;
        private $poster_category_id;
        private $title;
        private $award_id;
        private $presenter_id;
        private $summit_id;

        public function __construct()
        {
                parent::__construct();
        }

        public function get_judge_posters($judge_id)
        {
                $query = $this->db->select('poster.poster_id, poster.title AS title, first_name, last_name, poster_category.title AS category')
                                ->from('poster')
                                ->join('presenter', 'poster.presenter_id = presenter.presenter_id')
                                ->join('poster_category', 'poster.poster_category_id = poster_category.poster_category_id')
                                ->join('judge_poster', 'poster.poster_id = judge_poster.poster_id')
                                ->where('judge_id', $judge_id)
                                ->get();
                $result = $query->result();
                return $result;
        }

}
?>
