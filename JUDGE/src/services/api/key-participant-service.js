class KeyParticipantService extends BaseApiService {
    constructor($injector) {
        super($injector, 'key_participants', 'key participant');
    }

}

KeyParticipantService.$inject = ['$injector'];
app.factory('keyParticipantService', KeyParticipantService);