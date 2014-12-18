/** @jsx React.DOM */

var ColPanel = require('./ColPanel.js');
var AlertBar = require('./AlertBar.js');
var UserTable = require('components/Table/UserTable.js');
var UserStore = require('stores/UserStore.js');
var GameTable = require('components/Table/GameTable.js');
var HomeGameStore = require('stores/HomeGameStore.js');
var ScheduleTable = require('components/Table/ScheduleTable.js');
var ScheduleStore = require('stores/ScheduleStore.js');
var HomeDataStore = require('stores/HomeDataStore.js');
var UserGraph = require('components/Graph/UserGraph.js');
var GameGraph = require('components/Graph/GameGraph.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');

module.exports = React.createClass({
    nbItem: 4,
    mixins: [
        Reflux.listenTo(UserStore,"onUserChange"),
        Reflux.listenTo(HomeGameStore,"onGameChange"),
        Reflux.listenTo(HomeDataStore,"onHomeDataChange"),
        Reflux.listenTo(ScheduleStore,"onScheduleChange"),
        Reflux.listenTo(CurrentUserStore, "onCurrentUserChange")
    ],
    getInitialState: function() {
        return {
            currentUser: CurrentUserStore.getCurrentUser(),
            games: HomeGameStore.getGames(),
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
            games: HomeGameStore.getGames()
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
    onCurrentUserChange: function() {
        this.setState({
            currentUser:CurrentUserStore.getCurrentUser()
        });
    },
    render: function () {
        return (
            <div>
                <AlertBar data={this.state.homeData.alertBar}></AlertBar>
                <div key={1} className="row">
                    <ColPanel key={1} col="4" icon="calendar" title="Planification">
                        <ScheduleTable slice={this.nbItem} data={this.state.schedule}></ScheduleTable>
                    </ColPanel>
                    <ColPanel key={2} col="5" icon="futbol-o" title="Dernières parties">
                        <GameTable slice={this.nbItem} data={this.state.games}></GameTable>
                    </ColPanel>
                    <ColPanel key={3} col="3" icon="trophy" title="Top players">
                        <UserTable slice={this.nbItem} data={this.state.users} mode="score" period="thismonth"></UserTable>
                    </ColPanel>
                </div>
                <div key={2} className="row">
                    <ColPanel key={1} col="7" icon="area-chart" title="Parties jouées par jours">
                        {HomeDataStore.isLoaded() ? <GameGraph data={this.state.homeData.gameGraph}></GameGraph> : null}
                    </ColPanel>
                    <ColPanel key={2} col="5" icon="bar-chart" title="Statistiques personnelles">
                        <UserGraph user={this.state.currentUser.id} period="ThisMonth" />
                    </ColPanel>
                </div>
            </div>
        );
    }
});
