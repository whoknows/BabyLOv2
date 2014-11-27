/** @jsx React.DOM */

var React = require('react');
var ScheduleBloc = require('./ScheduleBloc.js');

module.exports = React.createClass({
    generateBlocs: function () {
        return this.props.schedule.map(function(row){
            return <ScheduleBloc creneau={row.schedule} users={row.users} ></ScheduleBloc>;
        }.bind(this));
    },
    render: function () {
        return (
            <div className="row-fluid">
                todo
            </div>
        );
    }
});
