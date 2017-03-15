<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_poster_categories extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO poster_category (title)
                VALUES ('CHH'),
                        ('RESIDENT'),
                        ('STUDENT'),
                        ('OTHER');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM poster_category
                WHERE title = 'CHH' OR
                      title = 'RESIDENT' OR
                      title = 'STUDENT' OR
                      title = 'OTHER';";

        $this->db->query($sql);
    }
}
?>