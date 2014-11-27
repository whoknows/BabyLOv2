var Reflux = require('reflux');
var UserDetailAction = require('actions/UserDetailAction.js');

module.exports = Reflux.createStore({
    listenables: UserDetailAction,
    init: function(){
        UserDetailAction.loadData();
    },
    onLoadData: function(){
        /*$.ajax({
            url: 'http://127.0.1.1/Babylov2REST/api/game',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {*/
            UserDetailAction.loadSuccess({
                    id: 1,
                    username:"Guillaume"
                });
        //});
    },
    onLoadSuccess: function(userDetail){
        this.userDetail = userDetail;
        this.trigger();
    },
    onLoadFail: function(){
        // bzzzzapp!
    },
    getUserDetail: function() {
        return this.userDetail;
    },
    userDetail: []
});
