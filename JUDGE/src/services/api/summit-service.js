class SummitService extends BaseApiService {
    constructor($injector) {
        super($injector, 'summits', 'summit');
    }

    delete(object) {
        super.update(object);
    }

}

SummitService.$inject = ['$injector'];
app.factory('summitService', SummitService);