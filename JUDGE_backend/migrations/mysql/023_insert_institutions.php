<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_institutions extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO institution (title, judge_category_id)
                VALUES ('MUSOM', 1),
                        ('CHH', 2),
                        ('MUSOP', 1),
                        ('MU Nursing', 1);";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "set FOREIGN_KEY_CHECKS = 0;";

        $this->db->query($sql);

        $sql = "DELETE FROM institution
                WHERE title = 'MUSOM' OR
                      title = 'CHH'   OR
                      title = 'MUSOP' OR
                      title =  'MU Nursing';";

        $this->db->query($sql);
    }
}
?>