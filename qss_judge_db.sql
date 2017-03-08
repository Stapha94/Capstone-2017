DROP DATABASE IF EXISTS qss_judge_db;

CREATE DATABASE qss_judge_db;

USE qss_judge_db;

CREATE TABLE admin (
    admin_id    INT(11)  NOT NULL    AUTO_INCREMENT,
    email       VARCHAR(50) NOT NULL,
    password    VARCHAR(255)    NOT NULL,

    PRIMARY KEY (admin_id)
);

CREATE TABLE summit (
    summit_id       INT(11)     NOT NULL    AUTO_INCREMENT,
    summit_start    DATETIME()  NOT NULL,
    summit_end      DATETIME()  NOT NULL,
    registration_deadline       DATETIME(),
    pin       INT(4) NOT NULL,

    PRIMARY KEY (summit_id)
);

CREATE TABLE abstract (
    abstract_id     INT(11)     NOT NULL        AUTO_INCREMENT,
    title           VARCHAR(255)    NOT NULL,
    objective       VARCHAR(255)    NOT NULL,
    methods         VARCHAR(255)    NOT NULL,
    results         VARCHAR(255)    NOT NULL,
    conclusion      VARCHAR(255)    NOT NULL,

    PRIMARY KEY (abstract_id)
);

CREATE TABLE presenter (
    presenter_id    INT(11) NOT NULL    AUTO_INCREMENT,
    first_name      VARCHAR(255)    NOT NULL,
    last_name       VARCHAR(255)    NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    institution     VARCHAR(50)     NOT NULL,
    role            VARCHAR(50)     NOT NULL,
    abstract_id     INT(11)         NOT NULL,
    submission_date DATETIME()      NOT NULL,
    is_registered   TINYINT(1)      NOT NULL,

    FOREIGN KEY (abstract_id) REFERENCES abstract(abstract_id),

    PRIMARY KEY (presenter_id)
);

CREATE TABLE key_participant (
    key_participant_id      INT(11)     NOT NULL        AUTO_INCREMENT,
    presenter_id            INT(11)     NOT NULL,
    first_name              VARCHAR(255)    NOT NULL,
    last_name               VARCHAR(255)    NOT NULL,
    department              VARCHAR(255)    NOT NULL,

    FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id) ON DELETE CASCADE,

    PRIMARY KEY (key_participant_id)
);

CREATE TABLE judge (
    judge_id    INT(11)     NOT NULL    AUTO_INCREMENT,
    first_name  VARCHAR(255)    NOT NULL,
    last_name   VARCHAR(255)    NOT NULL,
    category    VARCHAR(50)     NOT NULL,
    is_active   TINYINT(1)      NOT NULL,

    PRIMARY KEY (judge_id)
);

CREATE TABLE poster (
    poster_id       INT(11)     NOT NULL        AUTO_INCREMENT,
    category        VARCHAR(20) NOT NULL,
    title           VARCHAR(100) NOT NULL,
    award           VARCHAR(50),
    presenter_id    INT(11)     NOT NULL,
    summit_id       INT(11)     NOT NULL,

    FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id),

    PRIMARY KEY (poster_id)
);

CREATE TABLE judge_poster (
    poster_id       INT(11)     NOT NULL,
    judge_id        INT(11)     NOT NULL,

    FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

    FOREIGN KEY (judge_id) REFERENCES judge(judge_id),

    PRIMARY KEY (poster_id, judge_id)
);

CREATE TABLE form (
    form_id     INT(11)     NOT NULL    AUTO_INCREMENT,
    poster_id   INT(11)     NOT NULL,
    judge_id    INT(11)     NOT NULL,
    total       INT(11),

    FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

    FOREIGN KEY (judge_id) REFERENCES judge(judge_id),

    PRIMARY KEY (form_id)
);

CREATE TABLE question (
    question_id     INT(11)     NOT NULL        AUTO_INCREMENT,
    description     VARCHAR(255)    NOT NULL,

    PRIMARY KEY (question_id)
);

-- Many-to-many tables
CREATE TABLE form_question (
    form_id     INT(11)     NOT NULL,
    question_id INT(11)     NOT NULL,
    score       INT(1)      NOT NULL,

    FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE,

    FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,

    PRIMARY KEY (form_id, question_id)
);

-- Reporting tables
CREATE TABLE report (
    report_id       INT(11)     NOT NULL        AUTO_INCREMENT,
    summit_id       INT(11)     NOT NULL,
    presenter_id    INT(11)     NOT NULL,
    poster_id       INT(11)     NOT NULL,
    score           INT(3)      NOT NULL,

    FOREIGN KEY (summit_id) REFERENCES summit(summit_id),

    FOREIGN KEY (presenter_id) REFERENCES presenter(presenter_id),

    FOREIGN KEY (poster_id) REFERENCES poster(poster_id),

    PRIMARY KEY (report_id)
);

INSERT INTO admin (email, password)
VALUES ('admin@test.com', SHA2('password', 256));

INSERT INTO abstract (title, objective, methods, results, conclusion)
VALUES ('Test title', 'Test objective', 'Test methods', 'Test results', 'Test conclusion');

INSERT INTO presenter (first_name, last_name, email, institution, role,  abstract_id, is_registered)
VALUES ('Mark', 'Adkins', 'test@test.com', 'MUSOM', 'Medical Student', 1, 1, NOW());

INSERT INTO poster (category, title, award, presenter_id)
VALUES ('MUSOM', 'Test title', NULL, 1);

INSERT INTO judge (first_name, last_name, category, is_active)
VALUES ('Paul', 'Fox', 'MUSOM', 1);

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


