<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_award extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE award (
                            award_id  SERIAL,
                            title           VARCHAR(50)    NOT NULL,
                			active      SMALLINT     NOT NULL DEFAULT 1,

                            PRIMARY KEY (award_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE award;";
                $this->db->query($sql);
        }
}
?>