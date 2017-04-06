class HomeController {

    static resolve() {
        return {
                summit: ['summitService', (summitService) => {
                    return summitService.get({active: 1})
                        .then((data) => {
                            return data[0];
                        })
                }]
            }
    }

    constructor($scope , $state, authService, localStorageService, summit) {
        $state.current.hideNav = $state.current.hideNav ? $state.current.hideNav : false; // This value can be used to make the navbar go away if we ever need it to.
        $scope.$state = $state;
        this.authService = authService;
        this.user = authService.currentUser;
        localStorageService.set('summit', summit); // Sets the current active summit for the site.
    }
}

HomeController.$inject = ['$scope', '$state', 'authService', 'localStorageService', 'summit'];
app.controller('homeController', HomeController);