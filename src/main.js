/** @jsx React.DOM */

var React = require('react');
var App = require('./components/App/App.js');
var Home = require('./components/Home/Home.js');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect} = require('react-router');

var routes = (
    <Routes location="hash">
        <Route name="app" path="/" handler={App}>
            <DefaultRoute name="home" handler={Home}/>
        </Route>
    </Routes>
);

document.addEventListener('DOMContentLoaded', function() {
    React.renderComponent(routes, document.body);
});
