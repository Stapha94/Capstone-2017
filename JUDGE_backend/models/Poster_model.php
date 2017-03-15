<?php
class Poster_model extends CI_Model {

        private $poster_id;
        private $poster_category_id;
        private $award_id;
        private $abstract_id;
        private $presenter_id;
        private $summit_id;

        public function __construct()
        {
                $this->name = 'poster';
                parent::__construct();
        }

        public function get($id = NULL)
        {
            // Load foreign tables
            $joins = $this->joins();

            // All the select fields

            $this->db->select("{$this->name}_id,
                {$joins['pc']}.title AS category,
                {$joins['aw']}.title AS award,
                {$joins['ab']}.title AS poster_title,
                {$joins['ab']}.objective,
                {$joins['ab']}.methods,
                {$joins['ab']}.results,
                {$joins['ab']}.conclusion,
                {$joins['pr']}.first_name,
                {$joins['pr']}.last_name,
                {$joins['pr']}.suffix,
                {$joins['pr']}.email,
                {$joins['i']}.title AS institution,
                {$joins['r']}.title AS role,
                {$joins['pr']}.is_registered,
                {$joins['s']}.summit_start,
                {$joins['s']}.summit_end,
                {$joins['s']}.registration_deadline");

            // Put any joins here

            $this->db->join("{$joins['pc']}", "{$joins['pc']}.{$joins['pc']}_id = {$this->name}.{$joins['pc']}_id");
            $this->db->join("{$joins['aw']}", "{$joins['aw']}.{$joins['aw']}_id = {$this->name}.{$joins['aw']}_id");
            $this->db->join("{$joins['ab']}", "{$joins['ab']}.{$joins['ab']}_id = {$this->name}.{$joins['ab']}_id");
            $this->db->join("{$joins['pr']}", "{$joins['pr']}.{$joins['pr']}_id = {$this->name}.{$joins['pr']}_id");
            $this->db->join("{$joins['i']}", "{$joins['i']}.{$joins['i']}_id = {$joins['p']}.{$joins['i']}_id");
            $this->db->join("{$joins['r']}", "{$joins['r']}.{$joins['r']}_id = {$joins['p']}.{$joins['r']}_id");
            $this->db->join("{$joins['s']}", "{$joins['s']}.{$joins['s']}_id = {$this->name}.{$joins['s']}_id");

            // Where clauses here...must be conditionally based. I'll work on that later

            if($id) {
                $this->db->where("{$this->name}_id", $id);
            }
            $query = $this->db->get($this->name);
            $result = $query->result();
            return $result;
        }

        public function joins() {
        	$joins = array(
        		'pc' => 'poster_category',
				'aw' => 'award',
				'ab' => 'abstract',
				'pr' => 'presenter',
				'i' => 'institution',
				'r' => 'role',
				's' => 'summit'
			);
        	return $joins;
		}

}
?>
