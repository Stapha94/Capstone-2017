<?php
class Award_model extends CI_Model {

	private $award_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->name = 'award';
		parent::__construct();
	}

	public function get($award_id = NULL)
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			title,
			active");

		// Put any joins here

		// Where clauses here...must be conditionally based. I'll work on that later

		if($award_id) {
			$this->db->where("{$this->name}_id", $award_id);
		}

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

}
?>
