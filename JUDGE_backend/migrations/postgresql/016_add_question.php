<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_question extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE question (
                            question_id     SERIAL,
                            question_section_id         INTEGER         NOT NULL REFERENCES question_section(question_section_id),
                            description     VARCHAR(255)    NOT NULL,
                			active      SMALLINT     NOT NULL DEFAULT 1,

                            PRIMARY KEY (question_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE question;";
                $this->db->query($sql);
        }
}
?>