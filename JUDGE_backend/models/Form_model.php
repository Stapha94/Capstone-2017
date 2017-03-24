<?php
class Form_model extends CI_Model {

	private $form_id;
	private $poster_id;
	private $judge_id;
	private $total;
	private $comments;

	public function __construct()
	{
		$this->fields = array('form_id', 'poster_id', 'judge_id', 'total', 'comments');
		$this->name = 'form';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
				{$joins['j']}_id,
				{$joins['po']}_id,
                total,
                comments");

		// Put any joins here

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
				$form_id = $this->db->insert_id();
				$query = $this->db->get_where($this->name, array('form_id' => $form_id));
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
			return $this->db->update($this->name, $data);
		} catch (Exception $e) {
			return false;
		}
	}

	public function joins()
	{
		$joins = array(
			'j' => 'judge',
			'po' => 'poster'
		);
		return $joins;
	}

}
?>
