var CurrentUserAction = require('actions/CurrentUserAction.js');
var sha1 = require('sha1');

module.exports = Reflux.createStore({
    listenables: CurrentUserAction,
    currentUser: null,
    init: function(){
        CurrentUserAction.checkSession();
    },
    onCheckSession: function(){
        $.ajax({
            url: '/Babylov2REST/isconnected',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            CurrentUserAction.loginSuccess(); //TODO modifier success
            CurrentUserAction.loadSuccess(response);
        });
    },
    onLogin: function(login, password) {
        if(login === '' || password === ''){
            CurrentUserAction.loadSuccess({message:'Champs vide.'});
            return true;
        }

        $.ajax({
            url: '/Babylov2REST/login/'+login+'/'+sha1(password),
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            CurrentUserAction.loginSuccess(); //TODO
            CurrentUserAction.loadSuccess(response);
        });
    },
    onLogout: function() {
        $.ajax({
            url: '/Babylov2REST/logout',
            type: 'GET',
            dataType: 'json'
        });
        CurrentUserAction.loadSuccess(null);
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
