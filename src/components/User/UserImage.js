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
    getDefaultProps: function() {
        return {className:''};
    },
    handleClick: function() {
        if (this.props.handleClick) {
            this.props.handleClick();
        } else if(!this.props.nolink) {
            this.transitionTo("users", {id:this.props.user});
        }
    },
    render: function () {
        var user = UserStore.getUserById(this.props.user);

        if (user === null) {
            return null;
        }

        return (
            <span className={"userImage " + this.props.className} onClick={this.handleClick} data-id={user.id}>
                <img src={user.gravatar} alt="gravatar" />{user.username}
            </span>
        );
    }
});
