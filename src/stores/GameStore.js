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
    onLoadGames: function(formData){
        if(!formData.date && formData.date !== '') {
            formData.date = this.formatFromDate(new Date());
        } else if(formData.date === ''){
            formData.date = undefined;
        }

        $.ajax({
            url: '/Babylov2REST/games',
            type: 'GET',
            data: formData,
            dataType: 'json'
        }).then(function(response) {
            this.games = this.filterGames(formData, response);
            this.currentDate = formData.date;
            this.trigger();
        }.bind(this));
    },
    filterGames: function(formData, games){
        var filteredGames = [];

        if (formData.users) {
            if (formData.users.length === 2) {
                games.forEach(function(game){
                    if(formData.mode == "avec"){
                        if((game.p1t1 == formData.users[0] && game.p2t1 == formData.users[1]) || (game.p1t2 == formData.users[0] && game.p2t2 == formData.users[1])){
                            filteredGames.push(game);
                        }
                    } else {
                        if ((formData.users.indexOf(game.p1t1) !== -1 && formData.users.indexOf(game.p1t2) !== -1) ||
                            (formData.users.indexOf(game.p1t1) !== -1 && formData.users.indexOf(game.p2t2) !== -1) ||
                            (formData.users.indexOf(game.p2t1) !== -1 && formData.users.indexOf(game.p1t2) !== -1) ||
                            (formData.users.indexOf(game.p2t1) !== -1 && formData.users.indexOf(game.p2t2) !== -1) ){
                            filteredGames.push(game);
                        }
                    }
                });
            }
        } else {
            filteredGames = games;
        }

        return filteredGames;
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
