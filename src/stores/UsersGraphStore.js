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
            this.usersGraph = response;
            this.trigger();
        }.bind(this));
    },
    getFilteredData: function(period, cumule) {
        if(!period){
            period = "";
        }

        return this.filterData(period, cumule);
    },
    filterData: function(period, cumule){
        var ret = {victoires:[], defaites:[], ratio:[], dates: []};

        this.usersGraph.userdata.forEach(function(datum, i){
            var tmp = datum.date.split('-');
            if(this.getCondition(tmp, period)){

                var lost = (cumule ? this.sumLast(ret.defaites) : 0) + (parseInt(datum.total) - parseInt(datum.won));
                var won = (cumule ? this.sumLast(ret.victoires) : 0) + parseInt(datum.won);

                ret.dates.push(datum.date);
                ret.victoires.push(won);
                ret.defaites.push(lost);
                ret.ratio.push(this.getScore(won, won+lost, this.getTotal(period, tmp)));
            }
        }.bind(this));

        return ret.dates.length === 0 ? false : ret;
    },
    getCondition: function(tmp, period) {
        var date = new Date();
        var date2 = Date.UTC(tmp[0], tmp[1] - 1, tmp[2]);

        if(period == "ThisMonth") {
            return date2 >= Date.UTC(date.getFullYear(), date.getMonth(), 1);
        } else if(period == "LastMonth") {
            return date2 >= Date.UTC(date.getFullYear(), date.getMonth() - 1, 1) && date2 <= Date.UTC(date.getFullYear(), date.getMonth(), 0);
        }

        return true;
    },
    sumLast: function(a){
        if (a.length > 0) {
            return a[a.length - 1];
        }

        return 0;
    },
    getTotal: function(period, tmp){
        if (period !== "") {
            return parseInt(this.usersGraph.total[tmp[0] + '.' + tmp[1]]);
        } else {
            var total = 0;

            for(var i in this.usersGraph.total){
                total += parseInt(this.usersGraph.total[i]);
            }
            return total;
        }
    },
    getScore: function (won, total, global) {
        var ratio = won / total;

        ratio = (ratio * UserStore.poidsRatio) + ((total / global) * (1 - UserStore.poidsRatio));

        var score = Math.round(ratio*100)/100;

        return isNaN(score) ? 0 : score;
    },
    getUsersGraph: function(user_id) {
        return this.usersGraph;
    },
    usersGraph: []
});
