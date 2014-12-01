var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = Reflux.createStore({
    listenables: ScheduleAction,
    schedule: [],
    init: function(){
        ScheduleAction.loadData();
    },
    onUnparticipate: function(schedule, user_id) {
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/slot/'+schedule+'/'+user_id,
            type: 'DELETE',
            dataType: 'json'
        }).then(function(response){
            //console.log(response);
        });

        this.schedule.map(function(s){
            if(s.creneau == schedule){
                // TODO : remove user
                //s.users.push(user_id);
            }
        });

        ScheduleAction.loadSuccess(this.schedule);
    },
    onParticipate: function(schedule, user_id) {
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/slot/'+schedule+'/'+user_id,
            type: 'PUT',
            dataType: 'json'
        }).then(function(response){
            //console.log(response);
        });

        this.schedule.map(function(s){
            if(s.creneau == schedule){
                s.users.push(user_id);
            }
        });

        ScheduleAction.loadSuccess(this.schedule);
    },
    onLoadData: function(){
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/slot',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            ScheduleAction.loadSuccess(response);
        });
    },
    onLoadSuccess: function(schedule){
        this.schedule = schedule;
        this.trigger();
    },
    getSchedule: function() {
        return this.schedule;
    }
});
