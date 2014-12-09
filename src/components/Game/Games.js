/** @jsx React.DOM */

var React = require('react');
var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var ColPanel = require('components/Home/ColPanel.js');

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
    render: function () {
        return <div className="content-wrapper">
                    <h3>Parties</h3>
                    <div className="row">
                        <ColPanel col="8" icon="futbol-o" title="Dernières parties">
                            <GameTable data={this.state.games}></GameTable>
                        </ColPanel>
                    </div>
                </div>;
    }
});
