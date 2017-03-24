<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_role extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE role (
                            role_id         SERIAL,
                            title           VARCHAR(50)    NOT NULL,
			                active      SMALLINT     NOT NULL DEFAULT 1,

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