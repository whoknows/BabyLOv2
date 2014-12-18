var HomeGameActions = require('actions/HomeGameAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [CurrentUserAction, HomeGameActions],
    onLoginSuccess: function(){
        HomeGameActions.loadHomeGames();
    },
    onLoadHomeGames: function(){
        $.ajax({
            url: '/Babylov2REST/games',
            type: 'GET',
            data: {limit:4},
            dataType: 'json'
        }).then(function(response) {
            this.games = response;
            this.trigger();
        }.bind(this));
    },
    getGames: function() {
        return this.games;
    },
    games: []
});
