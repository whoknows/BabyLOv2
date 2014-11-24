/** @jsx React.DOM */

var Reflux = require('reflux');
var React = require('react');
var {Panel} = require('react-bootstrap');
var AlertBar = require('./AlertBar.js');
var UserTable = require('components/Table/UserTable.js');
var UserStore = require('stores/UserStore.js');
var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var UserGraph = require('components/Graph/UserGraph.js');
var GameGraph = require('components/Graph/GameGraph.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore,"onUserChange"),
        Reflux.listenTo(GameStore,"onGameChange"),
    ],
    getInitialState: function() {
        return {
            games: GameStore.getGames(),
            users: UserStore.getUsers()
        };
    },
    onUserChange: function() {
        this.setState({
            users: UserStore.getUsers()
        });
    },
    onGameChange: function() {
        this.setState({
            games: GameStore.getGames()
        });
    },
    render: function () {
        return (
            <div>
                <AlertBar data={this.state.alerts}></AlertBar>
                <div className="row">
                    <div className="col-md-4">
                        <GameTable data={this.state.games} title="Dernières parties"></GameTable>
                    </div>
                    <div className="col-md-4">
                        <GameTable data={this.state.games} title="Dernières parties"></GameTable>
                    </div>
                    <div className="col-md-4">
                        <UserTable data={this.state.users} title="Top players" mode="score" period="thismonth"></UserTable>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <Panel header="Parties jouées par jours">
                            <GameGraph></GameGraph>
                        </Panel>
                    </div>
                    <div className="col-md-5">
                        <Panel header="Statistiques personnelles">
                            <UserGraph></UserGraph>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
});
