/** @jsx React.DOM */

var React = require('react');
var c3 = require('c3');

require('c3/c3.css');

module.exports = React.createClass({
    componentDidMount: function() {
        c3.generate({
            bindto: '#gameChart',
            data: {
              columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
              ]
            }
        });
    },
    render: function () {
        return (
            <div id="gameChart"></div>
        );
    }
});
