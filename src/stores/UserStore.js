var Reflux = require('reflux');
var UserActions = require('actions/UserActions.js');

module.exports = Reflux.createStore({
    listenables: UserActions,
    init: function(){
        UserActions.loadData();
    },
    onLoadData: function(){
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/api/user',
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
        // bzzzzapp!
    },
    getUsers: function() {
        return this.users;
    },
    users: []
});
