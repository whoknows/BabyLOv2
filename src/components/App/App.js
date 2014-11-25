/** @jsx React.DOM */

var React = require('expose?React!react');
var {Navbar, Nav, DropdownButton, MenuItem, Panel, NavItem} = require('react-bootstrap');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect, Link} = require('react-router');
var BabyMenuItem = require('components/BabyMenuItem/BabyMenuItem.js');
var LoginForm = require('components/LoginForm/LoginForm.js');

require('./App.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            currentUser:null
        };
    },
    render: function () {
        if(this.state.currentUser === null) {
            return (<LoginForm/>);
        }

        return (
            <div>
                <Navbar fluid>
                    <Nav>
                        <NavItem brand>BabyLOv3</NavItem>
                        <BabyMenuItem icon="mdi-action-home" dest="home" label="Accueil"></BabyMenuItem>
                        <BabyMenuItem icon="mdi-action-grade" dest="games" label="Parties"></BabyMenuItem>
                        <BabyMenuItem icon="mdi-social-person" dest="users" label="Joueurs"></BabyMenuItem>
                        <BabyMenuItem icon="mdi-action-settings" dest="matchmaker" label="Match Maker"></BabyMenuItem>
                        <BabyMenuItem icon="mdi-social-whatshot" dest="compare" label="Comparateur"></BabyMenuItem>
                        <BabyMenuItem icon="mdi-action-event" dest="schedule" label="Planification"></BabyMenuItem>
                    </Nav>
                    <Nav className="navbar-right">
                        <DropdownButton title={'UserName'}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem>Logout</MenuItem>
                        </DropdownButton>
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <this.props.activeRouteHandler/>
                </div>
            </div>
        );
    }
});
