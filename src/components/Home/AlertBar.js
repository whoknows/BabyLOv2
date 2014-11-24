/** @jsx React.DOM */

var React = require('react');
var AlertIcon = require('./AlertIcon.js');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="row alertBar">
                <AlertIcon text="Plus de victoires" value={this.props.data} type="success"></AlertIcon>
            </div>
        );
    }
});
