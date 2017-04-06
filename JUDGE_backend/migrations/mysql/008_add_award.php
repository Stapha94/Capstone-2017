<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_award extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE award (
                            award_id  INT(11) NOT NULL AUTO_INCREMENT,
                            title           VARCHAR(50)    NOT NULL,
                            active          TINYINT(1)      NOT NULL DEFAULT 1,
                            
                            UNIQUE (title),

                            PRIMARY KEY (award_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE award;";
                $this->db->query($sql);
        }
}
?>