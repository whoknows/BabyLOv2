/** @jsx React.DOM */

var React = require('react');
var c3 = require('c3');

require('c3/c3.css');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            data: {
                datas: [],
                labels: []
            }
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.data.datas.length !== 0;
    },
    componentDidUpdate: function() {
        c3.generate({
            bindto: '#gameChart',
            data: {
                x: 'x',
                columns: [
                    ['x'].concat(this.props.data.labels),
                    ['Parties'].concat(this.props.data.datas)
                ],
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
            }
        });
    },
    render: function () {
        return (
            <div id="gameChart"></div>
        );
    }
});
