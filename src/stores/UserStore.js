var UserAction = require('actions/UserAction.js');
var GameAction = require('actions/GameAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [UserAction, GameAction, CurrentUserAction],
    users: [],
    periodList: ["", "ThisMonth", "LastMonth"],
    poidsRatio: 0.65,
    onLoginSuccess: function(){
        UserAction.loadUsers();
    },
    onSaveGame: function(){
        UserAction.loadUsers();
    },
    onDeleteUser: function(user_id) {
        $.ajax({
            url:'/Babylov2REST/users',
            type: 'DELETE',
            dataType: 'json',
            data: {id: user_id}
        }).then(function(response){
            var tmp = [];
            this.users.forEach(function(u){
                if(u.id != user_id){
                    tmp.push(u);
                }
            });
            this.users = tmp;
            this.trigger();
        }.bind(this));
    },
    onSaveUser: function(user){
        $.ajax({
            url:'/Babylov2REST/users',
            type: 'PUT',
            dataType: 'json',
            data: user
        }).then(function(response){
            this.users = this.users.map(function(u){
                if(u.id == user.id){
                    user.password = undefined;
                    return user;
                }
                return u;
            });
            this.trigger();
        }.bind(this));
    },
    onAddUser: function(user){
        $.ajax({
            url:'/Babylov2REST/users',
            type: 'POST',
            dataType: 'json',
            data: user
        }).then(function(response){
            user.id = parseInt(response);
            user.password = undefined;
            user.gameData = {};
            if(!user.roles){
                user.roles = [];
            }
            this.users.push(user);
            this.trigger();
        }.bind(this));
    },
    onLoadUsers: function(){
        $.ajax({
            url: '/Babylov2REST/users',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            UserAction.loadUsersSuccess(response);
        });
    },
    onLoadUsersSuccess: function(response){
        this.users = this.formatResponse(response);
        this.trigger();
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
