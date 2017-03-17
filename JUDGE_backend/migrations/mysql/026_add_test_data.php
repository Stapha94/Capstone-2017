<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_test_data extends CI_Migration {

    public function up()
    {

        $sql = "INSERT INTO admin (email, password)
                VALUES ('admin@test.com', SHA2('password', 256));";

        $this->db->query($sql);

        $sql = "INSERT INTO summit(created_by_admin_id, summit_start, summit_end, registration_deadline, pin)
                VALUES (1, NOW(), '2018-12-31 23:59:59', '2018-12-31 23:59:59', SHA2(1234, 256));";

        $this->db->query($sql);

        $sql = "INSERT INTO poster_abstract (title, objective, methods, results, conclusion)
                VALUES ('Test title', 'Test objective', 'Test methods', 'Test results', 'Test conclusion');";

        $this->db->query($sql);                        

        $sql = "INSERT INTO presenter (first_name, last_name, email, institution_id, role_id, is_registered)
                VALUES ('Mark', 'Adkins', 'test@test.com', 1, 1, 1);";

        $this->db->query($sql);

        $sql = "INSERT INTO poster (poster_category_id, award_id, poster_abstract_id, summit_id, presenter_id, submission_date)
                VALUES (1, 0, 1, 1, 1, NOW());";

        $this->db->query($sql);

        $sql = "INSERT INTO judge (user_name, first_name, last_name, judge_category_id, is_active)
                VALUES ('MUSOMFox', 'Paul', 'Fox', 1, 1);";

        $this->db->query($sql);

        $sql = "INSERT INTO judge_summit (judge_id, summit_id)
                VALUES (1, 1);";

        $this->db->query($sql);

        $sql = "INSERT INTO judge_poster (judge_id, poster_id)
                VALUES (1, 1);";

        $this->db->query($sql);

        $sql = "INSERT INTO form (poster_id, judge_id, total)
                VALUES (1, 1, 50);";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM admin
                WHERE email = 'admin@test.com' AND password = SHA2('password', 256);";

        $this->db->query($sql);

        $sql = "DELETE FROM summit
                WHERE created_by_admin_id = 1 AND summit_end = '2018-12-31 23:59:59' AND registration_deadline = '2018-12-31 23:59:59' AND pin = SHA2(1234, 256);";

        $this->db->query($sql);

        $sql = "DELETE FROM poster_abstract
                WHERE title = 'Test title' AND objective = 'Test objective' AND methods = 'Test methods' AND results = 'Test results' AND conclusion = 'Test conclusion';";

        $this->db->query($sql);                        

        $sql = "DELETE FROM presenter
                WHERE first_name = 'Mark' AND last_name = 'Adkins' AND email = 'test@test.com' AND institution_id = 1 AND role_id = 1 AND is_registered = 1;";

        $this->db->query($sql);

        $sql = "DELETE FROM poster
                WHERE poster_category_id = 1 AND poster_abstract_id = 1 AND award_id = 0 AND presenter_id = 1;";

        $this->db->query($sql);

        $sql = "DELETE FROM judge
                WHERE user_name = 'MUSOMFox';";

        $this->db->query($sql);

        $sql = "DELETE FROM judge_summit
                WHERE judge_id = 1 AND summit_id = 1;";

        $this->db->query($sql);

        $sql = "DELETE FROM judge_poster
                WHERE judge_id = 1 AND poster_id = 1;";

        $this->db->query($sql);

        $sql = "DELETE FROM form
                WHERE poster_id = 1 AND judge_id = 1 AND total = 50;";

        $this->db->query($sql);
    }
}
?>