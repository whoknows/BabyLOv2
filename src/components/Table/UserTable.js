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
    getRow: function (rawRow, i) {
        var p = this.getPeriod();
        return <tr key={rawRow.id}>
                    <td>
                        <UserImage user={rawRow.id}></UserImage>
                    </td>
                    <td className="text-success">{rawRow.gameData['won' + p]}</td>
                    <td className="text-danger">{rawRow.gameData['lost' + p]}</td>
                    <td><b>{rawRow.score}</b></td>
                </tr>;
    },
    getDisplayData: function() {
        this.prepareArray();
        this.sortArray();

        var data = this.props.data;

        if(this.props.slice){
            data = this.props.data.slice(0, this.props.slice);
        }

        return data.map(function(datum, i) {
            return this.getRow(datum, i);
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
    prepareArray: function() {
        var tmp = [];
        this.props.data.map(function(datum){
            if(datum.enabled == 1){
                datum.score = this.getScore(datum.gameData);
                tmp.push(datum);
            }
        }.bind(this));

        this.props.data = tmp;
    },
    sortArray: function() {
        this.props.data.sort(function(a, b){
            return a.score < b.score ? 1 : -1;
        });
    },
    render: function () {
        var header = this.getHeader().map(function(headum, i){
            return <th key={i}>{headum}</th>;
        });

        return <Table hover>
                <thead><tr>{header}</tr></thead>
                <tbody>{this.getDisplayData()}</tbody>
            </Table>;
    }
});
