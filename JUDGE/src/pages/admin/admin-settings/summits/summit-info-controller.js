class SummitInfoController {

    static resolve() {
        return {
                summit: ['summitService', '$stateParams', (summitService, $stateParams) => {
                    return summitService.get({summitId: $stateParams.summitId})
                        .then((data) => {
                            return data[0];
                        });
                }]
            }
    }

    constructor($scope, $filter, summitService, summit, localStorageService, notificationService) {
        this.$scope = $scope;
        this.summitService = summitService;
        this.localStorageService = localStorageService;
        this.notificationService = notificationService;
        this.original = summit;
        this.$filter = $filter;
        this.summit = angular.copy(this.original); // for setting things back to normal if they hit cancel
        this.summitDate = this.$filter('date')(this.summit.summitStart, 'd MMM, y');
        this.startTime = this.summit.summitStart;
        this.endTime = this.summit.summitEnd;
        this.registrationDeadline = this.$filter('date')(this.summit.registrationDeadline, 'd MMM, y');
        this.deadlineTime = this.summit.registrationDeadline;
        this.canEdit = false;
    }

    edit() {
        this.canEdit = true;
    }

    save() {
        if(this.valid()) {
            if(!(this.summitDate instanceof Date)) {
                this.summitDate = new Date(this.summitDate);
            }
            if(!(this.registrationDeadline instanceof Date)) {
                this.registrationDeadline = new Date(this.registrationDeadline);
            }
            this.summit.summitStart = this.$filter('date')(new Date(this.summitDate.getFullYear(), this.summitDate.getMonth(), this.summitDate.getDate(), this.startTime.getHours(), this.startTime.getMinutes(), 0), 'yyyy-MM-dd HH:mm:ss');
            this.summit.summitEnd = this.$filter('date')(new Date(this.summitDate.getFullYear(), this.summitDate.getMonth(), this.summitDate.getDate(), this.endTime.getHours(), this.endTime.getMinutes(), 0), 'yyyy-MM-dd HH:mm:ss');
            this.summit.registrationDeadline = this.$filter('date')(new Date(this.registrationDeadline.getFullYear(), this.registrationDeadline.getMonth(), this.registrationDeadline.getDate(), this.deadlineTime.getHours(), this.deadlineTime.getMinutes(), 0), 'yyyy-MM-dd HH:mm:ss');
            this.summitService.update(this.summit)
                .then(() => {
                    if(isTrue(this.summit.active)) {
                        this.localStorageService.set('summit', this.summit);
                    }
                    this.canEdit = false;
                    this.original = angular.copy(this.summit);
                    if(!(this.summit.summitStart instanceof Date)) {
                        this.summit.summitStart = new Date(this.summit.summitStart);
                    }
                    if(!(this.summit.summitEnd instanceof Date)) {
                        this.summit.summitEnd = new Date(this.summit.summitEnd);
                    }
                    if(!(this.summit.registrationDeadline instanceof Date)) {
                        this.summit.registrationDeadline = new Date(this.summit.registrationDeadline);
                    }
                    this.summitDate = this.$filter('date')(this.summit.summitStart, 'd MMM, y');
                    this.startTime = this.summit.summitStart;
                    this.endTime = this.summit.summitEnd;
                    this.registrationDeadline = this.$filter('date')(this.summit.registrationDeadline, 'd MMM, y');
                    this.deadlineTime = this.summit.registrationDeadline;
                })
                .catch((error) => {
                    this.canEdit = false;
                    this.summit = angular.copy(this.original);
                    this.summitDate = this.$filter('date')(this.summit.summitStart, 'd MMM, y');
                    this.startTime = this.summit.summitStart;
                    this.endTime = this.summit.summitEnd;
                    this.registrationDeadline = this.$filter('date')(this.summit.registrationDeadline, 'd MMM, y');
                    this.deadlineTime = this.summit.registrationDeadline;
                })
        } else {
            this.notificationService.error('Please fill out all the forms!');
        }
    }

    cancel() {
        this.canEdit = false;
        if(!(this.summit.summitStart instanceof Date)) {
            this.summit.summitStart = new Date(this.summit.summitStart);
        }
        if(!(this.summit.summitEnd instanceof Date)) {
            this.summit.summitEnd = new Date(this.summit.summitEnd);
        }
        if(!(this.summit.registrationDeadline instanceof Date)) {
            this.summit.registrationDeadline = new Date(this.summit.registrationDeadline);
        }
        this.summit = angular.copy(this.original);
        this.summitDate = this.$filter('date')(this.summit.summitStart, 'd MMM, y');
        this.startTime = this.summit.summitStart;
        this.endTime = this.summit.summitEnd;
        this.registrationDeadline = this.$filter('date')(this.summit.registrationDeadline, 'd MMM, y');
        this.deadlineTime = this.summit.registrationDeadline;
    }

    valid() {
        var valid = true;
        if(this.summitDate === null || this.summitDate === undefined) {
            valid = false;
        } else if(this.startTime === null || this.startTime === undefined) {
            valid = false;
        } else if (this.endTime === null || this.endTime === undefined) {
            valid = false;
        } else if(this.registrationDeadline === null || this.registrationDeadline === undefined) {
            valid = false;
        } else if(this.deadlineTime === null || this.deadlineTime === undefined) {
            valid = false;
        }
        return valid;
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

SummitInfoController.$inject = ['$scope', '$filter', 'summitService', 'summit', 'localStorageService', 'notificationService'];
app.controller('summitInfoController', SummitInfoController);