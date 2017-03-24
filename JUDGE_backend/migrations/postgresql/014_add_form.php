<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_form extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE form (
                            form_id     SERIAL,
                            poster_id   INTEGER     NOT NULL REFERENCES poster(poster_id),
                            judge_id    INTEGER     NOT NULL REFERENCES judge(judge_id),
                            total       INTEGER,
                            comments    TEXT,

                            PRIMARY KEY (form_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE form;";
                $this->db->query($sql);
        }
}
?>