class PresenterService extends BaseApiService {

    static serviceFactory($injector) {
        PresenterService.instance = new PresenterService($injector);
        return PresenterService.instance;
    }

    constructor($injector) {
        super($injector, 'presenters', 'presenter');
    }

    delete(object) {
        super.update(object);
    }

}

PresenterService.$inject = ['$injector'];
app.factory('presenterService', PresenterService.serviceFactory);