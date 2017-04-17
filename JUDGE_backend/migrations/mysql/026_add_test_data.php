<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_test_data extends CI_Migration {

    public function up()
    {
    	$hash = password_hash('password', PASSWORD_BCRYPT);
    	$pin = password_hash('1234', PASSWORD_BCRYPT);

        $sql = "INSERT INTO admin (email, first_name, last_name, password)
                VALUES ('adkins1065@marshall.edu', 'Mark', 'Adkins', '{$hash}');";

        $this->db->query($sql);

        $sql = "INSERT INTO summit(created_by_admin_id, summit_start, summit_end, registration_deadline, pin)
                VALUES (1, '2017-4-18 08:00', '2017-4-18 10:30', '2017-4-17 4:00', '{$pin}');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM admin
                WHERE email = 'admin@test.com';";

        $this->db->query($sql);

        $sql = "DELETE FROM summit
                WHERE created_by_admin_id = 1 AND summit_end = '2018-12-31 23:59:59' AND registration_deadline = '2018-12-31 23:59:59';";

        $this->db->query($sql);
    }
}
?>