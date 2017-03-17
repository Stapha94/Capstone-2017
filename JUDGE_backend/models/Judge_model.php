<?php
class Judge_model extends CI_Model {

        private $judge_id;
        private $user_name;
        private $first_name;
        private $last_name;
        private $judge_category_id;
        private $is_active;

	public function __construct()
	{
		$this->fields = array('judge_id', 'user_name', 'first_name', 'last_name', 'judge_category_id', 'is_active');
		$this->name = 'judge';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
			user_name,
			first_name,
			last_name,
			{$joins['jc']}.title AS category,
			is_active");

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

	public function check_judge($id, $pin) {
			$query = $this->db->select('judge.judge_id, pin')
							->from('judge')
							->join('judge_summit', 'judge.judge_id = judge_summit.judge_id')
							->join('summit', 'judge_summit.summit_id = summit.summit_id')
							->where('judge.judge_id', $id)
							->where('pin = SHA2(' . $pin . ', 256)')
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
