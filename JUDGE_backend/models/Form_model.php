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
