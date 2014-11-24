/** @jsx React.DOM */

var React = require('react');
var AlertIcon = require('./AlertIcon.js');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="row alertBar">
                <AlertIcon text="Plus de victoires" value={this.props.data} icon="mdi-action-thumb-up" type="success"></AlertIcon>
                <AlertIcon text="Plus de défaites" value={this.props.data} icon="mdi-action-thumb-down" type="danger"></AlertIcon>
                <AlertIcon text="Nombre de parties jouées" value={this.props.data} icon="mdi-action-account-child" type="info"></AlertIcon>
                <AlertIcon text="Dernier au classement" value={this.props.data} icon="mdi-action-trending-down" type="warning"></AlertIcon>
                <AlertIcon text="La passoire" value={this.props.data} icon="mdi-content-report" type="primary"></AlertIcon>
            </div>
        );
    }
});
