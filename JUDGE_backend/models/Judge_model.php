<?php
class Judge_model extends CI_Model {

        private $judge_id;
        private $email;
        private $first_name;
        private $last_name;
        private $judge_category_id;
        private $active;

	public function __construct()
	{
		$this->fields = array('judge_id', 'email', 'first_name', 'last_name', 'judge_category_id', 'active');
		$this->filter = array(
			'judge_id' => 'judge',
			'email' => 'judge',
			'category' => 'judge_category',
			'active' => 'judge');
		$this->name = 'judge';
		$this->id = "{$this->name}_id";
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->id},
			email,
			first_name,
			last_name,
			{$joins['jc']}.{$joins['jc']}_id,
			{$joins['jc']}.title AS category,
			{$this->name}.active");

		// Put any joins here

        // The format for joins is table1.column = table2.column;
		$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$this->name}.{$joins['jc']}_id");

		// Where clauses here

		$this->get_join_where_clauses($this->filter, $params);

		// Perform the query
		$query = $this->db->get($this->name);
		$result = $query->result();
		return $result;
	}

	public function create($data = array()) {
		try {
			if($this->db->insert($this->name, $data)) {
				$judge_id = $this->db->insert_id();
				$judge = $this->get(array("{$this->id}" => $judge_id));
				return $judge;
			} else {
				return false;
			}
		} catch (Exception $e) {
			return false;
		}
	}

	public function update($data = array()) {
		try {
			return $this->db->update($this->name, $data, array( "{$this->id}" => intval($data["{$this->id}"])));
		} catch (Exception $e) {
			return false;
		}
	}

	public function check_judge($email, $pin) {
		$this->db->select('pin');
		$this->db->where('active', 1);
		$this->db->limit(1);

		$query = $this->db->get('summit');
		$result = $query->result();

		if(count($result) === 1) {

			$hash = $result[0]->pin;

			if(password_verify($pin, $hash)) {


				$this->db->select('judge_id, first_name, last_name, email');
				$this->db->where('judge.email', $email);
				$this->db->where('judge.active', 1);
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

	public function joins() {
		$joins = array(
			'jc' => 'judge_category'
		);
		return $joins;
	}

	protected function convert_join_field($field = NULL) {
		if($field === NULL) {
			return $field;
		}

		if($field === 'category') {
			$field = 'title';
		}
		return $field;
	}

}
?>
