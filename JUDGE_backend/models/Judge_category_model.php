<?php
class Judge_category_model extends CI_Model {

	private $judge_category_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->fields = array('judge_category_id', 'title', 'active');
		$this->filter = array(
			'judge_category_id' => 'judge_category',
			'title' => 'judge_category',
			'active' => 'judge_category'
		);
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

		// Where clauses here

		$this->get_where_clauses($this->filter, $params);

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$judge_category_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('judge_category_id' => $judge_category_id));
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
			return $this->db->update($this->name, $data, array("{$this->name}_id" => intval($data["{$this->name}_id"])));
		} catch (Exception $e) {
			return false;
		}
	}

}
?>
