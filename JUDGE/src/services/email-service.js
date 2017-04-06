class EmailService {

    constructor($http, $q, CONFIG, notificationService) {
        this.$http;
        this.$q;
        this.notificationService;
        this.baseUrl = CONFIG.DBURL;
    }

    // Any email we need to do can go here. Name the function after the purpose of the email
    test() {
        var deferred = $q.defer();

        this.$http.get(this.baseUrl + '/test')
            .then((data) => {
                this.notificationService.success('Message was sent!');
            })
            .catch((error) => {
                this.notificationService.error('Message could not be sent!');
            })
    }

}

EmailService.$inject = ['$http', '$q', 'CONFIG', 'notificationService'];
app.service('email', EmailService);