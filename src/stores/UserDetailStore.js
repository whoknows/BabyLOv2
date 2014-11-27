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
                    username:"Guillaume",
                    gravatar:"http://www.gravatar.com/avatar/22c64f33e43b433721446315a683ee5a?s=150&d=mm&r=x",
                    graphData:{}
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
