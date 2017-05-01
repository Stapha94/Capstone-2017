class SummitsController extends BaseTableModelController {

    static resolve() {
        return {
                summits: ['summitService', (summitService) => {
                    return summitService.get()
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor($scope, $filter, summitService, summits, notificationService, authService, localStorageService) {
        super(summitService, summits);
        this.notificationService = notificationService;
        this.adminId = authService.currentUser.id;
        this.localStorageService = localStorageService;
        this.$filter = $filter;
        this.adminScope = $scope.$parent.$parent; // This is awful, but you gotta do what you gotta do. This should be changed when it can.
    }

    add() {
        if(this.valid()) {
            if(this.model.pin !== this.confirmPin) {
                this.notificationService.error('Pins do not match!');
            } else {
                // The db saves in UTC time, so we need to convert before saving
                this.model.summitStart = this.$filter('date')(this.parseStartDate(this.summitDate), 'yyyy-MM-dd HH:mm:ss', '+0000');
                this.model.summitEnd = this.$filter('date')(this.parseEndDate(this.summitDate), 'yyyy-MM-dd HH:mm:ss', '+0000');
                this.model.registrationDeadline = this.$filter('date')(this.parseRegistrationDeadline(), 'yyyy-MM-dd HH:mm:ss', '+0000');
                this.model.judgeLoginDisabled = 1;
                this.model.createdByAdminId = this.adminId;
                this.service.create(this.model)
                    .then((model) => {
                        if(isTrue(model.active)) {
                            this.localStorageService.set('summit', model);    
                            this.adminScope.summitId = model.summitId;
                            _.forEach(this.models, (summit) => {
                                summit.active = 0;
                            });
                        }
                        // Thanks timezones, thanks IE
                        model.summitStart = new Date(model.summitStart.replace(/ /, 'T') + 'Z');
                        model.summitEnd = new Date(model.summitEnd.replace(/ /, 'T') + 'Z');
                        model.registrationDeadline = new Date(model.registrationDeadline.replace(/ /, 'T') + 'Z');
                        angular.element('.modal').modal('close');
                        this.setModal();
                        this.models.push(model);
                        this.model = {active: 1};
                        this.confirmPin = null;
                    });
            }
        } else {
            this.notificationService.error('Please fill out all forms!');
        }
    }

    cancel() {
        this.summitDate = null;
        this.startTime = null;
        this.endTime = null;
        this.registrationDeadline = null;
        this.deadlineTime = null;
        this.confirmPin = null;
        super.cancel();
    }

    parseStartDate(summitDate) {
        var startHours = this.startTime.getHours();
        var startMinutes = this.startTime.getMinutes();
        return new Date(summitDate.getFullYear(), summitDate.getMonth(), summitDate.getDate(), startHours, startMinutes, 0);
    }

    parseEndDate(summitDate) {
        var endHours = this.endTime.getHours();
        var endMinutes = this.endTime.getMinutes();
        return new Date(summitDate.getFullYear(), summitDate.getMonth(), summitDate.getDate(), endHours, endMinutes, 0);
    }

    parseRegistrationDeadline() {
        var date = this.registrationDeadline;
        var hours = this.deadlineTime.getHours();
        var minutes = this.deadlineTime.getMinutes();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0);
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

    activate(summit) {
        this.localStorageService.set('summit', summit);
        this.adminScope.summitId = summit.summitId;
        _.forEach(this.models, (summit) => {
            summit.active = 0;
        });
        super.activate(summit);
    }

    deactivate(summit) {
        this.localStorageService.set('summit', undefined);
        this.adminScope.summitId = undefined;
        super.deactivate(summit);
    }

}

SummitsController.$inject = ['$scope', '$filter', 'summitService', 'summits', 'notificationService', 'authService', 'localStorageService'];
app.controller('summitsController', SummitsController);