/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var UserImage = require('components/User/UserImage.js');
var {Button, ListGroup, ListGroupItem, Panel} = require('react-bootstrap');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserStore,"onUserChange")],
    getInitialState: function(){
        return {users: UserStore.getUsers(), teams:[], selectedUsers:[]};
    },
    onUserChange: function() {
        this.setState({users: UserStore.getUsers()});
    },
    getUserList: function() {
        return this.state.users.filter(function(user){
            return user.enabled == "1";
        }).map(function(user){
            var click = this.handleClick.bind(null, user.id);
            return <ListGroupItem key={user.id} onClick={click} active={this.state.selectedUsers.indexOf(user.id) !== -1}>
                        <UserImage handleClick={click} user={user.id} />
                    </ListGroupItem>;
        }.bind(this));
    },
    handleClick: function(userid){
        var users = this.state.selectedUsers;

        if (users.indexOf(userid) === -1 && users.length >= 4) {
            users.shift();
        }

        if(users.indexOf(userid) === -1){
            users.push(userid);
        } else {
            users = [];
            this.state.selectedUsers.forEach(function(uid){
                if(uid != userid){
                    users.push(uid);
                }
            });
        }

        this.setState({selectedUsers: users});
    },
    handleSubmit: function(){
        if(this.state.selectedUsers.length == 4){
            this.setState({teams: UserStore.getMatchMaking(this.state.selectedUsers)});
        }
    },
    getTeams: function(){
        if(this.state.selectedUsers.length == 4 && this.state.teams.length == 2){
            return (
                <Panel header={[<i key="icon" className={"fa fa-user"}></i>, " Équipes"]}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Joueur 1</th>
                                <th></th>
                                <th>Joueur 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teams.map(function(team){
                                return <tr>
                                    <td><UserImage user={team[0]} /></td>
                                    <td>ET</td>
                                    <td><UserImage user={team[1]} /></td>
                                </tr>;
                            })}
                        </tbody>
                    </table>
                </Panel>
            );
        } else {
            return <i className="text-info">Il faut sélectionner 4 joueurs.</i>;
        }
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Match Maker</h3>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <ListGroup>{this.getUserList()}</ListGroup>
                    </div>
                    <div className="col-md-2 centered-children">
                        <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>Go matchmaking</Button>
                    </div>
                    <div className="col-md-4">
                        {this.getTeams()}
                    </div>
                </div>
            </div>
        );
    }
});
