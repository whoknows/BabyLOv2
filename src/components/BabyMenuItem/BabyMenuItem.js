/** @jsx React.DOM */

var React = require('react');
var NavItemLink = require('components/App/NavItemLink.js');

module.exports = React.createClass({
    render: function () {
        return (
            <NavItemLink to={this.props.dest}><i className={this.props.icon}></i>{this.props.label}</NavItemLink>
        );
    }
});
