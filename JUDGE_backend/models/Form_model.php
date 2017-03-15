<?php
class Form_model extends CI_Model {

	private $form_id;
	private $poster_id;
	private $judge_id;
	private $total;
	private $comments;

	public function __construct()
	{
		$this->name = 'form';
		parent::__construct();
	}

	public function get($judge_id = NULL, $poster_id = NULL, $form_id = NULL)
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}_id,
                total,
                comments");

		// Put any joins here

		// Where clauses here...must be conditionally based. I'll work on that later
		if($judge_id) {
			$this->db->where("{$joins['j']}_id", intval($judge_id));
		}
		if($poster_id) {
			$this->db->where("{$joins['po']}_id", intval($poster_id));
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
