/** @jsx React.DOM */

var React = require('react');
var UserImage = require('components/User/UserImage.js');
var {Table} = require('react-bootstrap');

require('components/Table/Table.css');

module.exports = React.createClass({
    header: ['Joueur','Gagnées','Perdues'],
    poidsRatio: 0.65,
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
        return Array.prototype.slice.apply(this.props.data, this.props.slice ? [0, this.props.slice] : undefined)
        .filter(function(user){
            return user.enabled;
        }.bind(this)).sort(function(userA, userB){
            // FIXME Score should already be computed by store !!!
            return this.getScore(userA.gameData) < this.getScore(userB.gameData) ? 1 : -1;
        }.bind(this)).map(function(user){
            var p = this.getPeriod();
            return <tr key={user.id}>
                <td className="hasUserImage">
                    <UserImage user={user.id}></UserImage>
                </td>
                <td className="text-success">{user.gameData['won' + p]}</td>
                <td className="text-danger">{user.gameData['lost' + p]}</td>
                <td><b>{this.getScore(user.gameData)}</b></td>
            </tr>;
        }.bind(this));
    },
    getScore: function (gameData) {
        var p = this.getPeriod();
        var total = gameData['won' + p] + gameData['lost' + p];
        var ratio = gameData['won' + p] / total;

        if (this.props.mode == 'score') {
            ratio = (ratio * this.poidsRatio) + ((total / gameData['total' + p]) * (1 - this.poidsRatio));
        }

        var score = Math.round(ratio*100)/100;

        return isNaN(score) ? 0 : score;
    },

    render: function () {
        var header = this.getHeader().map(function(headum, i){
            return <th key={i}>{headum}</th>;
        });

        return <Table hover>
                <thead><tr>{header}</tr></thead>
                <tbody>{this.getRows()}</tbody>
            </Table>;
    }
});
