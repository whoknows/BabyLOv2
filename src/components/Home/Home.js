/** @jsx React.DOM */

var Reflux = require('reflux');
var React = require('react');
var AlertBar = require('./AlertBar.js');
var UserTable = require('components/Table/UserTable.js');
var UserStore = require('stores/UserStore.js');
var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore,"onUserChange"),
        Reflux.listenTo(GameStore,"onGameChange"),
    ],
    getInitialState: function() {
        return {
            games: [],
            users: []
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
            </div>
        );
    }
});
