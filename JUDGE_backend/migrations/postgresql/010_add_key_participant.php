<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_key_participant extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE key_participant (
                            key_participant_id      SERIAL,
                            presenter_id            INTEGER     NOT NULL REFERENCES presenter(presenter_id) ON DELETE CASCADE,
                            first_name              VARCHAR(50)    NOT NULL,
                            last_name               VARCHAR(50)    NOT NULL,
                            department              VARCHAR(100)    NOT NULL,
                            institution_id          INTEGER         NOT NULL REFERENCES institution(institution_id),
                            role_id                 INTEGER         NOT NULL REFERENCES role(role_id),
                            
                            PRIMARY KEY (key_participant_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE key_participant;";
                $this->db->query($sql);
        }
}
?>