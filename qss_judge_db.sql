INSERT INTO summit(summit_start, summit_end, registration_deadline, pin)
VALUES (NOW(), '2018-12-31 23:59:59', '2018-12-31 23:59:59', SHA2(1234, 256));

INSERT INTO admin (email, password)
VALUES ('admin@test.com', SHA2('password', 256));

INSERT INTO abstract (title, objective, methods, results, conclusion)
VALUES ('Test title', 'Test objective', 'Test methods', 'Test results', 'Test conclusion');

INSERT INTO institution (title)
VALUES ('MUSOM'),
        ('CHH'),
        ('MUSOP'),
        ('MU Nursing');

INSERT INTO role (title)
VALUES ('Faculty Member'),
        ('CHH Employee'),
        ('Resident or Fellow'),
        ('Medical Student'),
        ('Pharmacy');

INSERT INTO category (title)
VALUES ('Marshall'),
        ('Cabell');

INSERT INTO presenter (first_name, last_name, email, institution_id, role_id,  abstract_id, is_registered, submission_date)
VALUES ('Mark', 'Adkins', 'test@test.com', 1, 1, 1, 1, NOW());

INSERT INTO poster (category, title, award, presenter_id)
VALUES ('MUSOM', 'Test title', NULL, 1);

INSERT INTO judge (summit_id, first_name, last_name, category, is_active)
VALUES (1, 'Paul', 'Fox', 'MUSOM', 1);

INSERT INTO judge_poster (judge_id, poster_id)
VALUES (1, 1);

INSERT INTO form (poster_id, judge_id, total)
VALUES (1, 1, 50);

INSERT INTO question (description)
VALUES ('Display is free of spelling and/or grammatical errors'),
        ('Titles and heading fonts are clear and effective'),
        ('The content includes a problem statement- including topic relevance'),
        ('The content contains the team members/unit'),
        ('The content contains a discussion of impacts/benefits of effort'),
        ('The content includes a description of the data collection plan'),
        ('Contains a graphical summary of data- if available'),
        ('Contains further improvement(s) implemented and effectiveness'),
        ('Contains next step for further improvements'),
        ('Innovation of improvement effort');        


