var Reflux = require('reflux');
var HomeDataAction = require('actions/HomeDataAction.js');

module.exports = Reflux.createStore({
    listenables: HomeDataAction,
    homeDatas: [],
    loaded: false,
    init: function(){
        HomeDataAction.loadData();
    },
    onLoadData: function(){
        HomeDataAction.loadSuccess({
            alertBar: {
                victory: {
                    name:'Guillaume',
                    desc: '8 parties gagnées'
                },
                defeat: {
                    name:'Cedric',
                    desc: '8 parties perdues'
                },
                games: {
                    name:'8',
                    desc: '8 parties jouées'
                },
                last: {
                    name:'Joon',
                    desc: '0.1 de score'
                },
                worst: {
                    name:'Stephane',
                    desc: '9.46 buts pris par matchs'
                },
                fanny: {
                    name:'Adel. & Nico.',
                    desc:'Ils ont pris fanny'
                }
            },
            gameGraph: {
                datas:[12,8,3,4,1],
                labels:['2014-11-19','2014-11-20','2014-11-21','2014-11-22','2014-11-23']
            }
        });
    },
    onLoadSuccess: function(homeDatas){
        this.homeDatas = homeDatas;
        this.loaded = true;
        this.trigger();
    },
    onLoadFail: function(){},
    getHomeDatas: function() {
        return this.homeDatas;
    },
    isLoaded: function(){
        return this.loaded;
    }
});
