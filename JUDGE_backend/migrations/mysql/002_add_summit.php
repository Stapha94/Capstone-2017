<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_summit extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE summit (
                            summit_id       INT(11)     NOT NULL    AUTO_INCREMENT,
                            summit_start    DATETIME  NOT NULL,
                            summit_end      DATETIME  NOT NULL,
                            registration_deadline       DATETIME,
                            created_by_admin_id INT(11) NOT NULL,
                            pin       INT(4) NOT NULL,
                            
                            FOREIGN KEY (created_by_admin_id) REFERENCES admin(admin_id),
                            
                            UNIQUE KEY (summit_start, summit_end),

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