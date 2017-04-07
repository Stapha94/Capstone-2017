<?php
class Key_participant_model extends CI_Model {

	private $key_participant_id;
	private $presenter_id;
	private $first_name;
	private $last_name;
	private $department;
	private $institution_id;
	private $role_id;

	public function __construct()
	{
		$this->fields = array('key_participant_id', 'presenter_id', 'first_name', 'last_name', 'department', 'institution_id', 'role_id');
		$this->filter = array(
			'key_participant_id' => 'key_participant',
			'presenter_id' => 'key_participant'
		);
		$this->name = 'key_participant';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		// For many-to-many tables, I've provided functions to load all the joins for the two tables.
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
				{$this->name}.first_name,
				{$this->name}.last_name,
				department,
				{$joins['i']}.title AS institution,
				{$joins['r']}.title AS role");

		// Put any joins here
		// The format for joins is table1.column = table2.column;
		$this->db->join("{$joins['pr']}", "{$joins['pr']}.{$joins['pr']}_id = {$this->name}.{$joins['pr']}_id");
		$this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$this->name}.{$joins['i']}_id");
		$this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$this->name}.{$joins['r']}_id");

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
                $key_participant_id = $this->db->insert_id();
                $query = $this->db->get_where($this->name, array('key_participant_id' => $key_participant_id));
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
			'pr' => 'presenter',
		);
		$joins = array_merge($joins, $this->Presenter->joins());
		return $joins;
	}

}
?>
