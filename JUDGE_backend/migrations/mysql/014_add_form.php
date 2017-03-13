<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_form extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE form (
                            form_id     INT(11)     NOT NULL    AUTO_INCREMENT,
                            poster_id   INT(11)     NOT NULL,
                            judge_id    INT(11)     NOT NULL,
                            total       INT(3),
                            comments    TEXT,

                            FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

                            FOREIGN KEY (judge_id) REFERENCES judge(judge_id),

                            PRIMARY KEY (form_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE form;";
                $this->db->query($sql);
        }
}
?>