/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Button} = require('react-bootstrap');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = React.createClass({
    userScheduled: false,
    getDefaultProps: function() {
        return { users: [], creneau: "" };
    },
    getUserList: function() {
        var currentUser = CurrentUserStore.getCurrentUser();

        return this.props.users.map(function(user){
            if(user.id == currentUser.id){
                this.userScheduled = true;
                return <UserImage schedule={this.props.creneau} user={user}></UserImage>;
            }

            return <UserImage user={user}></UserImage>;
        });
    },
    getButton: function () {
        if(!this.userScheduled){
            return <Button data-schedule={this.props.creneau} onClick={this.clickHandler} bsStyle="success">GO</Button>;
        }
    },
    clickHandler: function (e) {
        ScheduleAction.participate(e.target.dataset.schedule);
    },
    render: function () {
        return (
            <div>
                {this.getUserList()}
                {this.getButton()}
            </div>
        );
    }
});
