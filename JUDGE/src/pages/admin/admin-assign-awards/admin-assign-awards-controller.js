class AdminAssignAwardsController {

    static resolve() {
        return {
            summits: ['summitService', (summitService) => {
                return summitService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            posterCategories: ['posterCategoryService', (posterCategoryService) => {
                return posterCategoryService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }],
            posters: ['posterService', (posterService) => {
                return posterService.get()
                    .then((data) => {
                        return data;
                    });
            }],
            awards: ['awardService', (awardService) => {
                return awardService.get({active: 1})
                    .then((data) => {
                        return data;
                    });
            }]
        }
    }

    constructor(posterService, summits, posterCategories, posters, awards) {
        this.posterService = posterService;
        this.summits = summits;
        this.summitId = summits.length > 0 ? summits[0].summitId : undefined;
        this.posterCategories = posterCategories;
        this.posterCategoryId = posterCategories.length > 0 ? posterCategories[0].posterCategoryId : undefined;
        this.posters = posters;
        _.remove(awards, {awardId: '1'});
        this.awards = awards;
        this.originalSelectedPoster = {};
        this.selectedPoster = angular.copy(this.originalSelectedPoster);
    }

    assign() {
        if(!angular.equals(this.selectedPoster, this.originalSelectedPoster)) {
            _.forEach(this.posters, (poster) => {
                // If a poster already has the award
                if(poster.awardId === this.awardId && poster.summitId === this.summitId && poster.posterCategoryId === this.posterCategoryId) {
                    poster.awardId = '1';
                    this.posterService.update(poster);
                }
            });
            this.selectedPoster.awardId = this.awardId;
            this.posterService.update(this.selectedPoster)
                .then(() => {
                    _.forEach(this.posters, (poster) => {
                        if(this.selectedPoster.posterId === poster.posterId) {
                            poster.awardId = this.selectedPoster.awardId;
                        }
                    });
                    this.selectedPoster = angular.copy(this.originalSelectedPoster);
                    angular.element('.modal').modal('close');
                });
        }
    }

    setAward(award) {
        this.awardId = award.awardId;
        _.forEach(this.posters, (poster) => {
            // If a poster already has the award
            if(poster.awardId === this.awardId && poster.summitId === this.summitId && poster.posterCategoryId === this.posterCategoryId) {
                this.selectedPoster = poster;
            }
        });
    }

    setCategory(posterCategory) {
        this.posterCategoryId = posterCategory.posterCategoryId;
    }

    selectPoster(poster, e) {
        if(poster === this.selectedPoster) {
            var element = angular.element(e.target);
            element.removeClass('active');
            this.selectedPoster = angular.copy(this.originalSelectedPoster);
        } else {
            var elements = angular.element(document.querySelectorAll('table.unassigned-posters tbody td.active'));
            _.forEach(elements, (element) => {
                element = angular.element(element);
                element.removeClass('active');
            });
            var element = angular.element(e.target);
            element.addClass('active');
            this.selectedPoster = poster;
        }
    }

}

AdminAssignAwardsController.$inject = ['posterService', 'summits', 'posterCategories', 'posters', 'awards'];
app.controller('adminAssignAwardsController', AdminAssignAwardsController);