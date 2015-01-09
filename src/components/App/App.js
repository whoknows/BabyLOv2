/** @jsx React.DOM */

var Reflux = require('expose?Reflux!reflux');
var React = require('expose?React!react');
var {Navbar, Nav, DropdownButton, MenuItem, NavItem} = require('react-bootstrap');
var BabyMenuItem = require('components/BabyMenuItem/BabyMenuItem.js');
var MenuItemLink = require('components/App/MenuItemLink.js');
var LoginForm = require('components/LoginForm/LoginForm.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var CurrentUserAction = require('actions/CurrentUserAction.js');
var {RouteHandler, Navigation} = require('react-router');
var Unauthorised = require('components/Unauthorised/Unauthorised.js');

require('./App.css');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(CurrentUserStore,"onCurrentUserChange"), Navigation],
    getInitialState: function(){
        return {};
    },
    onCurrentUserChange: function() {
        this.setState({
            currentUser: CurrentUserStore.getCurrentUser()
        });
    },
    getDropdownContent: function(){
        var ret = [];

        ret.push(<MenuItem key="userinfo" eventKey="profile"><i className="fa fa-user"></i>Gestion du compte</MenuItem>);
        if(CurrentUserStore.isAdmin()){
            ret.push(<MenuItem key="admin" eventKey="addgame"><i className="fa fa-plus"></i>Ajouter une partie</MenuItem>);
        }
        if(CurrentUserStore.isSuperAdmin()){
            ret.push(<MenuItem key="superadmin" eventKey="usermanager"><i className="fa fa-cogs"></i>Gestion des utilisateurs</MenuItem>);
        }
        ret.push(<MenuItem key="divider" divider />);
        ret.push(<MenuItem key="logout" onClick={CurrentUserAction.logout}><i className="fa fa-sign-out"></i>Logout</MenuItem>);

        return ret;
    },
    triggerHelper: function() {
        console.log('to do');
    },
    handleSelect: function(to){
        if(to){
            this.refs.navbar.refs.nav.refs.dropdown.setDropdownState(false);
            this.transitionTo(to);
        }
    },
    render: function () {
        if(typeof this.state.currentUser === 'undefined'){
            return <div className="pageloader"><i className="fa fa-circle-o-notch fa-spin"></i></div>;
        }

        if (this.state.currentUser && this.state.currentUser.message) {
            return (<LoginForm message={this.state.currentUser.message} />);
        } else if (this.state.currentUser === null) {
            return (<LoginForm />);
        }  else if(this.state.currentUser.roles.indexOf('ROLE_USER') == -1){
            return <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <Unauthorised noButton />
                        </div>
                    </div>;
        }

        return (
            <header className="topnavbar-wrapper">
                <Navbar ref="navbar" inverse fluid>
                    <Nav>
                        <NavItem className="brand"><img src="external/img/react.png" height="20" width="20" alt="logo" />BabyLOv3</NavItem>
                        <BabyMenuItem icon="fa fa-home" dest="home" label="Accueil"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-star" dest="games" label="Parties"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-user" dest="users" label="Joueurs"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-cog" dest="matchmaker" label="Match Maker"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-bolt" dest="compare" label="Comparateur"></BabyMenuItem>
                        <BabyMenuItem icon="fa fa-calendar" dest="schedule" label="Planification"></BabyMenuItem>
                    </Nav>
                    <Nav ref="nav" className="navbar-right">
                        {/*<NavItem onClick={this.triggerHelper}><i className="fa fa-question-circle"></i>&nbsp;</NavItem>*/}
                        <DropdownButton title={<i className="fa fa-list" key="1"></i>}>
                            <MenuItem key="12"><strong>Reste à faire</strong></MenuItem>
                            <MenuItem key="22" divider />
                            <MenuItem key="5">Manuel utilisateur</MenuItem>
                            <MenuItem key="6" divider />
                            <MenuItem key="7">Optimisation de la récupération des données utilisateur</MenuItem>
                        </DropdownButton>
                        <DropdownButton ref="dropdown" onSelect={this.handleSelect} title={[<img key="img" className="image-left" src={this.state.currentUser.gravatar} height="20" width="20" />, "Bonjour " + this.state.currentUser.username]}>
                            {this.getDropdownContent()}
                        </DropdownButton>
                    </Nav>
                </Navbar>
                <div className="container-fluid">
                    <RouteHandler />
                </div>
            </header>
        );
    }
});
