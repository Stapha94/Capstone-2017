<?php
class Judge_summit_model extends CI_Model {

	public function __construct()
	{
		$this->fields = array('judge_id', 'summit_id');
		$this->name = 'judge_summit';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();
		// All the select fields

		$this->db->select("{$this->name}.judge_id,
				{$this->name}.summit_id,
				{$joins['j']}.user_name,
				{$joins['j']}.first_name AS {$joins['j']}_first_name,
				{$joins['j']}.last_name AS {$joins['j']}_last_name,
				{$joins['jc']}.title AS {$joins['j']}_category,
				{$joins['j']}.is_active,
				{$joins['s']}.summit_start,
				{$joins['s']}.summit_end,
				{$joins['s']}.registration_deadline");

		// Put any joins here

		// The format for joins is table1.column = table2.column;
		$this->db->join("{$joins['j']}", "{$joins['j']}.{$joins['j']}_id = {$this->name}.{$joins['j']}_id");
		$this->db->join("{$joins['s']}", "{$joins['s']}.{$joins['s']}_id = {$this->name}.{$joins['s']}_id");
		$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$joins['j']}.{$joins['jc']}_id");

		// Where clauses here

		foreach($params as $column=>$value) {
			$this->db->where("{$this->name}.{$column}", $value);
		}

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function joins() {
		$joins = array(
			'j' => 'judge',
			's' => 'summit'
		);
		// For many-to-many tables, I've provided functions to load all the joins for the two tables.
		$joins = array_merge($joins, $this->summit->joins());
		$joins = array_merge($joins, $this->judge->joins());
		return $joins;
	}

}
?>
