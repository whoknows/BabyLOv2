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
                    graphData:{
                        //
                    },
                    userDetail: [
                        {text: "Nombre de parties jouées", value: 3},
                        {text: "Nombre de parties gagnées", value: 3},
                        {text: "Nombre de parties perdues", value: 3},
                        {text: "Score", value: 0.4},
                        {text: "Ratio", value: 0.4},
                        {text: "Nombre de buts marqués", value: 0.4},
                        {text: "Nombre de buts pris", value: 0.4},
                        {text: "Nombre moyen de buts marqués", value: 0.4},
                        {text: "Nombre moyen de buts pris", value: 0.4},
                        {text: "Pire ennemi", value: "Jordan"},
                        {text: "Moins bon adversaire", value: "Jordan"},
                        {text: "Meilleur partenaire", value: "Jordan"},
                        {text: "Moins bon partenaire", value: "Jordan"}
                    ]
                });
        //});
    },
    onLoadSuccess: function(userDetail){
        this.userDetail = userDetail;
        this.trigger();
    },
    getUserDetail: function() {
        return this.userDetail;
    },
    userDetail: []
});
