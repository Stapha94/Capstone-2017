class SummitService extends BaseApiService {
    constructor($injector) {
        super($injector, 'summits', 'summit');
    }

}

SummitService.$inject = ['$injector'];
app.factory('summitService', SummitService);