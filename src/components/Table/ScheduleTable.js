/** @jsx React.DOM */

var {Table} = require('react-bootstrap');
var ScheduleStore = require('stores/ScheduleStore.js');
var ScheduleItem = require('components/Schedule/ScheduleItem.js');

require('./ScheduleTable.css');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ScheduleStore,"onScheduleChange")
    ],
    onScheduleChange: function(){
        //TODO
    },
    prepareData: function(data) {
        var heure = ScheduleStore.getCurrentTime();
        var returnData = [];

        data.forEach(function(v,k){
            if(v.creneau >= heure){
                returnData.push(v);
            }
        });

        return returnData.slice(0, this.props.slice);
    },
    generateTable: function(data) {
        if (this.props.slice) {
            data = this.prepareData(data);
        }

        if (data.length === 0) {
            return <tr key="osef">
                <td colSpan={2}>Plus aucun créneau disponible.</td>
            </tr>;
        }

        return data.map(function(row, i){
            return <tr key={row.creneau}>
                <td>{row.creneau}</td>
                <td className="hasUserImage"><ScheduleItem users={row.users} creneau={row.creneau} isFull={row.isFull} /></td>
            </tr>;
        }.bind(this));
    },
    render: function () {
        return (
            <Table className="scheduleTable" responsive hover>
                <thead><tr><th>Créneau</th><th>Joueurs</th></tr></thead>
                <tbody>{this.generateTable(this.props.data)}</tbody>
            </Table>
        );
    }
});
