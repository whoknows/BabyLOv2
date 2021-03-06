/** @jsx React.DOM */

var React = require('react');
var ScheduleStore = require('stores/ScheduleStore.js');
var ScheduleBlock = require('./ScheduleBlock.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ScheduleStore,"onScheduleChange")
    ],
    onScheduleChange: function() {
        this.setState({
            schedule: ScheduleStore.getSchedule()
        });
    },
    getInitialState: function() {
        return {
            schedule: ScheduleStore.getSchedule()
        };
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Planification</h3>
                <div className="row-fluid">
                    {this.state.schedule.map(function(row,i){
                        return <ScheduleBlock key={i} creneau={row.creneau} users={row.users} isFull={row.isFull} />;
                    })}
                </div>
            </div>
        );
    }
});
