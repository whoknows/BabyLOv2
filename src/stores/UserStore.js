var Reflux = require('reflux');
var UserActions = require('actions/UserAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [UserActions, CurrentUserAction],
    users: [],
    periodList: ["", "ThisMonth", "LastMonth"],
    poidsRatio: 0.65,
    onLoginSuccess: function(){
        $.ajax({
            url: '/Babylov2REST/users',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.users = this.formatResponse(response);
            this.trigger();
        }.bind(this));
    },
    getUsers: function() {
        return this.users;
    },
    getUserById: function(id) {
        var user = null;

        this.users.some(function(u) {
            if(u.id == id) {
                user = u;
                return true;
            }
        });

        return user;
    },
    formatResponse: function(response){
        return response.sort(function(userA, userB){
            return userA.username > userB.username ? 1 : -1;
        }).map(function(user){

            this.periodList.forEach(function(p){
                user.gameData['score' + p] = this.getScore(user.gameData, p, 'score');
                user.gameData['ratio' + p] = this.getScore(user.gameData, p, 'ratio');
            }.bind(this));

            return user;
        }.bind(this));
    },
    getScore: function (gameData, p, mode) {
        var total = gameData['won' + p] + gameData['lost' + p];
        var ratio = gameData['won' + p] / total;

        if (mode == 'score') {
            ratio = (ratio * this.poidsRatio) + ((total / gameData['total' + p]) * (1 - this.poidsRatio));
        }

        var score = Math.round(ratio*100)/100;

        return isNaN(score) ? 0 : score;
    }
});
