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
		$this->fields = array('poster_abstract_id', 'title', 'objective', 'methods', 'results', 'conclusion');
		$this->filter = array(
			'poster_abstract_id' =>	'poster_abstract',
			'title' => 'poster_abstract'
		);
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

		foreach ($this->filter as $field=>$table) {
			$param = $params[$field];
			if(isset($param)) {
				$this->db->where("{$table}.{$field}", $param);
			}
		}

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$poster_abstract_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('poster_abstract_id' => $poster_abstract_id));
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
