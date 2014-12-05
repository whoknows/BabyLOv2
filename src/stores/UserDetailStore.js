var Reflux = require('reflux');
var UserDetailAction = require('actions/UserDetailAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [CurrentUserAction, UserDetailAction],
    loadData: function(user_id){
        $.ajax({
            url: '/Babylov2REST/userdetail/'+user_id,
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.userDetail = response;
            this.trigger();
        }.bind(this));
    },
    getUserDetail: function() {
        return this.userDetail;
    },
    userDetail: []
});
