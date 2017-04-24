class LocalStorageService {
    constructor($log, $window) {
        this.$log = $log;
        this.localStorage = $window.localStorage;
    }

    get(key) {
        this.$log.debug('Getting: ' + key);
        var json = this.localStorage.getItem(key);
        // If the item is undefined, return undefined
        return json === 'undefined' ? undefined : angular.fromJson(json);
    }

    set(key, item) {
        this.$log.debug('Setting: ' + key + ' to ' + angular.toJson(item));
        var json = angular.toJson(item);
        this.localStorage.setItem(key, json);
    }

    remove(key) {
        this.$log.debug('Deleting: ' + key);
        this.localStorage.removeItem(key);
    }

    clear() {
        this.$log.debug('Clearing all keys!');
        this.localStorage.clear();
    }
}

LocalStorageService.$inject = ['$log', '$window'];
app.service('localStorageService', LocalStorageService);