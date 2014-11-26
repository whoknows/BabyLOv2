/** @jsx React.DOM */

var {Panel} = require('react-bootstrap');
var AlertBar = require('./AlertBar.js');
var UserTable = require('components/Table/UserTable.js');
var UserStore = require('stores/UserStore.js');
var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var ScheduleTable = require('components/Table/ScheduleTable.js');
var ScheduleStore = require('stores/ScheduleStore.js');
var HomeDataStore = require('stores/HomeDataStore.js');
var UserGraph = require('components/Graph/UserGraph.js');
var GameGraph = require('components/Graph/GameGraph.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore,"onUserChange"),
        Reflux.listenTo(GameStore,"onGameChange"),
        Reflux.listenTo(HomeDataStore,"onHomeDataChange"),
        Reflux.listenTo(ScheduleStore,"onScheduleChange")
    ],
    getInitialState: function() {
        return {
            games: GameStore.getGames(),
            users: UserStore.getUsers(),
            homeData: HomeDataStore.getHomeDatas(),
            schedule: ScheduleStore.getSchedule()
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
    onHomeDataChange: function() {
        this.setState({
            homeData: HomeDataStore.getHomeDatas()
        });
    },
    onScheduleChange: function() {
        this.setState({
            schedule: ScheduleStore.getSchedule()
        });
    },
    render: function () {
        var gameGraph = HomeDataStore.isLoaded() ? <GameGraph data={this.state.homeData.gameGraph}></GameGraph> : null;

        return (
            <div>
                <AlertBar data={this.state.homeData.alertBar}></AlertBar>
                <div className="row">
                    <div className="col-md-4">
                        <ScheduleTable data={this.state.schedule} title="Planification"></ScheduleTable>
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
                        <Panel header={[<i className="fa fa-bar-chart"></i>,"Parties jouées par jours"]}>
                            {gameGraph}
                        </Panel>
                    </div>
                    <div className="col-md-5">
                        <Panel header={[<i className="fa fa-line-chart"></i>,"Statistiques personnelles"]}>
                            <UserGraph></UserGraph>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
});
