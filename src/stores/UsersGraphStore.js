var UsersGraphAction = require('actions/UsersGraphAction.js');
var UserStore = require('stores/UserStore.js');

module.exports = Reflux.createStore({
    listenables: [UsersGraphAction],
    onLoadData: function(user_id){
        $.ajax({
            url: '/Babylov2REST/usergraph/' + user_id,
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.usersGraph = this.formatData(response);
            this.trigger();
        }.bind(this));
    },
    formatData: function(response){
        var data = {'victoires':[], 'defaites':[], 'ratio':[], 'dates':[]};
        var sumTotal = 0;

        response.userdata.forEach(function(row){
            var tmp = row.date.split('-');

            sumTotal += response.total[tmp[0] + '.' + tmp[1]];

            data.dates.push(row.date);
            data.victoires.push(parseInt(row.won));
            data.defaites.push(parseInt(row.total - row.won));
            data.ratio.push(this.getScore(row, sumTotal));
        }.bind(this));

        return data;
    },
    getScore: function (row, total) {
        var ratio = row.won / row.total;

        ratio = (ratio * UserStore.poidsRatio) + ((row.total / total) * (1 - UserStore.poidsRatio));

        var score = Math.round(ratio*100)/100;

        return isNaN(score) ? 0 : score;
    },
    getUsersGraph: function(user_id) {
        return this.usersGraph;
    },
    usersGraph: []
});
