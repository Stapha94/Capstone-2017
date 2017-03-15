<?php
class Form_question_model extends CI_Model {

	public function __construct()
	{
		$this->name = 'form_question';
		parent::__construct();
	}

	public function get($form_id = NULL, $question_id = NULL, $poster_id = NULL, $judge_id = NULL)
	{
		// Load foreign tables
		// For many-to-many tables, I've provided functions to load all the joins for the two tables.
		$joins = array_merge($this->Form->joins(), $this->Questions->joins());
		$joins['f'] = 'form';
		$joins['q'] = 'question';

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

		// Where clauses here...must be conditionally based. I'll work on that later
		if($form_id) {
			$this->db->where("{$this->name}.{$joins['f']}_id", intval($form_id));
		}
		if($question_id) {
			$this->db->where("{$this->name}.{$joins['q']}_id", intval($question_id));
		}
		if($poster_id) {
			$this->db->where("{$joins['po']}.{$joins['po']}_id", intval($poster_id));
		}
		if($judge_id) {
			$this->db->where("{$joins['j']}.{$joins['j']}_id", intval($judge_id));
		}

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

}
?>
