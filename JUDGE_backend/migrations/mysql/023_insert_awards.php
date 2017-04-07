<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_awards extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO award (title)
                VALUES  ('No award'),
                		('Outstanding PS Award'),
                        ('Outstanding QI Award'),
                        ('Best Integrated/Sustainable QI Project'),
                        ('Best Interdisciplinary Team');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM award
                WHERE title = 'Outstanding PS Award' OR
                      title = 'Outstanding QI Award' OR
                      title = 'Best Integrated/Sustainable QI Project' OR
                      title = 'Best Interdisciplinary Team';";

        $this->db->query($sql);
    }
}
?>