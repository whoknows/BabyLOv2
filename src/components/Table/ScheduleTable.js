/** @jsx React.DOM */

var React = require('react');
var UserImage = require('components/User/UserImage.js');
var {Panel, Table} = require('react-bootstrap');

module.exports = React.createClass({
    componentDidMount: function() {
        //
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.data.length != 0;
    },
    generateTable: function(data) {
        return data.map(function(row, i){
            var users = row.users.map(function(user){
                return <UserImage user={user}></UserImage>
            });
            return <tr key={i}>
                <td>{row.creneau}</td>
                <td>{users}</td>
            </tr>;
        });
    },
    render: function () {
        return (
            <Panel header={this.props.title}>
                <Table bordered>
                    <thead><tr><th>Créneau</th><th>Joueurs</th></tr></thead>
                    <tbody>{this.generateTable(this.props.data)}</tbody>
                </Table>
            </Panel>
        );
    }
});
