var Reflux = require('reflux');
var HomeDataActions = require('actions/HomeDataAction.js');

module.exports = Reflux.createStore({
    listenables: HomeDataActions,
    init: function(){
        HomeDataActions.loadData();
    },
    onLoadData: function(){
        /*$.ajax({
            url: 'http://127.0.1.1/Babylov2REST/api/HomeData',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {*/
            HomeDataActions.loadSuccess({
                    victory: {
                        name:'Guillaume',
                        value: 8
                    },
                    defeat: {
                        name:'Cedric',
                        value: 8
                    },
                    games: {
                        name:'8',
                        value: 8
                    },
                    last: {
                        name:'Joon',
                        value: 0.1
                    },
                    worst: {
                        name:'Stephane',
                        value: 9.46
                    },
                });
        //});
    },
    onLoadSuccess: function(HomeDatas){
        this.HomeDatas = HomeDatas;
        this.trigger();
    },
    onLoadFail: function(){
        // bzzzzapp!
    },
    getHomeDatas: function() {
        return this.HomeDatas;
    },
    HomeDatas: []
});
