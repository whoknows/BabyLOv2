/** @jsx React.DOM */

var React = require('react');
var ScheduleItem = require('./ScheduleItem.js');

require('./Schedule.css');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="col-md-4 scheduleBlock">
                <div className="scheduleBlock-title">
                    <h3>{this.props.creneau}</h3>
                </div>
                <div className="scheduleBlock-content">
                    <ScheduleItem users={this.props.users} creneau={this.props.creneau} isFull={this.props.isFull} vertical />
                </div>
            </div>
        );
    }
});
