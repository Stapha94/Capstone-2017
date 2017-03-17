<?php
class Question_model extends CI_Model {

        private $question_id;
        private $question_section_id;
        private $description;

        public function __construct()
        {
        		$this->fields = array('question_id', 'question_description_id', 'description');
        		$this->name = 'question';
                parent::__construct();
        }

        public function get($params = array())
        {
			// Load foreign tables
			$joins = $this->joins();

			// All the select fields

			$this->db->select("{$this->name}_id,
                {$joins['qs']}.title AS section,
                description");

			// Put any joins here

			$this->db->join("{$joins['qs']}", "{$joins['qs']}.{$joins['qs']}_id = {$this->name}.{$joins['qs']}_id");

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
					'qs' => 'question_section'
				);
				return $joins;
		}

}
?>
