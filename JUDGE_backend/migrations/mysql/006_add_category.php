<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_category extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE category (
                            category_id  INT(11) NOT NULL    AUTO_INCREMENT,
                            title           VARCHAR(255)    NOT NULL,
                            active          TINYINT(1)      NOT NULL DEFAULT 1,

                            PRIMARY KEY (category_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE category;";
                $this->db->query($sql);
        }
}
?>