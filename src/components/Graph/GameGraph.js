/** @jsx React.DOM */

var React = require('react');
var c3 = require('c3');

require('c3/c3.css');
require('./Graph.css');

module.exports = React.createClass({
    currentGraph: null,
    generateGraph: function() {
        this.currentGraph = c3.generate({
            bindto: '#gameChart',
            data: {
                x: 'x',
                columns: [
                    ['x'].concat(this.props.data.labels),
                    ['Parties'].concat(this.props.data.datas)
                ],
                colors: {
                    Parties:'#1797be'
                },
                types: {
                    Parties: 'bar'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            },
            zoom: {
                enabled: true
            }
        });
    },
    getDefaultProps: function() {
        return {
            data: {
                datas: [],
                labels: []
            }
        };
    },
    componentDidMount: function() {
        this.generateGraph();
    },
    componentWillUnmount: function() {
        this.currentGraph.destroy();
    },
    render: function () {
        return (
            <div id="gameChart"></div>
        );
    }
});
