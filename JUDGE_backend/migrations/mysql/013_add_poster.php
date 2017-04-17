<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_poster extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE poster (
                            poster_id       INT(11)     NOT NULL        AUTO_INCREMENT,
                            poster_number	INT(11)		NOT NULL,
                            poster_category_id	INT(11)	NOT NULL,
                            award_id        INT(11),
                            presenter_id    INT(11)     NOT NULL,
                            poster_abstract_id     INT(11)         NOT NULL,
                            submission_date DATETIME        NOT NULL,
                            summit_id       INT(11)     NOT NULL,
                            score			INT(11)		NOT NULL DEFAULT 0,
                            
                            FOREIGN KEY (poster_category_id) REFERENCES poster_category(poster_category_id),

                            FOREIGN KEY (award_id) REFERENCES award(award_id),

                            FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id),
                            
                            FOREIGN KEY (poster_abstract_id) REFERENCES poster_abstract(poster_abstract_id),

                            FOREIGN KEY (summit_id) REFERENCES summit(summit_id),
                            
                            UNIQUE (poster_number, poster_category_id),

                            PRIMARY KEY (poster_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE poster;";
                $this->db->query($sql);
        }
}
?>