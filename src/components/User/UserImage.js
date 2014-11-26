/** @jsx React.DOM */

var React = require('react');
var ScheduleAction = require('actions/ScheduleAction.js');
var {Navigation} = require('react-router');

require('components/User/UserImage.css');

module.exports = React.createClass({
    mixins:[
        Navigation
    ],
    handleClick: function() {
        if (this.props.schedule) {
            ScheduleAction.unparticipate(this.props.schedule);
        } else {
            this.transitionTo("users", {id:this.props.user.id});
        }
    },
    render: function () {
        return (
            <span className={"userImage pteam1" + (this.props.schedule ? " removable" : "")} onClick={this.handleClick} data-id={this.props.user.id}>
                <img src={this.props.user.gravatar} alt="gravatar" />{this.props.user.username}
            </span>
        );
    }
});
