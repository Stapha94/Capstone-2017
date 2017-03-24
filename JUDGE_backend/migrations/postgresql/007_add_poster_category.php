<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_poster_category extends CI_Migration {

        public function up()
        {
                $sql = "CREATE TABLE poster_category (
                            poster_category_id  SERIAL,
                            title           VARCHAR(20)    NOT NULL,
                			active      SMALLINT     NOT NULL DEFAULT 1,

                            PRIMARY KEY (poster_category_id)
                        );";

                $this->db->query($sql);
        }

        public function down()
        {
                $sql = "DROP TABLE poster_category;";
                $this->db->query($sql);
        }
}
?>