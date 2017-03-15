<?php
class Admin_model extends CI_Model {

	private $admin_id;
	private $email;
	private $password;
	private $active;

	public function __construct()
	{
		$this->name = 'admin';
		parent::__construct();
	}

	public function get($admin_id = NULL)
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			email,
			active");

		// Put any joins here

		// Where clauses here...must be conditionally based. I'll work on that later

		if($admin_id) {
			$this->db->where("{$this->name}_id", $admin_id);
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
		$this->db->where("password = SHA2('{$password}', 256)");
		$this->db->where('active', 1);
		$this->db->limit(1);

		$query = $this->db->get("{$this->name}");

		$result = $query->result();

		return $result;
	}

}
?>
