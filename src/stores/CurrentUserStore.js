var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: CurrentUserAction,
    currentUser: [],
    init: function(){
        CurrentUserAction.loadData();
    },
    onLoadData: function(){
        CurrentUserAction.loadSuccess({
            id:1,
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
        });
    },
    onLogin: function(login, password) {
        this.currentUser = {
            id:1,
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
        };
        this.trigger();
    },
    onLogout: function() {
        this.currentUser = null;
        this.trigger();
    },
    onLoadSuccess: function(currentUser){
        this.currentUser = currentUser;
        this.trigger();
    },
    getCurrentUser: function() {
        return this.currentUser;
    },
    isAdmin: function(){
        return (typeof this.currentUser.roles !== 'undefined' && this.currentUser.roles.indexOf('ROLE_ADMIN') !== -1);
    },
    isSuperAdmin: function(){
        return (typeof this.currentUser.roles !== 'undefined' && this.currentUser.roles.indexOf('ROLE_SUPER_ADMIN') !== -1);
    }
});
