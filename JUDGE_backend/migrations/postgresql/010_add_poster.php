<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_poster extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE poster (
                            poster_id       INT(11)     NOT NULL        AUTO_INCREMENT,
                            category        VARCHAR(20) NOT NULL,
                            title           VARCHAR(100) NOT NULL,
                            award           VARCHAR(50),
                            presenter_id    INT(11)     NOT NULL,
                            summit_id       INT(11)     NOT NULL,

                            FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id),

                            PRIMARY KEY (poster_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE poster;";
                $this->db->query($sql);
        }
}
?>