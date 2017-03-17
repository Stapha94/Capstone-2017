<?php
class Question_section_model extends CI_Model {

	private $question_id;
	private $question_section_id;
	private $description;

	public function __construct()
	{
		$this->fields = array('question_section_id', 'description');
		$this->name = 'question_section';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
                title");

		// Put any joins here

		// Where clauses here...must be conditionally based. I'll work on that later
		foreach($params as $column=>$value) {
			$this->db->where("{$this->name}.{$column}", $value);
		}
		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function joins()
	{
		$joins = array(
			'qs' => 'question_section'
		);
		return $joins;
	}

}
?>
