var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: CurrentUserAction,
    currentUser: [],
    init: function(){
        CurrentUserAction.loadData();
    },
    onLoadData: function(){
        CurrentUserAction.loadSuccess(null);
    },
    onLogin: function(login, password) {
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/users/1',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            CurrentUserAction.loadSuccess(response);
        });
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
