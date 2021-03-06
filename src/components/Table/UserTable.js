/** @jsx React.DOM */

var React = require('react');
var UserImage = require('components/User/UserImage.js');
var {Table} = require('react-bootstrap');
var CurrentUserStore = require('stores/CurrentUserStore.js');

require('components/Table/Table.css');

module.exports = React.createClass({
    header: ['Joueur','Gagnées','Perdues'],
    getDefaultProps: function() {
        return {
            data: [],
            mode: "",
            period: "",
            slice: false
        };
    },
    getPeriod: function () {
        return this.props.period.toLowerCase() == 'thismonth' ? 'ThisMonth' : '';
    },
    getHeader: function() {
        var mode = 'Ratio';
        if (this.props.mode == 'score') {
            mode = 'Score';
        }

        return this.header.concat([mode]);
    },
    getRows: function() {
        var data = this.props.data.filter(function(user){
            return user.enabled == "1" || user.id == CurrentUserStore.getCurrentUser().id;
        }.bind(this)).sort(function(userA, userB){
            var p = this.getPeriod();
            return userA.gameData[this.props.mode + p] < userB.gameData[this.props.mode + p] ? 1 : -1;
        }.bind(this));

        return Array.prototype.slice.apply(data, this.props.slice ? [0, this.props.slice] : undefined).map(function(user){
            var p = this.getPeriod();
            return <tr key={user.id}>
                <td className="hasUserImage">
                    <UserImage user={user.id}></UserImage>
                </td>
                <td className="text-success">{user.gameData['won' + p]}</td>
                <td className="text-danger">{user.gameData['lost' + p]}</td>
                <td><b>{user.gameData[this.props.mode + p]}</b></td>
            </tr>;
        }.bind(this));
    },
    render: function () {
        var header = this.getHeader().map(function(headum, i){
            return <th key={i}>{headum}</th>;
        });

        return <Table responsive hover>
                <thead><tr>{header}</tr></thead>
                <tbody>{this.getRows()}</tbody>
            </Table>;
    }
});
