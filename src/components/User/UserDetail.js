/** @jsx React.DOM */

var React = require('react');
var UserDetailStore = require('stores/UserDetailStore.js');

require('components/User/UserImage.css');

module.exports = React.createClass({
    mixins:[
        Reflux.listenTo(UserDetailStore,"onUserDetailChange")
    ],
    getInitialState: function() {
        return {
            detail: UserDetailStore.getUserDetail()
        };
    },
    onUserDetailChange: function () {
        this.setState({
            detail: UserDetailStore.getUserDetail()
        });
    },
    render: function () {
        return (
            <h3>{this.state.detail.username}</h3>
        );
    }
});
