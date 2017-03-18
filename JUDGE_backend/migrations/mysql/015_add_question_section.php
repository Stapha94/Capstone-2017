<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_question_section extends CI_Migration {

    public function up()
    {
        $sql = "CREATE TABLE question_section (
                            question_section_id    INT(11)         NOT NULL     AUTO_INCREMENT,
                            title   VARCHAR(100)                   NOT NULL,
                            active	TINYINT(1)		NOT NULL DEFAULT 1,

                            PRIMARY KEY (question_section_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "DROP TABLE question_section;";
        $this->db->query($sql);
    }
}
?>