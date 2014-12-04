var ScheduleAction = require('actions/ScheduleAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [CurrentUserAction, ScheduleAction],
    schedule: [],
    onUnparticipate: function(schedule, user_id) {
        $.ajax({
            url: '/Babylov2REST/slot/'+schedule+'/'+user_id,
            type: 'DELETE',
            dataType: 'json'
        }).then(function(response){
            //console.log(response);
        });

        this.schedule.map(function(s){
            if(s.creneau == schedule){
                var users = [];
                s.users.forEach(function(v,k){
                    if(v != user_id){
                        users.push(v);
                    }
                });
                s.users = users;
            }
        });

        this.trigger();
    },
    onParticipate: function(schedule, user_id) {
        $.ajax({
            url: '/Babylov2REST/slot/'+schedule+'/'+user_id,
            type: 'POST',
            dataType: 'json'
        }).then(function(response){
            //console.log(response);
        });

        // TODO : verifier que le creneau n'est pas plein coté serveur !!!
        this.schedule.map(function(s){
            if(s.creneau == schedule){
                s.users.push(user_id);
            }
        });

        this.trigger();
    },
    onLoginSuccess: function(){
        $.ajax({
            url: '/Babylov2REST/slot',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.schedule = response;
            this.trigger();
        }.bind(this));
    },
    getCurrentTime: function() {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();

        return (h<10?'0'+h:h) + 'h' + (m<10?'0'+m:m);
    },
    getSchedule: function() {
        return this.schedule;
    }
});
