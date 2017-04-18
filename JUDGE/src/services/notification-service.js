class NotificationService {

    constructor($log) {
        this.$log = $log;
    }

    success(message) {
        Materialize.toast(message, 4000, 'success');
    }

    error(message) {
        Materialize.toast(message, 4000, 'error');
    }

}

NotificationService.$inject = ['$log'];
app.service('notificationService', NotificationService);