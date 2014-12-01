/** @jsx React.DOM */

var React = require('react');
var UserStore = require('stores/UserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');
var {Navigation} = require('react-router');

require('components/User/UserImage.css');

module.exports = React.createClass({
    mixins:[
        Navigation
    ],
    handleClick: function() {
        if (this.props.schedule) {
            ScheduleAction.unparticipate(this.props.schedule, this.props.user);
        } else {
            this.transitionTo("users", {id:this.props.user});
        }
    },
    render: function () {
        var user = UserStore.getUserById(this.props.user);

        return (
            <span className={"userImage pteam1" + (this.props.schedule ? " removable" : "")} onClick={this.handleClick} data-id={user.id}>
                <img src={user.gravatar} alt="gravatar" />{user.username}
            </span>
        );
    }
});
