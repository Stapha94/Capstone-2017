function JudgePosterFilter() {
    return function(posters, judgePosters) {
        if(!posters || !judgePosters) {
            return posters;
        }

        var posterIds = [];
        var judgePosterIds = [];

        _.forEach(posters, (poster) => {
            posterIds.push(poster.posterId);
        });

        _.forEach(judgePosters, (judgePoster) => {
            judgePosterIds.push(judgePoster.posterId);
        });

        return _.difference(posterIds, judgePosterIds);        
    }
}

app.filter('assigned', JudgePosterFilter);