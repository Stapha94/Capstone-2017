<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_roles extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO role (title)
                VALUES ('Faculty Member'),
                        ('CHH Employee'),
                        ('Resident or Fellow'),
                        ('Medical Student'),
                        ('Pharmacy');";

        $this->db->query($sql);
    }

    public function down()
    {
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