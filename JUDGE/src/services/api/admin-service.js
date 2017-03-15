class AdminService {
    constructor($log, $http, $q, CONFIG) {
        this.$log = $log;
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = CONFIG.DBURL;
        this.params = { admin: ''};
    }

    // Gets all the judges
    get(adminId) {
        var deferred = this.$q.defer();

        if(adminId) {
            this.params.admin = 'admin/' + adminId;
        }

        var url = this.baseUrl + 'admins/' + this.params.admin;
        this.$http.get(url)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(error) {
                deferred.reject(error);
            })
        return deferred.promise;
    }

}

AdminService.$inject = ['$log', '$http', '$q', 'CONFIG'];
app.factory('adminService', AdminService);