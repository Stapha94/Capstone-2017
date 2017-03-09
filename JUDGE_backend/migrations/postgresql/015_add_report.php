<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_report extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE report (
                            report_id       INT(11)     NOT NULL        AUTO_INCREMENT,
                            summit_id       INT(11)     NOT NULL,
                            presenter_id    INT(11)     NOT NULL,
                            poster_id       INT(11)     NOT NULL,
                            score           INT(3)      NOT NULL,

                            FOREIGN KEY (summit_id) REFERENCES summit(summit_id),

                            FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id),

                            FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

                            PRIMARY KEY (report_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE report;";
                $this->db->query($sql);
        }
}
?>