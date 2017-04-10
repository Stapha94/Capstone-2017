<?php
class Institution_model extends CI_Model {

	private $institution_id;
	private $judge_category_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->fields = array('institution_id', 'judge_category_id', 'title', 'active');
		$this->filter = array(
			'institution_id' => 'institution',
			'judge_category_id' => 'institution',
			'title' => 'institution',
			'active' => 'institution'
		);
		$this->name = 'institution';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
			{$this->name}.judge_category_id,
			{$joins['jc']}.title AS category,
			{$this->name}.title,
			{$this->name}.active");

		// Put any joins here
		$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$this->name}.{$joins['jc']}_id");

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
				$institution_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('institution_id' => $institution_id));
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

	public function joins() {
		$joins = array(
			'jc' => 'judge_category',
		);
		return $joins;
	}

}
?>
