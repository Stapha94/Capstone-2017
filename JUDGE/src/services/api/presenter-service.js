class PresenterService extends BaseApiService {
    constructor($injector) {
        super($injector, 'presenters', 'presenter');
    }

}

PresenterService.$inject = ['$injector'];
app.factory('presenterService', PresenterService);