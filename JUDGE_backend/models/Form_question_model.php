<?php
class Form_question_model extends CI_Model {

	public function __construct()
	{
		$this->fields = array('form_id', 'question_id', 'score');
		$this->filter = array(
			'form_id' => 'form_question',
			'question_id' => 'form_question',
			'judge_id' => 'form',
			'summit_id' => 'summit'
		);
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
				{$this->name}.score,
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
		$this->db->join("{$joins['s']}", "{$joins['s']}.{$joins['s']}_id = {$joins['po']}.{$joins['s']}_id");
		$this->db->join("{$joins['qs']}", "{$joins['qs']}.{$joins['qs']}_id = {$joins['q']}.{$joins['qs']}_id");

		// Where clauses here

		$this->get_where_clauses($this->filter, $params);

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			return $this->db->insert_batch($this->name, $data);
		} catch (Exception $e) {
			return false;
		}
	}

	public function update($data = array()) {
		try {
			$this->db->where('form_id', $data[0]['form_id']); // This is needed for many-to-many tables. There might be a way to clean it up a bit.
			return $this->db->update_batch($this->name, $data, 'question_id');
		} catch (Exception $e) {
			return false;
		}
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
