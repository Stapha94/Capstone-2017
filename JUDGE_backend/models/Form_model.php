<?php
class Form_model extends CI_Model {

	private $form_id;
	private $poster_id;
	private $judge_id;
	private $summit_id;
	private $total;
	private $comments;

	public function __construct()
	{
		// These are for filtering the data.
		$this->fields = array('form_id', 'poster_id', 'judge_id', 'award_recommendation_id', 'further_evaluation', 'total', 'judged', 'comments');
		$this->filter = array(
			'form_id' => 'form',
			'poster_id' => 'form',
			'judge_id' => 'form',
			'poster_number' => 'poster',
			'judge_category_id' => 'judge_category',
			'summit_id' => 'poster',
			'judged' => 'form',
			'active' => 'presenter',
			'award_recommendation_id' => 'form'
			// This can be added as the need arises
		);
		$this->name = 'form';
		parent::__construct();
	}

	public function get($params = array())
	{
		// Load foreign tables
		$joins = $this->joins();

		// All the select fields

		$this->db->select("{$this->name}.{$this->name}_id,
				{$this->name}.judge_id,
				{$this->name}.poster_id,
				{$joins['po']}.poster_number,
				{$joins['j']}.first_name AS {$joins['j']}_first_name,
				{$joins['j']}.last_name AS {$joins['j']}_last_name,
				{$joins['j']}.email AS {$joins['j']}_email,
				{$joins['jc']}.title AS {$joins['j']}_category,
				{$joins['j']}.active,
				{$joins['s']}.{$joins['s']}_id,
				{$joins['pc']}.title AS {$joins['po']}_category,
				{$joins['aw']}.title AS recommended_award,
				{$joins['pr']}.first_name AS {$joins['pr']}_first_name,
				{$joins['pr']}.last_name AS {$joins['pr']}_last_name,
				{$joins['pr']}.suffix,
				{$joins['pr']}.email,
				{$joins['i']}.title AS institution,
				{$joins['r']}.title AS role,
				{$joins['pr']}.active,
				{$joins['pa']}.title AS {$joins['po']}_title,
				{$joins['pa']}.objective,
				{$joins['pa']}.methods,
				{$joins['pa']}.results,
				{$joins['pa']}.conclusion,
				{$joins['po']}.submission_date,
				{$joins['po']}.score AS {$joins['po']}_score,
				{$joins['po']}.summit_id,
				award_recommendation_id,
				further_evaluation,
				judged,
                total,
                comments");

		// Put any joins here
		$this->db->join("{$joins['j']}", "{$joins['j']}.{$joins['j']}_id = {$this->name}.{$joins['j']}_id");
		$this->db->join("{$joins['jc']}", "{$joins['jc']}.{$joins['jc']}_id = {$joins['j']}.{$joins['jc']}_id");
		$this->db->join("{$joins['po']}", "{$joins['po']}.{$joins['po']}_id = {$this->name}.{$joins['po']}_id");
		$this->db->join("{$joins['aw']}", "{$joins['aw']}.{$joins['aw']}_id = {$this->name}.{$joins['aw']}_recommendation_id");
		$this->db->join("{$joins['pa']}", "{$joins['pa']}.{$joins['pa']}_id = {$joins['po']}.{$joins['pa']}_id");
		$this->db->join("{$joins['pr']}", "{$joins['pr']}.{$joins['pr']}_id = {$joins['po']}.{$joins['pr']}_id");
		$this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$joins['pr']}.{$joins['i']}_id");
		$this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$joins['pr']}.{$joins['r']}_id");
		$this->db->join("{$joins['pc']}", "{$joins['pc']}.{$joins['pc']}_id = {$joins['r']}.{$joins['pc']}_id");
		$this->db->join("{$joins['s']}", "{$joins['s']}.{$joins['s']}_id = {$joins['po']}.{$joins['s']}_id");

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
				$form_id = $this->db->insert_id();
				$query = $this->get(array('form_id' => $form_id));
				return $query;
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

	public function delete($data = array()) {
		try {
			$id = $data['id'];
			return $this->db->delete($this->name, array("{$this->name}_id" => $id));
		} catch (Exception $e) {
			return false;
		}
	}

	public function joins()
	{
		$joins = array(
			'j' => 'judge',
			'po' => 'poster',
			's'  => 'summit'
		);

		// For many-to-many tables, I've provided functions to load all the joins for the two tables.
		$joins = array_merge($joins, $this->poster->joins());
		$joins = array_merge($joins, $this->judge->joins());
		return $joins;
	}

	public function generate_report_forms($params = array()) {
		$forms = [];
		if(count($params) > 0) {
			$query = $this->get($params);
			$result = $query->result();

			foreach($result as $key=>$value) {
				$suffix = $value->suffix;
				if (isset($suffix)) {
					$full_name = $value->presenter_first_name . ' ' . $value->presenter_last_name . ' ' . $value->suffix;
				} else {
					$full_name = $value->presenter_first_name . ' ' . $value->presenter_last_name . ' ' . $value->suffix;
				}
				$forms[$key]['author'] = $full_name;
				$forms[$key]['category'] = $value->role;
				$forms[$key]['department'] = $value->department;
				$forms[$key]['status'] = $value->poster_score;
				$forms[$key]['publication'] = $value->publication;
			}
		}
		return $forms;
	}

}
?>
