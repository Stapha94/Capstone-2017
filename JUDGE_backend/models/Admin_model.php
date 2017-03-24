<?php
class Admin_model extends CI_Model {

	private $admin_id;
	private $email;
	private $password;
	private $active;

	public function __construct()
	{
		$this->fields = array('admin_id', 'email', 'active');
		$this->name = 'admin';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			email,
			active");

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

	// For login
	public function check_admin($email, $password) {
		$this->db->select("{$this->name}_id, email, password");
		$this->db->where('email', $email);
		$this->db->where($this->authorize->get_password_hash($password));
		$this->db->where('active', 1);
		$this->db->limit(1);

		$query = $this->db->get("{$this->name}");

		$result = $query->result();

		return $result;
	}

}
?>
