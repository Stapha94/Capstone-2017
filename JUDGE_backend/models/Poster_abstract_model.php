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
			'poster_id' => 'poster',
			'title' => 'poster_abstract'
		);
		$this->name = 'poster_abstract';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();
		// All the select fields

		$this->db->select("{$this->name}.{$this->name}_id,
			{$joins['po']}_id,
			title,
			objective,
			methods,
			results,
			conclusion");

		// Put any joins here
		$this->db->join("{$joins['po']}", "{$joins['po']}.{$this->name}_id = {$this->name}.{$this->name}_id");

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

	public function joins()
	{
		$joins = array(
			'po' => 'poster'
		);

		return $joins;
	}

}
?>
