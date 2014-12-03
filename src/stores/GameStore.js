var Reflux = require('reflux');
var GameActions = require('actions/GameAction.js');

module.exports = Reflux.createStore({
    listenables: GameActions,
    init: function(){
        GameActions.loadData();
    },
    onLoadData: function(){
        $.ajax({
            url: '/Babylov2REST/games/5', //TODO : changer ce 5
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
