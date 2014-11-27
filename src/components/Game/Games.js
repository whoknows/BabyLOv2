/** @jsx React.DOM */

var React = require('react');
var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(GameStore,"onGameChange")
    ],
    onGameChange: function() {
        this.setState({
            games: GameStore.getGames()
        });
    },
    render: function () {
        return <div>
                    <h3>Match Maker</h3>
                    <div className="row">
                        <ColPanel col="12" icon="futbol-o" title="Dernières parties">
                            <GameTable data={this.state.games}></GameTable>
                        </ColPanel>
                    </div>
                </div>;
    }
});
