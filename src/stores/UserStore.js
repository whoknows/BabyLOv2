var Reflux = require('reflux');
var UserActions = require('actions/UserAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [UserActions, CurrentUserAction],
    onLoginSuccess: function(){
        $.ajax({
            url: '/Babylov2REST/users',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.users = response;
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
    users: []
});
