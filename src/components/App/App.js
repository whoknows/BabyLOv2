/** @jsx React.DOM */

var Reflux = require('expose?Reflux!reflux');
var React = require('expose?React!react');
var {Navbar, Nav, DropdownButton, MenuItem, NavItem} = require('react-bootstrap');
var BabyMenuItem = require('components/BabyMenuItem/BabyMenuItem.js');
var MenuItemLink = require('components/App/MenuItemLink.js');
var LoginForm = require('components/LoginForm/LoginForm.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');

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
        if(this.state.currentUser === null || this.state.currentUser.message) {
            if (this.state.currentUser && this.state.currentUser.message) {
                return (<LoginForm message={this.state.currentUser.message} />);
            }
            return (<LoginForm />);
        }

        return (
            <header className="topnavbar-wrapper">
                {/*<Navbar className="topnavbar" fluid>*/}
                <Navbar inverse fluid>
                    <Nav>
                        <NavItem className="brand"><img src="external/img/react.png" height="20" width="20" alt="logo" />BabyLOv3</NavItem>
                        <BabyMenuItem icon="fa fa-home" dest="home" label="Accueil"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-star" dest="games" label="Parties"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-user" dest="users" label="Joueurs"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-cog" dest="matchmaker" label="Match Maker"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-fire" dest="compare" label="Comparateur"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-calendar" dest="schedule" label="Planification"></BabyMenuItem>
                    </Nav>
                    <Nav className="navbar-right">
                        <DropdownButton title={[<img className="image-left" src={this.state.currentUser.gravatar} height="20" width="20" />, "Bonjour " + this.state.currentUser.username]}>
                            {CurrentUserStore.isAdmin() ? <MenuItemLink to="addgame"><i className="fa fa-plus"></i>Ajouter une partie</MenuItemLink> : null}
                            {CurrentUserStore.isSuperAdmin() ? <MenuItem><i className="fa fa-cogs"></i>Gestion des utilisateurs</MenuItem> : null}
                            <MenuItem divider />
                            <MenuItem onClick={CurrentUserAction.logout}><i className="fa fa-sign-out"></i>Logout</MenuItem>
                        </DropdownButton>
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <this.props.activeRouteHandler/>
                </div>
            </header>
        );
    }
});
