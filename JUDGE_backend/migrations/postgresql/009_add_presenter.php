<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_presenter extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE presenter (
                            presenter_id    SERIAL,
                            first_name      VARCHAR(50)    NOT NULL,
                            last_name       VARCHAR(50)    NOT NULL,
                            suffix          VARCHAR(10),
                            email           VARCHAR(50)    NOT NULL,
                            institution_id  INTEGER         NOT NULL REFERENCES institution(institution_id),
                            role_id         INTEGER         NOT NULL REFERENCES role(role_id),
                            is_registered   SMALLINT      NOT NULL,

                            PRIMARY KEY (presenter_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE presenter;";
                $this->db->query($sql);
        }
}
?>