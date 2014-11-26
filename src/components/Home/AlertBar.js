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
                <AlertIcon text="Plus de victoires" data={this.props.data.victory} icon="fa fa-thumbs-up" type="bg-success-light"></AlertIcon>
                <AlertIcon text="Plus de défaites" data={this.props.data.defeat} icon="fa fa-thumbs-down" type="bg-primary-light"></AlertIcon>
                <AlertIcon text="Parties jouées" data={this.props.data.games} icon="fa fa-users" type="blue-grey"></AlertIcon>
                <AlertIcon text="Dernier au classement" data={this.props.data.last} icon="fa fa-trophy" type="bg-warning-light"></AlertIcon>
                <AlertIcon text="La passoire" data={this.props.data.worst} icon="fa fa-life-ring" type="bg-green-light"></AlertIcon>
                <AlertIcon text="Suceurs de cannes" data={this.props.data.fanny} icon="fa fa-frown-o" type="bg-pink-light"></AlertIcon>
            </div>
        );
    }
});
