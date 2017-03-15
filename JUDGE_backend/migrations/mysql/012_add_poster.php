<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_poster extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE poster (
                            poster_id       INT(11)     NOT NULL        AUTO_INCREMENT,
                            poster_category_id  INT(11)  NOT NULL,
                            award_id        INT(11)		NOT NULL,
                            presenter_id    INT(11)     NOT NULL,
                            abstract_id     INT(11)         NOT NULL,
                            submission_date DATETIME        NOT NULL,
                            summit_id       INT(11)     NOT NULL,

                            FOREIGN KEY (poster_category_id) REFERENCES poster_category(poster_category_id),

                            FOREIGN KEY (award_id) REFERENCES award(award_id),

                            FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id),
                            
                            FOREIGN KEY (abstract_id) REFERENCES abstract(abstract_id),

                            FOREIGN KEY (summit_id) REFERENCES summit(summit_id),

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