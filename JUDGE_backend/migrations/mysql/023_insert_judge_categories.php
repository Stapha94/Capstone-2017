<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_judge_categories extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO judge_category (title)
                VALUES ('Marshall'),
                        ('Cabell');";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "DELETE FROM judge_category
                WHERE title = 'Marshall', OR
                      title = 'Cabell';";

        $this->db->query($sql);
    }
}
?>