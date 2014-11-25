/** @jsx React.DOM */

var React = require('react');
var AlertIcon = require('./AlertIcon.js');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            data:{
                victory:{},
                defeat:{},
                games:{},
                last:{},
                worst:{}
            }
        };
    },
    render: function () {
        return (
            <div className="row alertBar">
                <AlertIcon text="Plus de victoires" data={this.props.data.victory} icon="mdi-action-thumb-up" type="success"></AlertIcon>
                <AlertIcon text="Plus de défaites" data={this.props.data.defeat} icon="mdi-action-thumb-down" type="danger"></AlertIcon>
                <AlertIcon text="Nombre de parties jouées" data={this.props.data.games} icon="mdi-action-account-child" type="info"></AlertIcon>
                <AlertIcon text="Dernier au classement" data={this.props.data.last} icon="mdi-action-trending-down" type="warning"></AlertIcon>
                <AlertIcon text="La passoire" data={this.props.data.worst} icon="mdi-content-report" type="primary"></AlertIcon>
            </div>
        );
    }
});
