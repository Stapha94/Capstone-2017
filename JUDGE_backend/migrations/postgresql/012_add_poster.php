<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_poster extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE poster (
                            poster_id       SERIAL,
                            poster_category_id  INTEGER  NOT NULL REFERENCES poster_category(poster_category_id),
                            award_id        INTEGER		NOT NULL REFERENCES award(award_id),
                            presenter_id    INTEGER     NOT NULL REFERENCES presenter(presenter_id),
                            poster_abstract_id     INTEGER         NOT NULL REFERENCES poster_abstract(poster_abstract_id),
                            submission_date TIMESTAMP        NOT NULL,
                            summit_id       INTEGER     NOT NULL REFERENCES summit(summit_id),
                            score			INTEGER		NOT NULL DEFAULT 0,

                            PRIMARY KEY (poster_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE poster;";
                $this->db->query($sql);
        }
}
?>