var Reflux = require('reflux');
var GameActions = require('actions/GameAction.js');

module.exports = Reflux.createStore({
    listenables: [GameActions],
    onSaveGame: function(form){
        $.ajax({
            url: '/Babylov2REST/games',
            type: 'POST',
            data: form,
            dataType: 'json'
        }).then(function(response) {
            form.id = response.id;
            form.date = this.formatToDate(form.date);
            this.games.unshift(form);
            this.trigger();
        }.bind(this));
    },
    formatFromDate: function(d){
        if(typeof d === 'undefined'){
            d = new Date();
        }
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate();
    },
    formatToDate: function(date){
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
    onLoadGames: function(date){
        if(!date && date !== '') {
            date = this.formatFromDate(new Date());
        } else if(date === ''){
            date = undefined;
        }

        $.ajax({
            url: '/Babylov2REST/games',
            type: 'GET',
            data: {'date': date},
            dataType: 'json'
        }).then(function(response) {
            this.games = response;
            this.currentDate = date;
            this.trigger();
        }.bind(this));
    },
    getGames: function() {
        return this.games;
    },
    getCurrentDate: function(){
        if(this.currentDate === ''){
            this.currentDate = this.formatFromDate();
        }
        return this.currentDate;
    },
    currentDate: '',
    games: []
});
