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
            form.date = this.formatDate(form.date);
            this.games.unshift(form);
            this.trigger();
        }.bind(this));
    },
    formatDate: function(date){
        var d = date.split('-');
        j = d[2];
        d = new Date(d[0], (d[1]-1), j);

        return (j<10?'0':'')+d.toLocaleDateString();
    },
    onDeleteGame: function(id){
        $.ajax({
            url: '/Babylov2REST/games/'+id,
            type: 'DELETE',
            dataType: 'json'
        }).then(function() {
            var newGames = [];

            this.games.forEach(function(elem){
                if(elem.id != id){
                    newGames.push(elem);
                }
            });

            this.games = newGames;
            this.trigger();
        }.bind(this));
    },
    onLoadGames: function(){
        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' : '') + today.getDate();
        $.ajax({
            url: '/Babylov2REST/games/'+today,
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
