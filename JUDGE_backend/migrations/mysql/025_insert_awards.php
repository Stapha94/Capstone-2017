<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_awards extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO award (title)
                VALUES ('Outstanding PS Award'),
                        ('Outstanding QI Award'),
                        ('Best Integrated/Sustainable QI Project'),
                        ('Best Interdisciplinary Team');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "DELETE FROM poster_category
                WHERE title = 'Outstanding PS Award', OR
                      title = 'Outstanding QI Award', OR
                      title = 'Best Integrated/Sustainable QI Project', OR
                      title = 'Best Interdisciplinary Team';";

        $this->db->query($sql);
    }
}
?>