<?php
class Judge_model extends CI_Model {

        private $judge_id;
        private $user_name;
        private $first_name;
        private $last_name;
        private $judge_category_id;
        private $active;

	public function __construct()
	{
		$this->fields = array('judge_id', 'user_name', 'first_name', 'last_name', 'judge_category_id', 'active');
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
			user_name,
			first_name,
			last_name,
			{$joins['jc']}.{$joins['jc']}_id,
			{$joins['jc']}.title AS category,
			{$this->name}.active");

		// Put any joins here

        // The format for joins is table1.column = table2.column;
		$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$this->name}.{$joins['jc']}_id");

		// Where clauses here...must be conditionally based. I'll work on that later

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

	public function check_judge($user_name, $pin) {
			$query = $this->db->select('judge.judge_id, user_name, pin')
							->from('judge')
							->join('judge_summit', 'judge.judge_id = judge_summit.judge_id')
							->join('summit', 'judge_summit.summit_id = summit.summit_id')
							->where('judge.user_name', $user_name)
							->where($this->authorize->get_password_hash($pin, TRUE))
							->where('judge.active', 1)
							->where('summit.active', 1)
							->limit(1)
							->get();

			$result = $query->result();

			return $result;
	}

	public function joins() {
		$joins = array(
			'jc' => 'judge_category'
		);
		return $joins;
	}

}
?>
