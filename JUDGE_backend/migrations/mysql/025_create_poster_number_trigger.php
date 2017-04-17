<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_poster_number_trigger extends CI_Migration {

	public function up()
	{
		$sql = "CREATE TRIGGER assign_poster_num BEFORE INSERT ON poster
				FOR EACH ROW SET NEW.poster_number = (SELECT COUNT(*) FROM poster WHERE poster.poster_category_id = NEW.poster_category_id) + 1";

		$this->db->query($sql);
	}

	public function down()
	{
		$sql = "DROP TRIGGER assign_poster_num;";
		$this->db->query($sql);
	}
}
?>