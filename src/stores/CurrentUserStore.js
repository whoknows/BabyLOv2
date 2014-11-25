var Reflux = require('reflux');
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
            username:'Guillaume',
            roles:['ROLE_USER', 'ROLE_ADMIN']
        });
    },
    onLoadSuccess: function(currentUser){
        this.currentUser = currentUser;
        this.trigger();
    },
    onLoadFail: function(){},
    getCurrentUser: function() {
        return this.currentUser;
    },
    isLoaded: function(){
        return this.loaded;
    }
});
