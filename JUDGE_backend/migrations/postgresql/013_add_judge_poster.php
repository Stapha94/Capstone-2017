<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge_poster extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE judge_poster (
                            poster_id       INTEGER     NOT NULL REFERENCES poster(poster_id),
                            judge_id        INTEGER     NOT NULL REFERENCES judge(judge_id),

                            PRIMARY KEY (poster_id, judge_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE judge_poster;";
                $this->db->query($sql);
        }
}
?>