var UsersGraphAction = require('actions/UsersGraphAction.js');

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
        var data = {'victoires':[], 'defaites':[], 'ratio':[]};

        response.forEach(function(row){
            var tmp = row.date.split('-');
            var date = Date.UTC(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));

            data.victoires.push([date, parseInt(row.won)]);
            data.defaites.push([date, parseInt(row.total - row.won)]);
            data.ratio.push([date, this.getRatio(row)]);
        }.bind(this));

        return data;
    },
    getRatio: function (row) {
        var ratio = row.won / row.total;

        var score = Math.round(ratio*100)/100;

        return isNaN(score) ? 0 : score;
    },
    getUsersGraph: function(user_id) {
        return this.usersGraph;
    },
    usersGraph: []
});
