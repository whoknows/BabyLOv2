/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Button, ListGroup, ListGroupItem} = require('react-bootstrap');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = React.createClass({
    userScheduled: false,
    setUserScheduled: function (us) {
        this.userScheduled = us;
    },
    getDefaultProps: function() {
        return { users: [], creneau: "" };
    },
    getUserList: function() {
        var currentUser = CurrentUserStore.getCurrentUser();

        return this.props.users.map(function(user){
            this.setUserScheduled(false);
            if(user.id == currentUser.id){
                this.setUserScheduled(true);
                return <UserImage schedule={this.props.creneau} user={user}></UserImage>;
            }

            return <UserImage user={user}></UserImage>;
        }.bind(this));
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
        if (this.props.vertical) {
            return <ListGroup>
                       {this.getUserList().map(function(user){
                           return <ListGroupItem>{user}</ListGroupItem>;
                       }), this.getButton()}
                   </ListGroup>;
        }
        return <div>{[this.getUserList(), this.getButton()]}</div>;
    }
});
