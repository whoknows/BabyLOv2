var MatchmakingActions = require('actions/MatchmakingActions.js');
var UserStore = require('stores/UserStore.js');

module.exports = Reflux.createStore({
    listenables: [MatchmakingActions],
    teams: [],
    onDoMatchMaking: function(users) {
        console.log('MM');
        if(users.length !== 4){
            return false;
        }
        var data = users.map(function(userid){
            return UserStore.getUserById(userid);
        }).sort(function(userA, userB){
            return userA.gameData.score < userB.gameData.score ? 1 : -1;
        });

        console.log(data);
        //get first + last, second + third
    },
    getTeams: function() {
        return this.teams;
    }
});
