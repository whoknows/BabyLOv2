var Reflux = require('reflux');
var GameActions = require('actions/GameAction.js');

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
            GameActions.loadSuccess([
                {
                    id: 1,
                    date: '19/11/2014',
                    st1: 10,
                    st2: 4,
                    p1t1: 'Guillaume',
                    p2t1: 'Frederic',
                    p1t2: 'Alexis',
                    p2t2: 'Adeline',
                }
            ]);
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
