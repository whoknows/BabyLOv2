/** @jsx React.DOM */

var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var GameActions = require('actions/GameAction.js');
var ColPanel = require('components/Home/ColPanel.js');
var {Button, Input} = require('react-bootstrap');
var {State} = require('react-router');

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

        return {
            games: GameStore.getGames(),
            date: dateString
        };
    },
    handleSubmit: function(e){
        e.preventDefault();
        GameActions.loadGames(this.state.date);
    },
    handleChange: function(ref){
        var s = {};
        s[ref] = this.refs[ref].getValue().trim();
        this.setState(s);
    },
    render: function () {
        return <div className="content-wrapper">
                    <h3>Parties</h3>
                    <div className="row">
                        <ColPanel col="12" icon="futbol-o" title="Dernières parties">
                            <div className="col-md-12">
                                <form className="form-inline gameform" onSubmit={this.handleSubmit}>
                                    <Input ref="date" type="date" placeholder="Date" onChange={this.handleChange.bind(this, 'date')} value={this.state.date} />
                                    <Input type="submit" bsStyle="success" value="Valider" />
                                </form>
                            </div>
                            <GameTable advancedDisplay={true} data={this.state.games}></GameTable>
                        </ColPanel>
                    </div>
                </div>;
    }
});
