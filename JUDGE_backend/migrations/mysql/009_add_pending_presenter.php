<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_pending_presenter extends CI_Migration {

	public function up()
	{
		$sql = "CREATE TABLE pending_presenter (
                            pending_presenter_id    INT(11) NOT NULL    AUTO_INCREMENT,
                            first_name      VARCHAR(50)    NOT NULL,
                            last_name       VARCHAR(50)    NOT NULL,
                            suffix          VARCHAR(10),
                            email           VARCHAR(255)    NOT NULL,
                            verification_code	VARCHAR(64) NOT NULL,
                            expiration_date		DATETIME	NOT NULL,
                            
                            UNIQUE (email),

                            PRIMARY KEY (pending_presenter_id)
                        ) CHARACTER SET utf8 COLLATE utf8_general_ci;";

		$this->db->query($sql);
	}

	public function down()
	{
		$sql = "DROP TABLE pending_presenter;";
		$this->db->query($sql);
	}
}
?>