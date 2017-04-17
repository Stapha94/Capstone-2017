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
		$this->fields = array('summit_id', 'summit_start', 'summit_end', 'registration_deadline', 'created_by_admin_id', 'judge_login_disabled', 'pin', 'active');
		$this->filter = array(
			'summit_id' => 'summit',
			'summit_start' => 'summit',
			'summit_end' => 'summit',
			'registration_deadline' => 'summit',
			'created_by_admin_id' => 'summit',
			'active' => 'summit'
		);
		$this->name = 'summit';
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
			judge_login_disabled,
			{$this->name}.active");

		// Put any joins here
		$this->db->join("{$joins['ad']}", "{$joins['ad']}.{$joins['ad']}_id = {$this->name}.created_by_{$joins['ad']}_id");

		// Where clauses here

		$this->get_where_clauses($this->filter, $params);

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			$data['pin'] = password_hash($data['pin'], PASSWORD_BCRYPT);
			if(intval($data['active']) === 1) {
				// Since only one summit can be active at a time, we need to deactivate the current active one.
				$temp['active'] = 0;
				//If the query fails, return false
				if(!$this->db->update('summit', $temp)) {
					return false;
				}
			}
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

	// For pin updating
	public function update_pin($data = array()) {
		try {
			$this->db->select('pin');
			$this->db->where('summit_id', $data['summit_id']);

			$query = $this->db->get('summit');
			$result = $query->result();

			$hash = $result[0]->pin;

			if(password_verify($data['old_pin'], $hash)) {
				$pin = password_hash($data['new_pin'], PASSWORD_BCRYPT);
				$this->db->set('pin', $pin);
				$this->db->where('summit_id', $data['summit_id']);
				return $this->db->update($this->name);
			} else {
				return false;
			}
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
