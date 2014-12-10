var MatchmakingActions = require('actions/MatchmakingActions.js');
var UserStore = require('stores/UserStore.js');

module.exports = Reflux.createStore({
    listenables: [MatchmakingActions],
    teams: [],
    onDoMatchMaking: function(users) {
        if(users.length !== 4){
            return false;
        }
        var data = users.map(function(userid){
            return UserStore.getUserById(userid);
        }).sort(function(userA, userB){
            return userA.gameData.score < userB.gameData.score ? 1 : -1;
        });

        this.teams = [
            [data[0].id, data[3].id],
            [data[1].id, data[2].id]
        ];

        this.trigger();
    },
    getTeams: function() {
        return this.teams;
    }
});
