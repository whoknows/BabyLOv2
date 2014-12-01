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
            period: ""
        };
    },
    getHeader: function() {
        var mode = 'Ratio';
        if (this.props.mode == 'score') {
            mode = 'Score';
        }

        return this.header.concat([mode]);
    },
    getRow: function (rawRow, i) {
        var p = this.getPeriod();
        return <tr key={i}>
                    <td>
                        <UserImage user={rawRow}></UserImage>
                    </td>
                    <td className="text-success">{rawRow.gameData['won' + p]}</td>
                    <td className="text-danger">{rawRow.gameData['lost' + p]}</td>
                    <td><b>{this.getScore(rawRow.gameData)}</b></td>
                </tr>;
    },
    getScore: function (gameData) {
        var p = this.getPeriod();
        var total = gameData['won' + p] + gameData['lost' + p];
        var ratio = gameData['won' + p] / total;

        if (this.props.mode == 'score') {
            ratio = (ratio * this.poidsRatio) + ((total / gameData['total' + p]) * (1 - this.poidsRatio));
        }

        var score = Math.round(ratio*100)/100;

        return isNaN(score) ? 'N/A' : score;
    },
    getPeriod: function () {
        return this.props.period.toLowerCase() == 'thismonth' ? 'ThisMonth' : '';
    },
    render: function () {
        var rows = this.props.data.map(function(datum, i) {
            return this.getRow(datum, i);
        }.bind(this));

        var header = this.getHeader().map(function(headum, i){
            return <th key={i}>{headum}</th>;
        });

        return <Table hover>
                <thead><tr>{header}</tr></thead>
                <tbody>{rows}</tbody>
            </Table>;
    }
});
