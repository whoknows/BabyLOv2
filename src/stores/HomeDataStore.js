var HomeDataAction = require('actions/HomeDataAction.js');
var UserAction = require('actions/UserAction.js');
var UserStore = require('stores/UserStore.js');

module.exports = Reflux.createStore({
    listenables: [UserAction, HomeDataAction],
    homeDatas: [],
    loaded: false,
    users: [],
    onLoadUsersSuccess: function() {
        $.ajax({
            url: '/Babylov2REST/homedata',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.users = JSON.parse(JSON.stringify(UserStore.getUsers()));
            this.homeDatas = this.calculateData(response);
            this.loaded = true;
            this.trigger();
        }.bind(this));
    },
    calculateData: function(response){
        response.alertBar.last = this.getLast();
        response.alertBar.games = this.getGames();
        response.alertBar.victory = this.getVictory();
        response.alertBar.defeat = this.getDefeat();
        response.alertBar.fanny = this.getFanny(response.alertBar.fanny);
        response.alertBar.worst = this.getWorst();

        return response;
    },
    getVictory: function(){
        var users = this.users.sort(function(userA, userB){
            return userA.gameData.wonThisMonth < userB.gameData.wonThisMonth ? 1 : -1;
        });

        return {
            desc: users[0].gameData.wonThisMonth + " parties gagnées",
            value: users[0].username
        };
    },
    getDefeat: function(){
        var users = this.users.sort(function(userA, userB){
            return userA.gameData.lostThisMonth < userB.gameData.lostThisMonth ? 1 : -1;
        });

        return {
            desc: users[0].gameData.lostThisMonth + " parties perdues",
            value: users[0].username
        };
    },
    getLast: function(){
        var users = this.users.sort(function(userA, userB){
            return userA.gameData.scoreThisMonth < userB.gameData.scoreThisMonth ? 1 : -1;
        });

        return {
            desc: users[users.length - 1].gameData.scoreThisMonth + " de score",
            value: users[users.length - 1].username
        };
    },
    getGames: function(){
        return {
            desc: this.users[0].gameData.totalThisMonth + " parties jouées",
            value: this.users[0].gameData.totalThisMonth
        };
    },
    getFanny: function(data){
        var tmp = data.users.map(function(u){
            return UserStore.getUserById(u).username;
        });

        return {
            desc: tmp[0] + ' et ' + tmp[1] + ' ont pris fanny le ' + data.date,
            value: tmp[0].substr(0,4) + '.' + ' & ' + tmp[1].substr(0,4) + '.'
        };
    },
    getWorst: function() {
        return {
            desc : 'N/A',
            value: 'N/A'
        };
    },
    getHomeDatas: function() {
        return this.homeDatas;
    },
    isLoaded: function(){
        return this.loaded;
    }
});
