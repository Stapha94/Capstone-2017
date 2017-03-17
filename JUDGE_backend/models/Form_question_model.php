<?php
class Form_question_model extends CI_Model {

	public function __construct()
	{
		$this->fields = array('form_id', 'question_id', 'poster_id', 'judge_id');
		$this->name = 'form_question';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		// For many-to-many tables, I've provided functions to load all the joins for the two tables.
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}.form_id,
				{$this->name}.question_id,
				score,
				{$joins['f']}.poster_id,
				{$joins['f']}.judge_id,
				{$joins['f']}.total,
				{$joins['f']}.comments,
				{$joins['qs']}.title AS section,
				{$joins['q']}.description");

		// Put any joins here

		// The format for joins is table1.column = table2.column;
		$this->db->join("{$joins['f']}", "{$joins['f']}.{$joins['f']}_id = {$this->name}.{$joins['f']}_id");
		$this->db->join("{$joins['q']}", "{$joins['q']}.{$joins['q']}_id = {$this->name}.{$joins['q']}_id");
		$this->db->join("{$joins['j']}", "{$joins['j']}.{$joins['j']}_id = {$joins['f']}.{$joins['j']}_id");
		$this->db->join("{$joins['po']}", "{$joins['po']}.{$joins['po']}_id = {$joins['f']}.{$joins['po']}_id");
		$this->db->join("{$joins['qs']}", "{$joins['qs']}.{$joins['qs']}_id = {$joins['q']}.{$joins['qs']}_id");

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
			'f' => 'form',
			'q' => 'question'
		);
		// For many-to-many tables, I've provided functions to load all the joins for the two tables.
		$joins = array_merge($joins, $this->form->joins());
		$joins = array_merge($joins, $this->question->joins());
		return $joins;
	}

}
?>
