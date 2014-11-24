/** @jsx React.DOM */

var React = require('react');
var UserImage = require('components/User/UserImage.js');
var {Panel, Table} = require('react-bootstrap');

require('components/Table/Table.css');

module.exports = React.createClass({
    header: ['Joueur','Gagnées','Perdues'],
    poidsRatio: 0.65,
    getHeader: function() {
        var mode = 'Ratio';
        if (this.props.mode == 'score') {
            mode = 'Score';
        }

        return this.header.concat([mode]);
    },
    getRow: function (rawRow) {
        var p = this.getPeriod();
        return <tr key={rawRow.id}>
                    <td>
                        <UserImage user={rawRow}></UserImage>
                    </td>
                    <td className="success">{rawRow.gameData['won' + p]}</td>
                    <td className="danger">{rawRow.gameData['lost' + p]}</td>
                    <td><b>{this.getScore(rawRow.gameData)}</b></td>
                </tr>;
    },
    getScore: function (gameData) {
        var p = this.getPeriod();
        var total = gameData['won' + p] + gameData['lost' + p];
        var ratio = gameData['won' + p] / total;

        if (this.props.mode == 'score') {
            ratio = (ratio * this.poidsRatio) + ((total / gameData['total' + p]) * (1 - this.poidsRatio))
        }

        return Math.round(ratio*100)/100;
    },
    getPeriod: function () {
        return this.props.period.toLowerCase() == 'thismonth' ? 'ThisMonth' : '';
    },
    render: function () {
        var rows = this.props.data.map(function(datum) {
            return this.getRow(datum);
        }.bind(this));

        var header = this.getHeader().map(function(headum, i){
            return <th key={i}>{headum}</th>
        });

        return (
            <div>
                <Panel header={this.props.title}>
                    <Table bordered>
                        <thead><tr>{header}</tr></thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Panel>
            </div>
        );
    }
});