var Reflux = require('reflux');
var GameActions = require('actions/GameAction.js');

module.exports = Reflux.createStore({
    listenables: GameActions,
    init: function(){
        GameActions.loadData();
    },
    onLoadData: function(){
        $.ajax({
            url: 'http://127.0.1.1/Babylov2REST/games',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            GameActions.loadSuccess(response);
        });
    },
    onLoadSuccess: function(games){
        this.games = games;
        this.trigger();
    },
    getGames: function() {
        return this.games;
    },
    games: []
});
