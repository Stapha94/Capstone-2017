<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_question extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE question (
                            question_id     INT(11)     NOT NULL        AUTO_INCREMENT,
                            description     VARCHAR(255)    NOT NULL,

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