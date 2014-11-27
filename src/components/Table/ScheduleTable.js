/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Panel, Table, Button} = require('react-bootstrap');
var ScheduleItem = require('components/Schedule/ScheduleItem.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');

require('./ScheduleTable.css');

module.exports = React.createClass({
    generateTable: function(data) {
        return data.map(function(row, i){
            return <tr key={i}>
                <td>{row.creneau}</td>
                <td><ScheduleItem users={row.users} creneau={row.creneau} /></td>
            </tr>;
        }.bind(this));
    },
    render: function () {
        return (
            <Panel header={[<i className="fa fa-calendar"></i>, this.props.title]}>
                <Table className="scheduleTable" hover>
                    <thead><tr><th>Créneau</th><th>Joueurs</th></tr></thead>
                    <tbody>{this.generateTable(this.props.data)}</tbody>
                </Table>
            </Panel>
        );
    }
});
