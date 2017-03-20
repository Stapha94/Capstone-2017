class AdminService extends BaseApiService {
    constructor($injector) {
        super($injector, 'admins', 'admin');
    }

}

AdminService.$inject = ['$injector'];
app.factory('adminService', AdminService);