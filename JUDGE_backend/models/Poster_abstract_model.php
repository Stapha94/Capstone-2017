<?php
class Poster_abstract_model extends CI_Model {

	private $poster_abstract_id;
	private $title;
	private $objective;
	private $methods;
	private $results;
	private $conclusion;

	public function __construct()
	{
		$this->fields = array('poster_abstract_id', 'title');
		$this->name = 'poster_abstract';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			title,
			objective,
			methods,
			results,
			conclusions");

		// Put any joins here

		// Where clauses here

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