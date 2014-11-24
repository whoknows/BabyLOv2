var Reflux = require('reflux');
var GameActions = require('actions/GameActions.js');

module.exports = Reflux.createStore({
    listenables: GameActions,
    init: function(){
        GameActions.loadData();
    },
    onLoadData: function(){
        /*$.ajax({
            url: 'http://127.0.1.1/Babylov2REST/api/game',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {*/
            GameActions.loadSuccess([]);
        //});
    },
    onLoadSuccess: function(games){
        this.games = games;
        this.trigger();
    },
    onLoadFail: function(){
        // bzzzzapp!
    },
    getGames: function() {
        return this.games;
    },
    games: []
});
