<?php
class Judge_category_model extends CI_Model {

	private $judge_category_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->fields = array('judge_category_id', 'title', 'active');
		$this->name = 'judge_category';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			title,
			active");

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

}
?>
