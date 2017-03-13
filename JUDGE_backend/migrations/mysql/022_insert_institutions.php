<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_institutions extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO institution (title)
                VALUES ('MUSOM'),
                        ('CHH'),
                        ('MUSOP'),
                        ('MU Nursing');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "DELETE FROM institution
                WHERE title = 'MUSOM' OR
                      title = 'CHH'   OR
                      title = 'MUSOP' OR
                      title =  'MU Nursing';";

        $this->db->query($sql);
    }
}
?>