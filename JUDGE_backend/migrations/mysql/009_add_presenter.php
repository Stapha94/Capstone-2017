<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_presenter extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE presenter (
                            presenter_id    INT(11) NOT NULL    AUTO_INCREMENT,
                            first_name      VARCHAR(50)    NOT NULL,
                            last_name       VARCHAR(50)    NOT NULL,
                            suffix          VARCHAR(10),
                            email           VARCHAR(50)    NOT NULL,
                            institution_id  INT(11)         NOT NULL,
                            role_id         INT(11)         NOT NULL,
                            abstract_id     INT(11)         NOT NULL,
                            submission_date DATETIME        NOT NULL,
                            is_registered   TINYINT(1)      NOT NULL,

                            FOREIGN KEY (institution_id) REFERENCES institution(institution_id),

                            FOREIGN KEY (role_id) REFERENCES role(role_id),

                            FOREIGN KEY (abstract_id) REFERENCES abstract(abstract_id),

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