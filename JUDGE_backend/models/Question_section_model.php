<?php
class Question_section_model extends CI_Model {

	private $question_id;
	private $question_section_id;
	private $description;
	private $active;

	public function __construct()
	{
		$this->fields = array('question_section_id', 'description', 'active');
		$this->name = 'question_section';
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
				$question_section_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('question_section_id' => $question_section_id));
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
