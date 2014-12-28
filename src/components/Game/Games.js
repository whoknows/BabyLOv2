/** @jsx React.DOM */

var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var GameActions = require('actions/GameAction.js');
var ColPanel = require('components/Home/ColPanel.js');
var {Button, Input} = require('react-bootstrap');
var {State} = require('react-router');
var Select = require('components/Select/Select.js');

require('./Game.css');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(GameStore,"onGameChange"),
        State
    ],
    onGameChange: function() {
        this.setState({
            games: GameStore.getGames()
        });
    },
    getInitialState: function () {
        var dateString;

        if(this.getParams().date){
            dateString = this.getParams().date;
        } else {
            dateString = GameStore.getCurrentDate();
        }

        var gameStoreData = GameStore.getGames();

        if(gameStoreData.length === 0){
            GameActions.loadGames(dateString);
        }

        return {
            games: gameStoreData,
            date: dateString,
            formVisible: false
        };
    },
    handleSubmit: function(e){
        e.preventDefault();
        var data = {date: this.state.date};

        if (this.state.formVisible) {
            data.users = [
                this.refs.p1.getValue(),
                this.refs.p2.getValue()
            ];
            data.mode = this.refs.mode.getValue();
        }

        GameActions.loadGames(data);
    },
    handleChange: function(ref){
        var s = {};
        s[ref] = this.refs[ref].getValue().trim();
        this.setState(s);
    },
    handleDisplay: function(e){
        e.preventDefault();

        this.setState({formVisible: !this.state.formVisible});
    },
    getForm: function(){
        return (
            <div className="row">
                <div className="col-md-5">
                    <Select ref="p1" placeholder="Joueur 1" />
                </div>
                <div className="col-md-2 select-container">
                    <Input type="select" ref="mode" className="middle-select">
                        <option value="avec">Avec</option>
                        <option value="contre">Contre</option>
                    </Input>
                </div>
                <div className="col-md-5">
                    <Select ref="p2" placeholder="Joueur 2" />
                </div>
            </div>
        );
    },
    render: function () {
        return <div className="content-wrapper">
                    <h3>Parties</h3>
                    <div className="row">
                        <ColPanel col="12" icon="futbol-o" title="Dernières parties">
                            <div className="col-md-12">
                                <form className="form-inline gameform" ref="gameform" onSubmit={this.handleSubmit}>
                                    <Input ref="date" type="text" placeholder="Date" onChange={this.handleChange.bind(this, 'date')} value={this.state.date} />
                                    <Input type="submit" bsStyle="success" value="Valider" />
                                    <a href="#" onClick={this.handleDisplay}>Recherche avancée</a>
                                    {this.state.formVisible ? this.getForm() : null}
                                </form>
                            </div>
                            <GameTable advancedDisplay={true} data={this.state.games} />
                        </ColPanel>
                    </div>
                </div>;
    }
});
