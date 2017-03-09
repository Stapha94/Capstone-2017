<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_judge extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE judge (
                            judge_id    INT(11)     NOT NULL    AUTO_INCREMENT,
                            summit_id   INT(11)         NOT NULL,
                            first_name  VARCHAR(255)    NOT NULL,
                            last_name   VARCHAR(255)    NOT NULL,
                            category    VARCHAR(50)     NOT NULL,
                            is_active   TINYINT(1)      NOT NULL,

                            FOREIGN KEY (summit_id) REFERENCES summit(summit_id),

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