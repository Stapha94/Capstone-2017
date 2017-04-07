<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_test_data extends CI_Migration {

    public function up()
    {
    	$hash = password_hash('password', PASSWORD_BCRYPT);
    	$pin = password_hash('1234', PASSWORD_BCRYPT);

        $sql = "INSERT INTO admin (email, first_name, last_name, password)
                VALUES ('admin@test.com', 'Mark', 'Adkins', '{$hash}');";

        $this->db->query($sql);

        $sql = "INSERT INTO summit(created_by_admin_id, summit_start, summit_end, registration_deadline, pin)
                VALUES (1, NOW(), '2018-12-31 23:59:59', '2018-12-31 23:59:59', '{$pin}');";

        $this->db->query($sql);

        $sql = "INSERT INTO poster_abstract (title, objective, methods, results, conclusion)
                VALUES ('Test title', 'Test objective', 'Test methods', 'Test results', 'Test conclusion');";

        $this->db->query($sql);                        

        $sql = "INSERT INTO presenter (first_name, last_name, email, institution_id, role_id)
                VALUES ('Mark', 'Adkins', 'test@test.com', 1, 1);";

        $this->db->query($sql);

        $sql = "INSERT INTO poster (poster_abstract_id, summit_id, award_id, presenter_id, submission_date)
                VALUES (1, 1, 1, 1, NOW()),
                		(1, 1, 1, 1, NOW()),
                		(1, 1, 1, 1, NOW()),
                		(1, 1, 1, 1, NOW());";

        $this->db->query($sql);

        $sql = "INSERT INTO judge (email, first_name, last_name, judge_category_id)
                VALUES ('judge@test.com', 'Paul', 'Fox', 1);";

        $this->db->query($sql);

        $sql = "INSERT INTO form (judge_id, poster_id, total)
				VALUES (1, 1, 0);";

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

        $sql = "DELETE FROM poster_abstract
                WHERE title = 'Test title' AND objective = 'Test objective' AND methods = 'Test methods' AND results = 'Test results' AND conclusion = 'Test conclusion';";

        $this->db->query($sql);

        $sql = "DELETE FROM presenter
                WHERE first_name = 'Mark' AND last_name = 'Adkins' AND email = 'test@test.com' AND institution_id = 1 AND role_id = 1;";

        $this->db->query($sql);

        $sql = "DELETE FROM poster
                WHERE poster_category_id = 1 AND poster_abstract_id = 1 AND award_id = 0 AND presenter_id = 1;";

        $this->db->query($sql);

        $sql = "DELETE FROM judge
                WHERE email = 'judge@test.com';";

        $this->db->query($sql);
    }
}
?>