/** @jsx React.DOM */

var React = require('react');
var ScheduleBlock = require('./ScheduleBlock.js');

module.exports = React.createClass({
    generateBlocs: function () {
        return this.props.schedule.map(function(row){
            return <ScheduleBlock creneau={row.schedule} users={row.users} ></ScheduleBlock>;
        }.bind(this));
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Planification</h3>
                <div className="row-fluid">
                    todo
                </div>
            </div>
        );
    }
});
