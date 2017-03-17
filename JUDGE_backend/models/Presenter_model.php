<?php
// http://stackoverflow.com/questions/30379100/error-you-must-use-the-set-method-to-update-an-entry-fix
class Presenter_model extends CI_Model {

        private $presenter_id;
        private $first_name;
        private $last_name;
        private $suffix;
        private $email;
        private $institution_id;
        private $role_id;
        private $is_registered;

	public function __construct()
	{
		$this->fields = array('presenter_id', 'first_name', 'last_name', 'suffix', 'email', 'institution_id', 'role_id', 'is_registered');
		$this->name = 'presenter';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
                first_name,
                last_name,
                suffix,
                email,
                {$joins['i']}.title AS institution,
                {$joins['r']}.title AS role,
                is_registered");

		// Put any joins here

		$this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$this->name}.{$joins['i']}_id");
		$this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$this->name}.{$joins['r']}_id");

		// Where clauses here...must be conditionally based. I'll work on that later

		foreach($params as $column=>$value) {
			$this->db->where("{$this->name}.{$column}", $value);
		}

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function joins() {
		$joins = array(
			'i' => 'institution',
			'r' => 'role'
		);
		return $joins;
	}

}
?>
