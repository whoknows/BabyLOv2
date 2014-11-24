/** @jsx React.DOM */

var React = require('react');
var {Alert} = require('react-bootstrap');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="col-md-2">
                <Alert bsStyle={this.props.type}>
                    {this.props.text} <strong>{this.props.value}</strong>
                </Alert>
            </div>
        );
    }
});
