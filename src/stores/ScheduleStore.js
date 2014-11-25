var Reflux = require('reflux');
var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = Reflux.createStore({
    listenables: ScheduleAction,
    schedule: [],
    init: function(){
        ScheduleAction.loadData();
    },
    onLoadData: function(){
        ScheduleAction.loadSuccess([
            {
                creneau: '1510',
                users: [
                    {id:1, username:'Guillaume', gravatar: 'http://www.gravatar.com/avatar/22c64f33e43b433721446315a683ee5a?s=35&d=mm&r=x'}
                ]
            }
        ]);
    },
    onLoadSuccess: function(schedule){
        this.schedule = schedule;
        this.trigger();
    },
    onLoadFail: function(){},
    getSchedule: function() {
        return this.schedule;
    }
});
