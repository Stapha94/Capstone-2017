<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_form_question extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE form_question (
                            form_id     INTEGER     NOT NULL REFERENCES form(form_id) ON DELETE CASCADE,
                            question_id INTEGER     NOT NULL REFERENCES question(question_id) ON DELETE CASCADE,
                            score       INTEGER      NOT NULL DEFAULT 0,

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