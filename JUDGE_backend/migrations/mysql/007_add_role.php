<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_role extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE role (
                            role_id         INT(11) NOT NULL    AUTO_INCREMENT,
                            poster_category_id  INT(11) NOT NULL,
                            title           VARCHAR(50)    NOT NULL,
                            active          TINYINT(1)      NOT NULL DEFAULT 1,
                            
                            FOREIGN KEY (poster_category_id) REFERENCES poster_category(poster_category_id),
                            
                            UNIQUE (title),

                            PRIMARY KEY (role_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE role;";
                $this->db->query($sql);
        }
}
?>