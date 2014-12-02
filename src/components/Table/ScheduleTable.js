/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Table} = require('react-bootstrap');
var ScheduleItem = require('components/Schedule/ScheduleItem.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');

require('./ScheduleTable.css');

module.exports = React.createClass({
    prepareData: function(data) {
        var heure = (new Date()).getHours() + 'h' + (new Date()).getMinutes();
        var returnData = [];

        data.forEach(function(v,k){
            if(v.creneau >= heure){
                returnData.push(v);
            }
        });

        return data.slice(0, this.props.slice);
    },
    generateTable: function(data) {
        if (this.props.slice) {
            data = this.prepareData(data);
        }

        return data.map(function(row, i){
            return <tr key={i}>
                <td>{row.creneau}</td>
                <td><ScheduleItem users={row.users} creneau={row.creneau} isFull={row.isFull} /></td>
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
