<?php
class Poster_category_model extends CI_Model {

	private $poster_category_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->fields = array('poster_category_id', 'title', 'active');
		$this->name = 'poster_category';
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

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$poster_category_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('poster_category_id' => $poster_category_id));
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
			return $this->db->update($this->name, $data);
		} catch (Exception $e) {
			return false;
		}
	}

}
?>
