/** @jsx React.DOM */

var React = require('react');
var UserStore = require('stores/UserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');
var {Navigation} = require('react-router');

require('components/User/UserImage.css');

module.exports = React.createClass({
    mixins:[
        Navigation,
        Reflux.listenTo(UserStore,"onUserChange")
    ],
    getInitialState: function(){
        return {
            user: UserStore.getUserById(this.props.user)
        };
    },
    onUserChange: function() {
        this.setState({
            user: UserStore.getUserById(this.props.user)
        });
    },
    handleClick: function() {
        if (this.props.handleClick) {
            this.props.handleClick();
        } else if(!this.props.nolink) {
            this.transitionTo("users", {id:this.props.user});
        }
    },
    render: function () {
        if (!this.state.user || this.state.user === null) {
            return null;
        }

        return (
            <span {...this.props} className={"userImage " + this.props.className} onClick={this.handleClick} data-id={this.state.user.id}>
                <img src={this.state.user.gravatar} alt="gravatar" />{this.state.user.username}
            </span>
        );
    }
});
