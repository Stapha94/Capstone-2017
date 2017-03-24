<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_question_sections extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO question_section (title)
                VALUES ('Layout and structure'),
                ('PDSA - Plan Do Study Act');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM question_section
                WHERE title = 'Layout and structure' OR
                      title = 'PDSA - Plan Do Study Act';";

        $this->db->query($sql);
    }
}
?>