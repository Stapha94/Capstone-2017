<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge_category extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE judge_category (
                            judge_category_id  INT(11) NOT NULL    AUTO_INCREMENT,
                            title           VARCHAR(20)    NOT NULL,
                            active          TINYINT(1)      NOT NULL DEFAULT 1,

                            PRIMARY KEY (judge_category_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE judge_category;";
                $this->db->query($sql);
        }
}
?>