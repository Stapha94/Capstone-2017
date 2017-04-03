<?php
class Summit_model extends CI_Model {

        private $summit_id;
        private $summit_start;
        private $summit_end;
        private $registration_deadline;
        private $created_by_admin_id;
        private $pin;
        private $active;

	public function __construct()
	{
		$this->name = 'summit';
		$this->fields = array('summit_id', 'summit_start', 'summit_end', 'registration_deadline', 'created_by_admin_id', 'active');
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
        $joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
			summit_start,
			summit_end,
			registration_deadline,
			{$joins['ad']}.email,
			{$this->name}.active");

		// Put any joins here
		$this->db->join("{$joins['ad']}", "{$joins['ad']}.{$joins['ad']}_id = {$this->name}.created_by_{$joins['ad']}_id");

		// Where clauses here...found better way.

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
				$summit_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('summit_id' => $summit_id));
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
			'ad' => 'admin'
		);

		return $joins;
	}

}
?>
