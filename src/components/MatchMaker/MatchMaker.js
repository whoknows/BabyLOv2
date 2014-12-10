/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var MatchmakingActions = require('actions/MatchmakingActions.js');
var UserImage = require('components/User/UserImage.js');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserStore,"onUserChange")],
    getInitialState: function(){
        return {users: UserStore.getUsers()};
    },
    onUserChange: function() {
        this.setState({users: UserStore.getUsers()});
    },
    getUserList: function() {
        return this.state.users.filter(function(user){
            return user.enabled == "1";
        }).map(function(user){
            return <UserImage key={user.id} user={user.id} />;
        });
    },
    handleClick: function(){
        MatchmakingActions.doMatchMaking([1,2,3,4]);
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Match Maker</h3>
                <div className="row">
                    <div className="col-md-4">
                        {this.getUserList()}
                    </div>
                    <button onClick={this.handleClick}>DOITFAGGOT</button>
                </div>
            </div>
        );
    }
});
