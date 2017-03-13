<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Insert_questions extends CI_Migration {

    public function up()
    {
        $sql = "INSERT INTO question (description, question_section_id)
                VALUES ('Display is free of spelling and/or grammatical errors', 1),
                        ('Titles and heading fonts are clear and effective', 1),
                        ('The content includes a problem statement- including topic relevance', 2),
                        ('The content contains the team members/unit', 2),
                        ('The content contains a discussion of impacts/benefits of effort', 2),
                        ('The content includes a description of the data collection plan', 2),
                        ('Contains a graphical summary of data- if available', 2),
                        ('Contains further improvement(s) implemented and effectiveness', 2),
                        ('Contains next step for further improvements', 2),
                        ('Innovation of improvement effort', 2);";

        $this->db->query($sql);
    }

    public function down()
    {
        $sql = "DELETE FROM question
                WHERE description = 'Display is free of spelling and/or grammatical errors',
                OR description = 'Titles and heading fonts are clear and effective',
                OR description = 'The content includes a problem statement- including topic relevance',
                OR description = 'The content contains the team members/unit',
                OR description = 'The content contains a discussion of impacts/benefits of effort',
                OR description = 'The content includes a description of the data collection plan',
                OR description = 'Contains a graphical summary of data- if available',
                OR description = 'Contains further improvement(s) implemented and effectiveness',
                OR description = 'Contains next step for further improvements',
                OR description = 'Innovation of improvement effort';";

        $this->db->query($sql);
    }
}
?>