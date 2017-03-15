<?php

class Migrate extends CI_Controller
{

        public function up()
        {
                $this->config->set_item('migration_version', 26);
                $this->load->library('migration');

                if ($this->migration->current() === FALSE)
                {
                        show_error($this->migration->error_string());
                }
        }

        public function down($version = 0)
        {
            $this->config->set_item('migration_version', $version);
            $this->load->library('migration');

            if ($this->migration->version($version) === FALSE)
            {
                show_error($this->migration->error_string());
            }
        }

        public function recycle($version = 0)
        {
            $this->down($version);
            $this->up();
        }

}
?>