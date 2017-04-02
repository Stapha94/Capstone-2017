class AdminService extends BaseApiService {
    constructor($injector) {
        super($injector, 'admins', 'admin');
    }

    delete(object) {
        super.update(object);
    }

}

AdminService.$inject = ['$injector'];
app.factory('adminService', AdminService);