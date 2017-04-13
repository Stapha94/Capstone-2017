<?php
class Role_model extends CI_Model {

	private $role_id;
	private $poster_category_id;
	private $title;
	private $active;

	public function __construct()
	{
		$this->fields = array('role_id', 'poster_category_id', 'title', 'active');
		$this->filter = array(
			'role_id' => 'role',
			'poster_category_id' => 'role',
			'title' => 'role',
			'active' => 'role'
		);
		$this->name = 'role';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
			{$this->name}.poster_category_id,
			{$joins['pc']}.title AS category,
			{$this->name}.title,
			{$this->name}.active");

		// Put any joins here
		$this->db->join("{$joins['pc']}", "{$joins['pc']}.{$joins['pc']}_id = {$this->name}.{$joins['pc']}_id");


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
				$role_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('role_id' => $role_id));
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
			'pc' => 'poster_category',
		);
		return $joins;
	}

}
?>
