var Reflux = require('reflux');
var HomeDataAction = require('actions/ScheduleAction.js');

module.exports = Reflux.createStore({
    listenables: HomeDataAction,
    homeDatas: [],
    init: function(){
        HomeDataAction.loadData();
    },
    onLoadData: function(){
        HomeDataAction.loadSuccess([]);
    },
    onLoadSuccess: function(homeDatas){
        this.homeDatas = homeDatas;
        this.trigger();
    },
    onLoadFail: function(){},
    getHomeDatas: function() {
        return this.homeDatas;
    }
});
