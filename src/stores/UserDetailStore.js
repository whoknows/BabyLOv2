var UserDetailAction = require('actions/UserDetailAction.js');
var UserAction = require('actions/UserAction.js');
var UserStore = require('stores/UserStore.js');

module.exports = Reflux.createStore({
    listenables: [UserAction, UserDetailAction],
    onLoadData: function(user_id, period){
        this.currentUser = UserStore.getUserById(user_id);
        this.period = period;
        if(this.currentUser !== null){
            this.makeData();
        }
    },
    onLoadSuccess: function(){
        this.trigger();
    },
    makeData: function(){
        this.userDetail = {userDetail: this.calculUserDetail()};

        UserDetailAction.loadSuccess();
    },
    calculUserDetail: function(){
        return {
            0: this.getNbPlayed(),
            1: this.getNbWon(),
            2: this.getNbLost(),
            3: this.getScore(),
            4: this.getRatio(),
            5: this.getNbGiven(),
            6: this.getNbTaken(),
            7: this.getNbGivenAvg(),
            8: this.getNbTakenAvg(),
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
    getNbGiven: function(){
        return {text: "Nombre de buts marqués", value: this.currentUser.gameData['given' + this.period]};
    },
    getNbTaken: function(){
        return {text: "Nombre de buts pris", value: this.currentUser.gameData['taken' + this.period]};
    },
    getNbGivenAvg: function(){
        var given = this.currentUser.gameData['given' + this.period];
        var games = this.currentUser.gameData['played' + this.period];

        return {text: "Nombre moyen de buts marqués", value: Math.round((given !== 0 ? given / games : 0)*100)/100};
    },
    getNbTakenAvg: function(){
        var taken = this.currentUser.gameData['taken' + this.period];
        var games = this.currentUser.gameData['played' + this.period];

        return {text: "Nombre moyen de buts pris", value: Math.round((taken !== 0 ? taken / games : 0)*100)/100};
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
