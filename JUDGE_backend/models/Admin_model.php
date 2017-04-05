<?php
class Admin_model extends CI_Model {

	private $admin_id;
	private $first_name;
	private $last_name;
	private $email;
	private $password;
	private $active;

	public function __construct()
	{
		$this->fields = array('admin_id', 'first_name', 'last_name', 'email', 'password', 'active');
		$this->filter = array(
			'admin_id' => 'admin',
			'email' => 'admin',
			'active' => 'admin'
		);
		$this->name = 'admin';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables

		// All the select fields

		$this->db->select("{$this->name}_id,
			first_name,
			last_name,
			email,
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
			$data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
			if($this->db->insert($this->name, $data)) {
				$admin_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('admin_id' => $admin_id));
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

	// For password updating
	public function update_password($data = array()) {
		try {
			$this->db->select('password');
			$this->db->where('admin_id', $data['admin_id']);

			$query = $this->db->get('admin');
			$result = $query->result();

			$hash = $result[0]->password;

			if(password_verify($data['old_pass'], $hash)) {
				$password = password_hash($data['new_pass'], PASSWORD_BCRYPT);
				$this->db->set('password', $password);
				$this->db->where('admin_id', $data['admin_id']);
				return $this->db->update($this->name);
			} else {
				return false;
			}
		} catch (Exception $e) {
			return false;
		}
	}

	// For login
	public function check_admin($email, $password) {
		$this->db->select('password');
		$this->db->where('email', $email);
		$this->db->where('active', 1);

		$query = $this->db->get("{$this->name}");
		$result = $query->result();

		if(count($result) === 1) {
			$hash = $result[0]->password;

			if(password_verify($password, $hash)) {

				$this->db->select("{$this->name}_id, first_name, last_name, email");
				$this->db->where('email', $email);
				$this->db->where('active', 1);
				$this->db->limit(1);

				$query = $this->db->get("{$this->name}");

				$result = $query->result();
			} else {
				$result = [];
			}
		} else {
			$result = [];
		}

		return $result;
	}

}
?>
