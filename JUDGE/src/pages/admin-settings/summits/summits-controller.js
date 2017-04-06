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

    constructor($filter, summitService, summits, notificationService, authService) {
        super(summitService, summits);
        this.notificationService = notificationService;
        this.adminId = authService.currentUser.id;
        this.$filter = $filter;
    }

    add() {
        if(this.valid()) {
            if(this.model.pin !== this.confirmPin) {
                this.notificationService.error('Pins do not match!');
            } else {
                var summitDate = this.parseSummitDate();
                this.model.summitStart = this.$filter('date')(this.parseStartDate(summitDate), 'yyyy-MM-dd HH:mm:ss');
                this.model.summitEnd = this.$filter('date')(this.parseEndDate(summitDate), 'yyyy-MM-dd HH:mm:ss');
                this.model.registrationDeadline = this.$filter('date')(this.parseRegistrationDeadline(), 'yyyy-MM-dd HH:mm:ss');
                this.model.judgeLoginDisabled = 1;
                this.model.createdByAdminId = this.adminId;
                _.forEach(this.models, (model) => {
                    model.active = 0;
                });
                super.add();
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
        super.cancel();
    }

    parseSummitDate() {
        var summitDate = new Date(this.summitDate);
        return {
            summitDate: summitDate,
            year: summitDate.getFullYear(),
            month: summitDate.getMonth()-1,
            date: summitDate.getDate()
        }
    }

    parseStartDate(summitDate) {
        var startHours = this.startTime.getHours();
        var startMinutes = this.startTime.getMinutes();
        return new Date(summitDate.year, summitDate.month, summitDate.date, startHours, startMinutes, 0);
    }

    parseEndDate(summitDate) {
        var endHours = this.endTime.getHours();
        var endMinutes = this.endTime.getMinutes();
        return new Date(summitDate.year, summitDate.month, summitDate.date, endHours, endMinutes, 0);
    }

    parseRegistrationDeadline() {
        var date = new Date(this.registrationDeadline);
        var hours = this.deadlineTime.getHours();
        var minutes = this.deadlineTime.getMinutes();
        return new Date(date.getFullYear(), date.getMonth()-1, date.getDate(), hours, minutes, 0);
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

}

SummitsController.$inject = ['$filter', 'summitService', 'summits', 'notificationService', 'authService'];
app.controller('summitsController', SummitsController);