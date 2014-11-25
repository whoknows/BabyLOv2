/** @jsx React.DOM */

var React = require('react');
var c3 = require('c3');

require('c3/c3.css');
require('./Graph.css');

module.exports = React.createClass({
    componentDidMount: function() {
        c3.generate({
            bindto: '#userChart',
            data: {
                columns: [
                    ['Victoires', 3, 2, 1, 4, 1, 2],
                    ['Defaites', 5, 2, 1, 4, 1, 2],
                    ['Ratio', 1, 0.8, 0.4, 0.45, 0.68, 0.84]
                ],
                colors: {
                    Victoires: '#8bc24a',
                    Defaites: '#f6413a',
                    Ratio: '#009788'
                },
                axes: {
                    Ratio: 'y2'
                },
                types: {
                    Victoires:'bar',
                    Defaites:'bar'
                },
                groups: [
                    ['Victoires', 'Defaites']
                ]
            },
            axis: {
                y2: {
                    show: true
                },
                x: {
                    tick: {
                        format: function(x){ return ''; }
                    }
                }
            }
        });
    },
    render: function () {
        return (
            <div id="userChart"></div>
        );
    }
});
