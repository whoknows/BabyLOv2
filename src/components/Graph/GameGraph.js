/** @jsx React.DOM */

var {Navigation} = require('react-router');

require('js/highcharts.js');
require('./Graph.css');

module.exports = React.createClass({
    mixins:[Navigation],
    currentGraph: null,
    generateGraph: function() {
        Highcharts.setOptions({global:{ useUTC: false }});
        $('#gameChart').highcharts({
            chart: {zoomType: 'x'},
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
                cursor: 'pointer',
                type: 'area',
                name: 'Parties jouées',
                data: this.props.data,
                point: {
                    events: {
                        click: function(point){
                            this.transitionTo("games", {date: Highcharts.dateFormat('%Y-%m-%d', point.currentTarget.x)});
                        }.bind(this)
                    }
                }
            }],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                shared: true
            },
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
