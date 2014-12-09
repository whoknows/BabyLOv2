var Reflux = require('reflux');
var GameActions = require('actions/GameAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [CurrentUserAction, GameActions],
    onLoginSuccess: function(){
        GameActions.loadGames();
    },
    onSaveGame: function(form){
        $.ajax({
            url: '/Babylov2REST/games',
            type: 'POST',
            data: form,
            dataType: 'json'
        }).then(function(response) {
            form.id = response.id;
            this.games.push(form);
            this.trigger();
        });
    },
    onDeleteGame: function(id){
        console.log('delete game');
    },
    onLoadGames: function(){
        $.ajax({
            url: '/Babylov2REST/games/5', //TODO : changer ce 5
            type: 'GET',
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
