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
                    u.username = user.username;
                    u.email = user.email;
                    u.roles = user.roles;
                    u.enabled = user.enabled;

                    return u;
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
    userExists: function(username) {
        return $.ajax({
            url:'/Babylov2REST/userexists',
            type: 'GET',
            dataType: 'json',
            data: {user: username}
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
        return this.getUserBy('id', id);
    },
    getUserBy: function(field, value) {
        var user = null;

        this.users.some(function(u) {
            if((isNaN(value) && u[field].toLowerCase() == value.toLowerCase()) || u[field] == value) {
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
    },
    getMatchMaking: function(users) {
        if(users.length !== 4 || this.users.length === 0){
            return [];
        }

        var data = users.map(function(userid){
            return this.getUserById(userid);
        }.bind(this)).sort(function(userA, userB){
            return userA.gameData.score < userB.gameData.score ? 1 : -1;
        });

        return [
            [data[0].id, data[3].id],
            [data[1].id, data[2].id]
        ];
    },
    getNewUsers: function(){
        var users = [];

        this.users.forEach(function(user){
            if(user.roles[0] === "" && user.enabled != "1"){
                users.push(user);
            }
        });

        return users;
    }
});
