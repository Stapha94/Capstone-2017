class BaseSiteTableModelController {

    constructor(service, models) {
        this.service = service;
        this.models = models;
        this.model = {active: '1'};
        this.modal = false;
        this.canEdit = false;
    }

    add() {
        this.service.create(this.model)
            .then((model) => {
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                this.models.push(model);
                this.model = {active: '1'};
            });
    }

    edit() {
        this.service.update(this.model)
            .then((model) => {
                _.forEach(this.models, (item) => {
                    if(angular.equals(item, this.original)) {
                        // This iterates through each key for the model and applies the new update
                        // This is crucial to making the UI updates
                        _.forEach(item, (value, key) => {
                             if(this.model[key]) {
                                 item[key] = this.model[key];
                             }
                        })
                    }
                });
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                this.model = {active: '1'};
            });

    }

    cancel() {
        this.reset();
        this.setModal();
        this.canEdit = false;
        this.model = {active: '1'};
    }

    activate(model) {
        model.active = '1';
        this.service.update(model);
    }

    deactivate(model) {
        model.active = '0';
        this.service.delete(model);
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

    setEdit(model) {
        this.canEdit = true;
        this.original = model;
        this.model = angular.copy(this.original);
    }

    reset() {
        return false; // This is to keep other pages without selects from breaking
    }

}