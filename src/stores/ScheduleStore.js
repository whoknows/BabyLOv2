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
                creneau: '15h10',
                users: [
                    {id:2, username:'Jordan', gravatar: 'http://www.gravatar.com/avatar/f2fade485ed9688ed1e7756dc2980e79?s=40&d=mm&r=x'}
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
