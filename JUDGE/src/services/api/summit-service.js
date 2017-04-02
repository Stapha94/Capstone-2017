class SummitService extends BaseApiService {
    constructor($injector) {
        super($injector, 'summits', 'summit');
    }

    get(params) {
        return super.get(params)
            .then((summits) => {
                _.forEach(summits, (summit) => {
                    summit.summitStart = new Date(summit.summitStart);
                    summit.summitEnd = new Date(summit.summitEnd);
                    summit.registrationDeadline = new Date(summit.registrationDeadline);
                })
                return summits;
            })
    }

    delete(object) {
        super.update(object);
    }

}

SummitService.$inject = ['$injector'];
app.factory('summitService', SummitService);