var Reflux = require('reflux');
var UserActions = require('actions/UserAction.js');

module.exports = Reflux.createStore({
    listenables: UserActions,
    init: function(){
        UserActions.loadData();
    },
    onLoadData: function(){
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/users',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            UserActions.loadSuccess(response);
        });
    },
    onLoadSuccess: function(users){
        this.users = users;
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
    users: []
});
