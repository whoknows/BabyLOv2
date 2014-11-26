/** @jsx React.DOM */

var React = require('react');

require('components/User/UserImage.css');

module.exports = React.createClass({
    render: function () {
        return (
            <span className="userImage pteam1" data-id={this.props.user.id}>
                <img src={this.props.user.gravatar} alt="gravatar" />{this.props.user.username}
            </span>
        );
    }
});
