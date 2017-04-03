<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_awards extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO award (award_id, title)
                VALUES (0, 'No award'),
                		(1, 'Outstanding PS Award'),
                        (2, 'Outstanding QI Award'),
                        (3, 'Best Integrated/Sustainable QI Project'),
                        (4, 'Best Interdisciplinary Team');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM award
                WHERE title = 'No award' OR
					  title = 'Outstanding PS Award' OR
                      title = 'Outstanding QI Award' OR
                      title = 'Best Integrated/Sustainable QI Project' OR
                      title = 'Best Interdisciplinary Team';";

        $this->db->query($sql);
    }
}
?>