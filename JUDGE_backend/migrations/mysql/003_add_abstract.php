<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_abstract extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE abstract (
                            abstract_id     INT(11)     NOT NULL        AUTO_INCREMENT,
                            title           VARCHAR(255)    NOT NULL,
                            objective       TEXT    NOT NULL,
                            methods         TEXT    NOT NULL,
                            results         TEXT    NOT NULL,
                            conclusion      TEXT    NOT NULL,

                            PRIMARY KEY (abstract_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE abstract;";
                $this->db->query($sql);
        }
}
?>