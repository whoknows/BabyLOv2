/** @jsx React.DOM */

var {Table} = require('react-bootstrap');
var ScheduleItem = require('components/Schedule/ScheduleItem.js');

require('./ScheduleTable.css');

module.exports = React.createClass({
    prepareData: function(data) {
        var h = (new Date()).getHours();
        var heure = (h<10?'0'+h:h) + 'h' + (new Date()).getMinutes();
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

        return data.map(function(row, i){
            return <tr key={row.creneau}>
                <td>{row.creneau}</td>
                <td className="hasUserImage"><ScheduleItem users={row.users} creneau={row.creneau} isFull={row.isFull} /></td>
            </tr>;
        }.bind(this));
    },
    render: function () {
        return (
            <Table className="scheduleTable" hover>
                <thead><tr><th>Créneau</th><th>Joueurs</th></tr></thead>
                <tbody>{this.generateTable(this.props.data)}</tbody>
            </Table>
        );
    }
});
