<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_key_participant extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE key_participant (
                            key_participant_id      INT(11)     NOT NULL        AUTO_INCREMENT,
                            presenter_id            INT(11)     NOT NULL,
                            first_name              VARCHAR(255)    NOT NULL,
                            last_name               VARCHAR(255)    NOT NULL,
                            department              VARCHAR(255)    NOT NULL,
                            institution_id          INT(11)         NOT NULL,
                            role_id                 INT(11)         NOT NULL,

                            FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id) ON DELETE CASCADE,

                            FOREIGN KEY (institution_id) REFERENCES institution(institution_id),

                            FOREIGN KEY (role_id) REFERENCES role(role_id),

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