var Reflux = require('reflux');
var HomeDataAction = require('actions/HomeDataAction.js');

module.exports = Reflux.createStore({
    listenables: HomeDataAction,
    homeDatas: [],
    loaded: false,
    init: function(){
        HomeDataAction.loadData();
    },
    onLoadData: function(){
        HomeDataAction.loadSuccess({
            alertBar: {
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
                }
            },
            gameGraph: {
                datas:[12,8,3,4,1],
                labels:['2014-11-19','2014-11-20','2014-11-21','2014-11-22','2014-11-23']
            }
        });
    },
    onLoadSuccess: function(homeDatas){
        this.homeDatas = homeDatas;
        this.loaded = true;
        this.trigger();
    },
    onLoadFail: function(){},
    getHomeDatas: function() {
        return this.homeDatas;
    },
    isLoaded: function(){
        return this.loaded;
    }
});
