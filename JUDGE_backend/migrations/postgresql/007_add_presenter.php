<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_presenter extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE presenter (
                            presenter_id    INT(11) NOT NULL    AUTO_INCREMENT,
                            first_name      VARCHAR(255)    NOT NULL,
                            last_name       VARCHAR(255)    NOT NULL,
                            email           VARCHAR(255)    NOT NULL,
                            institution     VARCHAR(50)     NOT NULL,
                            role            VARCHAR(50)     NOT NULL,
                            abstract_id     INT(11)         NOT NULL,
                            submission_date DATETIME      NOT NULL,
                            is_registered   TINYINT(1)      NOT NULL,

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