class NotificationService {

    constructor($log) {
        this.$log = $log;
    }

    success(message) {
        this.$log.info(message);
        Materialize.toast(message, 4000, 'success');
    }

    error(message) {
        this.$log.error(message);
        Materialize.toast(message, 4000, 'error');
    }

}

NotificationService.$inject = ['$log'];
app.service('notificationService', NotificationService);