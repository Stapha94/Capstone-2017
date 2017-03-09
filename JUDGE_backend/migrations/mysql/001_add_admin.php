<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_admin extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE admin (
                admin_id    INT(11)  NOT NULL    AUTO_INCREMENT,
                email       VARCHAR(50) NOT NULL,
                password    VARCHAR(255)    NOT NULL,

                PRIMARY KEY (admin_id)
                );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE admin;";
                $this->db->query($sql);
        }
}
?>