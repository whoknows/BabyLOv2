var UserDetailAction = require('actions/UserDetailAction.js');
var UserAction = require('actions/UserAction.js');
var UserStore = require('stores/UserStore.js');

module.exports = Reflux.createStore({
    listenables: [UserAction, UserDetailAction],
    onLoadUsersSuccess: function(){
        this.currentUser = UserStore.getUserById(this.currentUser.id);
        this.userDetail = this.makeData(JSON.parse(JSON.stringify(this.tmp)));
        UserDetailAction.loadSuccess();
    },
    onLoadData: function(user_id, period){
        this.currentUser.id = user_id;
        this.period = period;
        $.ajax({
            url: '/Babylov2REST/userdetail/'+user_id,
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.tmp = response;
        }.bind(this));
    },
    onLoadSuccess: function(){
        this.trigger();
    },
    makeData: function(data){
        data.userDetail = this.calculUserDetail();

        return data;
    },
    calculUserDetail: function(){
        return {
            0: this.getNbPlayed(),
            1: this.getNbWon(),
            2: this.getNbLost(),
            3: this.getScore(),
            4: this.getRatio(),
            5: this.getNbTaken(),
            6: this.getNbGiven(),
            7: this.getNbTakenAvg(),
            8: this.getNbGivenAvg(),
            9: this.getNemesis(),
            10: this.getWorstEnemy(),
            11: this.getBestMate(),
            12: this.getWorstMate()
        };
    },
    getNbPlayed: function(){
        return {text: "Nombre de parties jouées", value: this.currentUser.gameData['played' + this.period]};
    },
    getNbWon: function(){
        return {text: "Nombre de parties gagnées", value: this.currentUser.gameData['won' + this.period]};
    },
    getNbLost: function(){
        return {text: "Nombre de parties perdues", value: this.currentUser.gameData['lost' + this.period]};
    },
    getScore: function(){
        return {text: "Score", value: this.currentUser.gameData['score' + this.period]};
    },
    getRatio: function(){
        return {text: "Ratio", value: this.currentUser.gameData['ratio' + this.period]};
    },
    getNbTaken: function(){
        return {text: "Nombre de buts marqués", value: 3};
    },
    getNbGiven: function(){
        return {text: "Nombre de buts pris", value: 3};
    },
    getNbTakenAvg: function(){
        return {text: "Nombre moyen de buts marqués", value: 3};
    },
    getNbGivenAvg: function(){
        return {text: "Nombre moyen de buts pris", value: 3};
    },
    getNemesis: function(){
        return {text: "Pire ennemi", value: 3};
    },
    getWorstEnemy: function(){
        return {text: "Moins bon adversaire", value: 3};
    },
    getBestMate: function(){
        return {text: "Meilleur partenaire", value: 3};
    },
    getWorstMate: function(){
        return {text: "Moins bon partenaire", value: 3};
    },
    getUserDetail: function() {
        return this.userDetail;
    },
    tmp: [],
    period: '',
    currentUser: {},
    userDetail: []
});
