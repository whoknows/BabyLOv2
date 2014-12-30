/** @jsx React.DOM */

var {Table, Button} = require('react-bootstrap');
var UserStore = require('stores/UserStore.js');
var UserAction = require('actions/UserAction.js');
var UserImage = require('components/User/UserImage.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var Unauthorised = require('components/Unauthorised/Unauthorised.js');
var Form = require('components/User/UserForm.js');
var ColPanel = require('components/Home/ColPanel.js');
var PopConfirm = require('components/PopConfirm/PopConfirm.js');

require('./UserManager.css');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserStore,"onUsersChange")],
    onUsersChange: function() {
        this.setState({users: UserStore.getUsers()});
    },
    getInitialState: function(){
        return {users: UserStore.getUsers()};
    },
    resetForm: function(e) {
        e.preventDefault();

        this.setState({currentUser: undefined});
    },
    makeUserList: function(){
        return this.state.users.map(function(user){
            var icon = "fa fa-" + (user.enabled == "1" ? "check" : "close");
            //console.log(user);
            return (
                <tr key={user.id}>
                    <td className="hasUserImage"><UserImage user={user.id} /></td>
                    <td>{user.email}</td>
                    <td>{user.roles.toString()}</td>
                    <td className="icon-enabled"><i className={icon}></i></td>
                    <td className="icon-edit"><Button bsStyle="primary" onClick={this.editUser.bind(null, user)}><i className="fa fa-edit"></i></Button></td>
                    <td className="icon-edit">
                        <PopConfirm title="Supprimer l'utilisateur ?" onConfirm={this.deleteUser.bind(this, user.id)}>
                            <Button bsStyle="danger" disabled={user.gameData.played !== 0}><i className="fa fa-trash"></i></Button>
                        </PopConfirm>
                    </td>
                </tr>
            );
        }.bind(this));
    },
    deleteUser: function(user_id){
        UserAction.deleteUser(user_id);
    },
    editUser: function(user){
        this.setState({currentUser: user});
    },
    render: function () {
        if(!CurrentUserStore.isSuperAdmin()){
            return <Unauthorised />;
        }

        return (
            <div className="content-wrapper">
                <h3>Gestion des utilisateurs</h3>
                <div className="row">
                    <ColPanel key={1} col="6" icon="calendar" title="Gestion des utilisateurs">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Utilisateur</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Actif</th>
                                    <th>Editer</th>
                                    <th>Suppr.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.makeUserList()}
                            </tbody>
                        </Table>
                    </ColPanel>
                    <ColPanel key={2} col="6" icon="edit" title="Formulaire utilisateur">
                        <Form admin width={9} cancel={this.resetForm} user={this.state.currentUser} doAfterSubmit={this.resetForm}/>
                    </ColPanel>
                </div>
            </div>
        );
    }
});
