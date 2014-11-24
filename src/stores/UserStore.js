var Reflux = require('reflux');
var UserActions = require('actions/UserActions.js');

module.exports = Reflux.createStore({
    listenables: UserActions,
    init: function(){
        UserActions.loadData();
    },
    onLoadData: function(){
        /*$.ajax({
            url: 'http://127.0.1.1/Babylov2REST/api/user',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {*/
            var response = [
                {
                    username: 'Guillaume',
                    enabled: 1,
                    roles: ['ROLE_USER', 'ROLE_ADMIN'],
                    gravatar: 'http://www.gravatar.com/avatar/22c64f33e43b433721446315a683ee5a?s=35&d=mm&r=x',
                    gameData: {
                        played: 25,
                        won: 20,
                        lost: 5,
                        total: 30,
                        playedThisMonth: 5,
                        wonThisMonth: 5,
                        lostThisMonth: 0,
                        totalThisMonth: 10
                    }
                },
                {
                    username: 'Charlotte',
                    enabled: 1,
                    roles: ['ROLE_USER'],
                    gravatar: 'http://www.gravatar.com/avatar/22c64f33e43b433721446315a683ee5a?s=35&d=mm&r=x',
                    gameData: {
                        played: 15,
                        won: 5,
                        lost: 10,
                        total: 30,
                        playedThisMonth: 3,
                        wonThisMonth: 2,
                        lostThisMonth: 1,
                        totalThisMonth: 10
                    }
                },
            ];
            UserActions.loadSuccess(response);
        //});
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
