/** @jsx React.DOM */

var React = require('react');
var {Alert} = require('react-bootstrap');

require('./AlertIcon.css');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="col-md-2">
                <Alert bsStyle={this.props.type}>
                    <div className="pull-left icon-container">
                        <i className={this.props.icon}></i>
                    </div>
                    <div className="text-container">
                        <div>
                            <strong>{this.props.value}</strong>
                        </div>
                        {this.props.text}
                    </div>
                </Alert>
            </div>
        );
    }
});
