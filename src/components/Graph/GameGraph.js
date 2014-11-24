/** @jsx React.DOM */

var React = require('react');
var c3 = require('c3');

require('c3/c3.css');

module.exports = React.createClass({
    componentDidMount: function() {
        c3.generate({
            bindto: '#gameChart',
            data: {
                x: 'x',
                columns: [
                    ['x', '2014-01-12', '2014-01-13', '2014-01-14', '2014-01-15', '2014-01-16', '2014-01-17'],
                    ['data1', 30, 200, 100, 400, 150, 250]
                ],
                types: {
                    data1: 'bar'
                }
            },
            axis: {
                x: {
                    //show:false,
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            }
        });
    },
    render: function () {
        return (
            <div id="gameChart"></div>
        );
    }
});
