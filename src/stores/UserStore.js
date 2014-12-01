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
    onLoadFail: function(){
        console.log('fail');
    },
    getUsers: function() {
        return this.users;
    },
    users: []
});
