<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_role extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE role (
                            role_id         INT(11) NOT NULL    AUTO_INCREMENT,
                            title           VARCHAR(50)    NOT NULL,
                            active          TINYINT(1)      NOT NULL DEFAULT 1,

                            PRIMARY KEY (role_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE role;";
                $this->db->query($sql);
        }
}
?>