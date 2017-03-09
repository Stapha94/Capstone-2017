<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_form_question extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE form_question (
                            form_id     INT(11)     NOT NULL,
                            question_id INT(11)     NOT NULL,
                            score       INT(1)      NOT NULL,

                            FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE,

                            FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,

                            PRIMARY KEY (form_id, question_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE form_question;";
                $this->db->query($sql);
        }
}
?>