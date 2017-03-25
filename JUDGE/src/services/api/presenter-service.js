class PresenterService extends BaseApiService {
    constructor($injector) {
        super($injector, 'presenters', 'presenter');
    }

    delete(object) {
        super.update(object);
    }

}

PresenterService.$inject = ['$injector'];
app.factory('presenterService', PresenterService);