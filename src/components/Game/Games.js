/** @jsx React.DOM */

var React = require('react');
var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var GameActions = require('actions/GameAction.js');
var ColPanel = require('components/Home/ColPanel.js');
var {Button, Input} = require('react-bootstrap');

require('./Game.css');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(GameStore,"onGameChange")
    ],
    onGameChange: function() {
        this.setState({
            games: GameStore.getGames()
        });
    },
    getInitialState: function () {
        return {
            games: GameStore.getGames()
        };
    },
    handleSubmit: function(e){
        e.preventDefault();
        GameActions.loadGames(this.refs.date.getValue());
    },
    render: function () {
        var date = new Date();
        var dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();

        return <div className="content-wrapper">
                    <h3>Parties</h3>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <ColPanel col="10" icon="futbol-o" title="Dernières parties">
                            <div className="col-md-12">
                                <form className="form-inline gameform" onSubmit={this.handleSubmit}>
                                    <Input ref="date" type="date" placeholder="Date" defaultValue={dateString} />
                                    <Input type="submit" bsStyle="success" value="Valider" />
                                </form>
                            </div>
                            <GameTable advancedDisplay={true} data={this.state.games}></GameTable>
                        </ColPanel>
                    </div>
                </div>;
    }
});
