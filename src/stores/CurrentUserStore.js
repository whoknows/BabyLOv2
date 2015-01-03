var CurrentUserAction = require('actions/CurrentUserAction.js');
var UserAction = require('actions/UserAction.js');
var UserStore = require('stores/UserStore.js');
var sha1 = require('sha1');

module.exports = Reflux.createStore({
    listenables: [CurrentUserAction, UserAction],
    currentUser: null,
    init: function(){
        CurrentUserAction.checkSession();
    },
    onLoadUsersSuccess: function(){
        CurrentUserAction.loadSuccess(UserStore.getUserById(this.currentUser.id), false);
    },
    onCheckSession: function(){
        $.ajax({
            url: '/Babylov2REST/isconnected',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            CurrentUserAction.loadSuccess(response, true);
        });
    },
    onLogin: function(login, password) {
        if(login === '' || password === ''){
            CurrentUserAction.loadSuccess({message:'Champs vide.'}, true);
            return true;
        }

        $.ajax({
            url: '/Babylov2REST/login/'+login+'/'+sha1(password),
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.doLogin = true;
            CurrentUserAction.loadSuccess(response, true);
        });
    },
    onLogout: function() {
        $.ajax({
            url: '/Babylov2REST/logout',
            type: 'GET',
            dataType: 'json'
        });
        CurrentUserAction.loadSuccess(null, true);
    },
    onLoadSuccess: function(currentUser, doLogin){
        this.currentUser = currentUser;

        if(currentUser !== null && !this.currentUser.message && doLogin){
            CurrentUserAction.loginSuccess();
        }

        this.trigger();
    },
    getCurrentUser: function() {
        return this.currentUser;
    },
    isAdmin: function(){
        return (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf('ROLE_ADMIN') !== -1);
    },
    isSuperAdmin: function(){
        return (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf('ROLE_SUPER_ADMIN') !== -1);
    }
});
