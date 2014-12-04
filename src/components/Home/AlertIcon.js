/** @jsx React.DOM */

var React = require('react');
var {Alert, OverlayTrigger, Tooltip} = require('react-bootstrap');

require('./AlertIcon.css');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            data:{
                desc:"",
                value: "N/A"
            }
        };
    },
    render: function () {
        return (
            <div className="col-md-2">
                <OverlayTrigger placement="top" overlay={<Tooltip><strong>{this.props.data.desc}</strong></Tooltip>}>
                    <Alert className={this.props.type}>
                        <div className="pull-left icon-container">
                            <i className={this.props.icon}></i>
                        </div>
                        <div className="text-container">
                            <div>
                                <strong>{this.props.data.value}</strong>
                            </div>
                            {this.props.text}
                        </div>
                    </Alert>
                </OverlayTrigger>
            </div>
        );
    }
});
