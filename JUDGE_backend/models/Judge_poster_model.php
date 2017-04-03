<?php
class Judge_poster_model extends CI_Model {

        public function __construct()
        {
        		$this->fields = array('judge_id', 'poster_id');
        		$this->name = 'judge_poster';
                parent::__construct();
        }

		public function get($params = array())
		{
			// Load foreign tables
			$joins = $this->joins();
			// All the select fields

			$this->db->select("{$this->name}.judge_id,
				{$this->name}.poster_id,
				{$joins['j']}.user_name,
				{$joins['j']}.first_name AS {$joins['j']}_first_name,
				{$joins['j']}.last_name AS {$joins['j']}_last_name,
				{$joins['jc']}.title AS {$joins['j']}_category,
				{$joins['j']}.active,
				{$joins['pc']}.title AS {$joins['po']}_category,
				{$joins['aw']}.title AS award,
				{$joins['pr']}.first_name AS {$joins['pr']}_first_name,
				{$joins['pr']}.last_name AS {$joins['pr']}_last_name,
				{$joins['pr']}.suffix,
				{$joins['pr']}.email,
				{$joins['i']}.title AS institution,
				{$joins['r']}.title AS role,
				{$joins['pr']}.is_registered,
				{$joins['pa']}.title AS {$joins['po']}_title,
				{$joins['pa']}.objective,
				{$joins['pa']}.methods,
				{$joins['pa']}.results,
				{$joins['pa']}.conclusion,
				{$joins['po']}.submission_date");

			// Put any joins here

			// The format for joins is table1.column = table2.column;
			$this->db->join("{$joins['j']}", "{$joins['j']}.{$joins['j']}_id = {$this->name}.{$joins['j']}_id");
			$this->db->join("{$joins['po']}", "{$joins['po']}.{$joins['po']}_id = {$this->name}.{$joins['po']}_id");
			$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$joins['j']}.{$joins['jc']}_id");
			$this->db->join("{$joins['pc']}", "{$joins['pc']}.{$joins['pc']}_id = {$joins['po']}.{$joins['pc']}_id");
			$this->db->join("{$joins['aw']}", "{$joins['aw']}.{$joins['aw']}_id = {$joins['po']}.{$joins['aw']}_id");
			$this->db->join("{$joins['pr']}", "{$joins['pr']}.{$joins['pr']}_id = {$joins['po']}.{$joins['pr']}_id");
			$this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$joins['pr']}.{$joins['i']}_id");
			$this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$joins['pr']}.{$joins['r']}_id");
			$this->db->join("{$joins['pa']}", "{$joins['pa']}.{$joins['pa']}_id = {$joins['po']}.{$joins['pa']}_id");

			// Where clauses here

			foreach($params as $column=>$value) {
				$this->db->where("{$this->name}.{$column}", $value);
			}

			// Perform the query
			$query = $this->db->get($this->name);
			$result = $query->result();
			return $result;
		}

	public function create($data = array()) {
		try {
			return $this->db->insert($this->name, $data);
		} catch (Exception $e) {
			return false;
		}
	}

	public function update($data = array()) {
		try {
			return $this->db->update($this->name, $data);
		} catch (Exception $e) {
			return false;
		}
	}

		public function joins() {
			$joins = array(
				'j' => 'judge',
				'po' => 'poster'
			);
			// For many-to-many tables, I've provided functions to load all the joins for the two tables.
			$joins = array_merge($joins, $this->poster->joins());
			$joins = array_merge($joins, $this->judge->joins());
			return $joins;
		}

}
?>
