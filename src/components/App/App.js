/** @jsx React.DOM */

var Reflux = require('expose?Reflux!reflux');
var React = require('expose?React!react');
var {Navbar, Nav, DropdownButton, MenuItem, NavItem} = require('react-bootstrap');
//var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect, Link} = require('react-router');
var BabyMenuItem = require('components/BabyMenuItem/BabyMenuItem.js');
var LoginForm = require('components/LoginForm/LoginForm.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var UserAction = require('actions/UserAction.js');

require('./App.css');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(CurrentUserStore,"onCurrentUserChange")
    ],
    getInitialState: function(){
        return {
            currentUser: CurrentUserStore.getCurrentUser()
        };
    },
    onCurrentUserChange: function() {
        this.setState({
            currentUser: CurrentUserStore.getCurrentUser()
        });
    },
    render: function () {
        if(this.state.currentUser === null) {
            return (<LoginForm/>);
        }

        return (
            <div>
                <Navbar inverse fluid>
                    <Nav>
                        <NavItem brand><img src="external/img/react.png" height="36" width="36" alt="logo" />BabyLOv3</NavItem>
                        <BabyMenuItem icon="fa fa-home" dest="home" label="Accueil"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-star" dest="games" label="Parties"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-user" dest="users" label="Joueurs"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-cog" dest="matchmaker" label="Match Maker"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-fire" dest="compare" label="Comparateur"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-calendar" dest="schedule" label="Planification"></BabyMenuItem>
                    </Nav>
                    <Nav className="navbar-right">
                        <DropdownButton title={[<i className="fa fa-user"></i>, "Bonjour " + this.state.currentUser.username]}>
                            {CurrentUserStore.isAdmin() ? <MenuItem><i className="fa fa-plus"></i>Ajouter une partie</MenuItem> : null}
                            {CurrentUserStore.isSuperAdmin() ? <MenuItem><i className="fa fa-cogs"></i>Gestion des utilisateurs</MenuItem> : null}
                            <MenuItem divider />
                            <MenuItem onClick={UserAction.logout}><i className="fa fa-sign-out"></i>Logout</MenuItem>
                        </DropdownButton>
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <div className="content-wrapper">
                        <this.props.activeRouteHandler/>
                    </div>
                </div>
            </div>
        );
    }
});
