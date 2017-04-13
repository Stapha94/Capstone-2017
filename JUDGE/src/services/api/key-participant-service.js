class KeyParticipantService extends BaseApiService {
    constructor($injector) {
        super($injector, 'key_participants', 'key participant');
    }

    delete(keyParticipantId) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject({keyParticipantId: keyParticipantId});

        var url = this.baseUrl + this.serviceUrl + '/delete';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully deleted key participant!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to delete key participant!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

}

KeyParticipantService.$inject = ['$injector'];
app.factory('keyParticipantService', KeyParticipantService);