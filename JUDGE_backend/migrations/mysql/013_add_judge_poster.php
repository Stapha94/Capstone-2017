<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge_poster extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE judge_poster (
                            poster_id       INT(11)     NOT NULL,
                            judge_id        INT(11)     NOT NULL,

                            FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

                            FOREIGN KEY (judge_id) REFERENCES judge(judge_id),

                            PRIMARY KEY (poster_id, judge_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE judge_poster;";
                $this->db->query($sql);
        }
}
?>