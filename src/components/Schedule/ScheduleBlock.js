/** @jsx React.DOM */

var React = require('react');
var ScheduleItem = require('./ScheduleItem.js');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="col-md-4">
                <div className="scheduleBlock-title">
                    <h3>{this.props.creneau}</h3>
                </div>
                <div className="scheduleBlock-content">
                    <ScheduleItem users={this.props.users} creneau={this.props.creneau} vertical />
                </div>
            </div>
        );
    }
});
