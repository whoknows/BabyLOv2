/** @jsx React.DOM */

require('js/highcharts.js');
require('./Graph.css');

module.exports = React.createClass({
    componentDidMount: function() {
        $('#userChart').highcharts({
            chart: { zoomType: 'x' },
            credits: { enabled: false },
            title: { text: null },
            xAxis: {
                /*type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },*/
                title: {text: null},
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: [{
                title: {text: null},
            },{
                title: {text: null},
                opposite: true
            }],
            legend: { enabled: false },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                type: 'column',
                name: 'Victoires',
                color: '#F05050',
                data: [3, 2, 1, 4, 1],
            },{
                type: 'column',
                name: 'Victoires',
                color: '#27C24C',
                data: [5, 1, 6, 1, 4],
            },{
                type: 'line',
                name: 'Ratio',
                yAxis: 1,
                data: [0.8, 0.4, 0.1, 0.4, 0.7],
            }]
        });
    },
    render: function () {
        return (
            <div id="userChart" className="homeChart"></div>
        );
    }
});
