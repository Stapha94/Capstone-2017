class BaseTableModelController {

    constructor(service, models) {
        this.service = service;
        this.models = models;
        this.model = {active: 1};
        this.modal = false;
    }

    add() {
        this.service.create(this.model)
            .then((model) => {
                angular.element('.modal').modal('close');
                this.setModal();
                this.models.push(model);
                this.model = {active: 1};
            });
    }

    cancel() {
        this.model = {active: 1};
        this.setModal();
    }

    activate(model) {
        model.active = 1;
        this.service.update(model);
    }

    deactivate(model) {
        model.active = 0;
        this.service.delete(model);
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

}