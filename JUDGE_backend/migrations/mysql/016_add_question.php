<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_question extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE question (
                            question_id     INT(11)     NOT NULL        AUTO_INCREMENT,
                            question_section_id         INT(11)         NOT NULL,
                            description     VARCHAR(255)    NOT NULL,

                            FOREIGN KEY (question_section_id) REFERENCES question_section(question_section_id),

                            PRIMARY KEY (question_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE question;";
                $this->db->query($sql);
        }
}
?>