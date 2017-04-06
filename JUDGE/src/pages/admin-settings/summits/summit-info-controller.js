class SummitInfoController {

    static resolve() {
        return {
                summit: ['$stateParams', ($stateParams) => {
                    return $stateParams.summitId;
                }]
            }
    }

    constructor($scope, summitService, summit, notificationService) {
        this.$scope = $scope;
        this.summitService = summitService;
        this.notificationService = notificationService;
        this.original = summit;
        this.summit = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.canEdit = false;
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        this.summitService.update(this.summit)
            .then((data) => {
                this.canEdit = false;
                this.original = angular.copy(this.summit);
            })
            .catch((error) => {
                this.canEdit = false;
                this.summit = angular.copy(this.original);
            })
    }

    cancel() {
        this.canEdit = false;
        this.summit = angular.copy(this.original);
    }

    updatePin() {
        if(this.newPin !== this.confirmPin) {
            this.notificationService.error('Pins don\'t match!');
        } else if(this.newPin == null) {
            this.notificationService.error('Please set a new pin!');
        } else if(this.newPin.length < 4) {
            this.notificationService.error('Pin must be 4 digits!');
        } else {
            var password = { summitId: this.original.summitId, newPin: this.newPin, oldPin: this.oldPin };
            this.summitService.updatePassword(pin)
                .then((data) => {
                    this.resetPinFields();
                })
                .catch((error) => {
                    this.resetPinFields();
                });
        }
    }

    resetPinFields() {
        this.newPin = null;
        this.oldPin = null;
        this.confirmPin = null;
    }

    cancelPin() {
        this.canEdit = false;
        this.oldPin = null;
        this.newPin = null;
        this.confirmPin = null;
    }

}

SummitInfoController.$inject = ['$scope', 'summitService', 'summit', 'notificationService'];
app.controller('summitInfoController', SummitInfoController);