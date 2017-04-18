class LocalStorageService {
    constructor($log, $window) {
        this.$log = $log;
        this.localStorage = $window.localStorage;
    }

    get(key) {
        var json = this.localStorage.getItem(key);
        return angular.fromJson(json);
    }

    set(key, item) {
        var json = angular.toJson(item);
        this.localStorage.setItem(key, json);
    }

    remove(key) {
        this.localStorage.removeItem(key);
    }

    clear() {
        this.localStorage.clear();
    }
}

LocalStorageService.$inject = ['$log', '$window'];
app.service('localStorageService', LocalStorageService);