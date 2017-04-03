<?php
class Poster_model extends CI_Model {

        private $poster_id;
        private $poster_category_id;
        private $award_id;
        private $abstract_id;
        private $presenter_id;
        private $summit_id;
        private $score;

        public function __construct()
        {
        		$this->fields = array('poster_id', 'poster_category_id', 'award_id', 'abstract_id', 'presenter_id', 'summit_id', 'score');
        		$this->filter = array(
        			'poster_id' => 'poster',
					'category' => 'poster_category',
					'award' => 'award',
					'poster_title' => 'poster_abstract',
					'presenter_id' => 'poster',
					'summit_id' => 'poster'
				);
                $this->name = 'poster';
                parent::__construct();
        }

        public function get($params = array())
        {
            // Load foreign tables
            $joins = $this->joins();

            // All the select fields

            $this->db->select("{$this->name}_id,
                {$joins['pc']}.title AS category,
                {$joins['aw']}.title AS award,
                {$joins['pa']}.title AS poster_title,
                {$joins['pa']}.objective,
                {$joins['pa']}.methods,
                {$joins['pa']}.results,
                {$joins['pa']}.conclusion,
                {$joins['pr']}.first_name,
                {$joins['pr']}.last_name,
                {$joins['pr']}.suffix,
                {$joins['pr']}.email,
                {$joins['i']}.title AS institution,
                {$joins['r']}.title AS role,
                {$joins['pr']}.active,
                {$joins['s']}.summit_start,
                {$joins['s']}.summit_end,
                {$joins['s']}.registration_deadline,
                score");

            // Put any joins here

            $this->db->join("{$joins['pc']}", "{$joins['pc']}.{$joins['pc']}_id = {$this->name}.{$joins['pc']}_id");
            $this->db->join("{$joins['aw']}", "{$joins['aw']}.{$joins['aw']}_id = {$this->name}.{$joins['aw']}_id");
            $this->db->join("{$joins['pa']}", "{$joins['pa']}.{$joins['pa']}_id = {$this->name}.{$joins['pa']}_id");
            $this->db->join("{$joins['pr']}", "{$joins['pr']}.{$joins['pr']}_id = {$this->name}.{$joins['pr']}_id");
            $this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$joins['pr']}.{$joins['i']}_id");
            $this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$joins['pr']}.{$joins['r']}_id");
            $this->db->join("{$joins['s']}", "{$joins['s']}.{$joins['s']}_id = {$this->name}.{$joins['s']}_id");

			// Where clauses here

			$this->get_join_where_clauses($this->filter, $params);

            // Perform the query
            $query = $this->db->get($this->name);
            $result = $query->result();
            return $result;
        }

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$poster_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('poster_id' => $poster_id));
				$result = $query->result();
				return $result;
			} else {
				return false;
			}
		} catch (Exception $e) {
			return false;
		}
	}

	public function update($data = array()) {
		try {
			return $this->db->update($this->name, $data, array("{$this->name}_id" => intval($data["{$this->name}_id"])));
		} catch (Exception $e) {
			return false;
		}
	}

        public function joins() {
        	$joins = array(
        		'pc' => 'poster_category',
				'aw' => 'award',
				'pa' => 'poster_abstract',
				'pr' => 'presenter',
				's' => 'summit'
			);
			$joins = array_merge($joins, $this->presenter->joins());
        	return $joins;
		}

		private function convert_join_field($field = NULL) {

        	if($field === NULL) {
        		return $field;
			}

			if($field === 'category') {
        		$field = 'title';
			}

			if($field === 'award') {
        		$field = 'title';
			}

			if($field === 'poster_title') {
        		$field = 'title';
			}
			return $field;
		}

}
?>
