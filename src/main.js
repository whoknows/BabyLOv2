/** @jsx React.DOM */

var React = require('react');
var App = require('components/App/App.js');
var Home = require('components/Home/Home.js');
var Games = require('components/Game/Games.js');
var Users = require('components/User/Users.js');
var MatchMaker = require('components/MatchMaker/MatchMaker.js');
var Compare = require('components/Compare/Compare.js');
var Schedule = require('components/Schedule/Schedule.js');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect} = require('react-router');

var routes = (
    <Routes location="hash">
        <Route name="app" path="/" handler={App}>
            <DefaultRoute name="home" handler={Home}/>
            <Route name="games" handler={Games}/>
            <Route name="users" handler={Users}/>
            <Route name="matchmaker" handler={MatchMaker}/>
            <Route name="compare" handler={Compare}/>
            <Route name="schedule" handler={Schedule}/>
        </Route>
    </Routes>
);

document.addEventListener('DOMContentLoaded', function() {
    React.renderComponent(routes, document.body);
});
