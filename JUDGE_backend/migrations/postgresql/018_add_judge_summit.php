<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge_summit extends CI_Migration {

    public function up()
    {
        $sql = "CREATE TABLE judge_summit (
                            judge_id    INTEGER       NOT NULL REFERENCES judge(judge_id),
                            summit_id   INTEGER         NOT NULL REFERENCES summit(summit_id),
                            
                            PRIMARY KEY (judge_id, summit_id)
                        );";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "DROP TABLE judge_summit;";
        $this->db->query($sql);
    }
}
?>