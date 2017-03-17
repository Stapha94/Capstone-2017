<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_poster_abstract extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE poster_abstract (
                            poster_abstract_id     INT(11)     NOT NULL        AUTO_INCREMENT,
                            title           VARCHAR(255)    NOT NULL,
                            objective       TEXT    NOT NULL,
                            methods         TEXT    NOT NULL,
                            results         TEXT    NOT NULL,
                            conclusion      TEXT    NOT NULL,

                            PRIMARY KEY (poster_abstract_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE poster_abstract;";
                $this->db->query($sql);
        }
}
?>