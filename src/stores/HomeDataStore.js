var Reflux = require('reflux');
var HomeDataAction = require('actions/HomeDataAction.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = Reflux.createStore({
    listenables: [CurrentUserAction, HomeDataAction],
    homeDatas: [],
    loaded: false,
    onLoginSuccess: function() {
        $.ajax({
            url: '/Babylov2REST/homedata',
            type: 'GET',
            dataType: 'json'
        }).then(function(response) {
            this.homeDatas = response;
            this.loaded = true;
            this.trigger();
        }.bind(this));
    },
    getHomeDatas: function() {
        return this.homeDatas;
    },
    isLoaded: function(){
        return this.loaded;
    }
});
