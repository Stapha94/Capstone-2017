<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_summit extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE summit (
                            summit_id       SERIAL,
                            summit_start    TIMESTAMP  NOT NULL,
                            summit_end      TIMESTAMP  NOT NULL,
                            registration_deadline       TIMESTAMP,
                            created_by_admin_id INTEGER NOT NULL REFERENCES admin(admin_id),
                            pin       VARCHAR(64) NOT NULL,
			                active      SMALLINT     NOT NULL DEFAULT 1,
                            
                            CONSTRAINT  summit_time UNIQUE(summit_start, summit_end),

                            PRIMARY KEY (summit_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE summit;";
                $this->db->query($sql);
        }
}
?>