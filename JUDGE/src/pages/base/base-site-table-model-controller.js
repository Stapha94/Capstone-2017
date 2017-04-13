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
                this.setModal();
                this.models.push(model);
                this.model = {active: '1'};
            });
    }

    edit() {
        this.service.update(this.model)
            .then((model) => {
                angular.element('.modal').modal('close');
                this.setModal();
                this.model = {active: '1'};
            });

    }

    cancel() {
        this.model = {active: '1'};
        this.setModal();
        this.canEdit = false;
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

}