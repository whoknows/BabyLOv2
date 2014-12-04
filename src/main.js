/** @jsx React.DOM */

var React = require('react');
var App = require('components/App/App.js');
var Home = require('components/Home/Home.js');
var Games = require('components/Game/Games.js');
var Users = require('components/User/Users.js');
var MatchMaker = require('components/MatchMaker/MatchMaker.js');
var Compare = require('components/Compare/Compare.js');
var Schedule = require('components/Schedule/Schedule.js');
var AddGame = require('components/AddGame/AddGame.js');
var {Route, DefaultRoute, HistoryLocation, run} = require('react-router');

var routes = (
        <Route name="app" path="/Babylov2/" handler={App}>
            <DefaultRoute name="home" handler={Home}/>
            <Route name="games" handler={Games}/>
            <Route name="users" path="users/?:id?" handler={Users}/>
            <Route name="matchmaker" handler={MatchMaker}/>
            <Route name="compare" handler={Compare}/>
            <Route name="schedule" handler={Schedule}/>
            <Route name="addgame" handler={AddGame}/>
        </Route>);

document.addEventListener('DOMContentLoaded', function() {
    run(routes, HistoryLocation, function (Handler) {
        React.render(<Handler/>, document.body);
    });
});
