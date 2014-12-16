/** @jsx React.DOM */

require('js/highcharts.js');
require('./Graph.css');

module.exports = React.createClass({
    currentGraph: null,
    generateGraph: function() {
        Highcharts.setOptions({global:{ useUTC: false }});
        $('#gameChart').highcharts({
            chart: { zoomType: 'x' },
            credits: { enabled: false },
            title: { text: null },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },
                title: {text: null}
            },
            yAxis: {
                title: {text: null}
            },
            legend: { enabled: false },
            plotOptions: {
                area: {
                    marker: { radius: 2 },
                    lineWidth: 1,
                    states: {
                        hover: { lineWidth: 1 }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Parties jouées',
                data: this.props.data
            }]
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
        //this.currentGraph.destroy();
    },
    render: function () {
        return (
            <div id="gameChart" className="homeChart"></div>
        );
    }
});
