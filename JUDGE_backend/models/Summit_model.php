<?php
class Summit_model extends CI_Model {

        private $summit_id;
        private $summit_start;
        private $summit_end;
        private $registration_deadline;
        private $created_by_admin_id;
        private $pin;

        public function __construct()
        {
                parent::__construct();
        }

        public function check_pin($pin, $date) {

            $query = $this->db->select('pin')
                              ->from('summit')
                              ->where('summit_start <', $date)
                              ->where('summit_end >', $date)
                              ->where('pin = SHA2(' . $pin . ', 256)')
                              ->limit(1)
                              ->get();
            $result = $query->result();
            return $result;
        }

}
?>
