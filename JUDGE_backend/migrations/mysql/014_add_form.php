<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_form extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE form (
                            form_id     INT(11)     NOT NULL    AUTO_INCREMENT,
                            poster_id   INT(11)     NOT NULL,
                            judge_id    INT(11)     NOT NULL,
                            award_recommendation_id INT(11)	NOT NULL DEFAULT 1,
                            further_evaluation	TINYINT(1) NOT NULL DEFAULT 1,
                            total       INT(3) NOT NULL DEFAULT 0,
                            judged		TINYINT(1)	NOT NULL DEFAULT 0,
                            comments    TEXT,

                            FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

                            FOREIGN KEY (judge_id) REFERENCES judge(judge_id),
                            
                            FOREIGN KEY (award_recommendation_id) REFERENCES award(award_id),

                            PRIMARY KEY (form_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE form;";
                $this->db->query($sql);
        }
}
?>