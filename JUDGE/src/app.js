// global app declaration
app = angular.module('app', ['ui.router', 'ui.bootstrap'])
    .constant('CONFIG', {
        // This is the url for the database. Change it between local and host when needed.
        DBURL: 'http://localhost:8080/Capstone-2017/index.php/'
      //DBURL: 'https://qss-judge.heroku.com/index.php/'
    })