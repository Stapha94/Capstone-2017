<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_roles extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO role (title, poster_category_id)
                VALUES ('Faculty Member', 4),
                        ('CHH Employee', 1),
                        ('Resident or Fellow', 2),
                        ('Medical Student', 3),
                        ('Pharmacy', 3);";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM role
                WHERE title = 'Faculty Member' OR
                      title = 'CHH Employee'   OR
                      title = 'Resident or Fellow' OR
                      title =  'Medical Student'   OR
                      title =  'Pharmacy';";

        $this->db->query($sql);
    }
}
?>