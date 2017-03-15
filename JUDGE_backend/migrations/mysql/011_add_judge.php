<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE judge (
                            judge_id    INT(11)     NOT NULL    AUTO_INCREMENT,
                            user_name   VARCHAR(50)     NOT NULL,
                            first_name  VARCHAR(50)    NOT NULL,
                            last_name   VARCHAR(50)    NOT NULL,
                            judge_category_id    INT(11)     NOT NULL,
                            is_active   TINYINT(1)      NOT NULL,

                            FOREIGN KEY (judge_category_id) REFERENCES judge_category(judge_category_id),

                            PRIMARY KEY (judge_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE judge;";
                $this->db->query($sql);
        }
}
?>