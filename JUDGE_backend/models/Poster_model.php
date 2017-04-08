<?php
class Poster_model extends CI_Model {

        private $poster_id;
        private $award_id;
        private $poster_abstract_id;
        private $presenter_id;
        private $summit_id;
        private $score;
        private $submission_date;

        public function __construct()
        {
        		$this->fields = array('poster_id', 'award_id', 'poster_abstract_id', 'presenter_id', 'summit_id', 'score', 'submission_date');
        		$this->filter = array(
        			'poster_id' => 'poster',
					'category' => 'poster_category',
					'judge_category_id' => 'institution',
					'poster_category_id' => 'role',
					'award' => 'award',
					'poster_title' => 'poster_abstract',
					'presenter_id' => 'poster',
					'summit_id' => 'poster',
					'submission_date' => 'poster'
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
				{$joins['i']}.judge_category_id,
                {$joins['r']}.title AS role,
                {$joins['r']}.poster_category_id,
                {$joins['pr']}.active,
                {$this->name}.summit_id,
                {$joins['s']}.summit_start,
                {$joins['s']}.summit_end,
                {$joins['s']}.registration_deadline,
                score,
                submission_date");

            // Put any joins here

            $this->db->join("{$joins['aw']}", "{$joins['aw']}.{$joins['aw']}_id = {$this->name}.{$joins['aw']}_id");
            $this->db->join("{$joins['pa']}", "{$joins['pa']}.{$joins['pa']}_id = {$this->name}.{$joins['pa']}_id");
            $this->db->join("{$joins['pr']}", "{$joins['pr']}.{$joins['pr']}_id = {$this->name}.{$joins['pr']}_id");
            $this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$joins['pr']}.{$joins['i']}_id");
			$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$joins['i']}.{$joins['jc']}_id");
            $this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$joins['pr']}.{$joins['r']}_id");
			$this->db->join("{$joins['pc']}", "{$joins['pc']}.{$joins['pc']}_id = {$joins['r']}.{$joins['pc']}_id");
            $this->db->join("{$joins['s']}", "{$joins['s']}.{$joins['s']}_id = {$this->name}.{$joins['s']}_id");

			// Where clauses here

			foreach($params as $param=>$value) {
				if($param === 'poster_id') {
					$params[$param] = intval($value);
				}
				if($param === 'presenter_id') {
					$params[$param] = intval($value);
				}
				if($param === 'summit_id') {
					$params[$param] = intval($value);
				}
			}

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
				'aw' => 'award',
				'pa' => 'poster_abstract',
				'pr' => 'presenter',
				's' => 'summit'
			);
			$joins = array_merge($joins, $this->presenter->joins());
			$joins = array_merge($joins, $this->institution->joins());
			$joins = array_merge($joins, $this->role->joins());
        	return $joins;
		}

		protected function convert_join_field($field = NULL) {

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
