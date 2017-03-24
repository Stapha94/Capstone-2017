<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE judge (
                            judge_id    SERIAL,
                            user_name   VARCHAR(50)     NOT NULL,
                            first_name  VARCHAR(50)    NOT NULL,
                            last_name   VARCHAR(50)    NOT NULL,
                            judge_category_id    INTEGER     NOT NULL REFERENCES judge_category(judge_category_id),
							active      SMALLINT     NOT NULL DEFAULT 1,

                            PRIMARY KEY (judge_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE judge;";
                $this->db->query($sql);
        }
}
?>