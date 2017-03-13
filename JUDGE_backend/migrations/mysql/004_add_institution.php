CREATE TABLE institution (
    institution_id  INT(11) NOT NULL    AUTO_INCREMENT,
    title           VARCHAR(255)    NOT NULL,
    active          TINYINT(1)      NOT NULL DEFAULT 1;

    PRIMARY KEY (institution_id)
);
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_institution extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE institution (
                            institution_id  INT(11) NOT NULL    AUTO_INCREMENT,
                            title           VARCHAR(50)    NOT NULL,
                            active          TINYINT(1)      NOT NULL DEFAULT 1,

                            PRIMARY KEY (institution_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE institution;";
                $this->db->query($sql);
        }
}
?>