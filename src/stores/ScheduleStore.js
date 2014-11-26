var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = Reflux.createStore({
    listenables: ScheduleAction,
    schedule: [],
    init: function(){
        ScheduleAction.loadData();
    },
    onUnparticipate: function(schedule) {
        ScheduleAction.loadSuccess([
            {
                creneau: '15h10',
                users: [
                    {id:2, username:'Jordan', gravatar: 'http://www.gravatar.com/avatar/f2fade485ed9688ed1e7756dc2980e79?s=40&d=mm&r=x'}
                ]
            }
        ]);
    },
    onParticipate: function(schedule) {
        //console.log(schedule);
        //TODO requete ajax add schedule
        //this.schedule.push()
        ScheduleAction.loadSuccess([
            {
                creneau: '15h10',
                users: [
                    {id:2, username:'Jordan', gravatar: 'http://www.gravatar.com/avatar/f2fade485ed9688ed1e7756dc2980e79?s=40&d=mm&r=x'},
                    {id:1, username:'Guillaume', gravatar: 'http://www.gravatar.com/avatar/22c64f33e43b433721446315a683ee5a?s=35&d=mm&r=x'}
                ]
            }
        ]);
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
    getSchedule: function() {
        return this.schedule;
    }
});
