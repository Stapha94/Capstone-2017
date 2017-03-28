class registrationService {
    constructor($log, $http) {
        this.presenterFirstName = "";
        this.presenterLastName = "";
        this.presenterEmail = "";
        this.$http = $http;
        this.$log = $log;

    }

    getPresenter() {
        this.presenter = {
            presenterFirstName: this.presenterFirstName,
            presenterLastName: this.presenterLastName,
        }
        return this.presenter;

    }

    getPoster() {
        this.poster = {

        }
        return this.poster;
    }

    email() {
        this.$http.post(/**URL HERE, (OBJECT HERE)*/)
    }
}

registrationService.$inject = ['$log', '$http'];
app.service('registrationService', registrationService);
