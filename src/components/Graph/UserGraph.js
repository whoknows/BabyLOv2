/** @jsx React.DOM */

var UsersGraphStore = require('stores/UsersGraphStore.js');
var UsersGraphAction = require('actions/UsersGraphAction.js');

require('js/highcharts.js');
require('./Graph.css');

module.exports = React.createClass({
    graphData: {},
    chart: false,
    mixins: [
        Reflux.listenTo(UsersGraphStore,"generateChart")
    ],
    getDefaultProps: function(){
        return {
            period: "ThisMonth",
            cumule: true
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.user != this.props.user || this.props.period != nextProps.period || this.props.cumule != nextProps.cumule){
            UsersGraphAction.loadData(nextProps.user);
        }
    },
    componentWillMount: function() {
        UsersGraphAction.loadData(this.props.user);
    },
    generateChart: function(){
        this.graphData = UsersGraphStore.getFilteredData(this.props.period, this.props.cumule);

        if (this.graphData) {
            this.chart = true;
            $('#userChart').highcharts({
                chart: { zoomType: 'x' },
                credits: { enabled: false },
                title: { text: null },
                xAxis: {
                    categories: this.graphData.dates,
                    title: {text: null},
                },
                yAxis: [
                    { min: 0, title: {text: 'Parties jouées'}},
                    { min: 0, max: 1, title: {text: 'Score'}, opposite: true }
                ],
                legend: { enabled: false },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    type: 'column',
                    name: 'Victoires',
                    color: '#27C24C',
                    data: this.graphData.victoires,
                },{
                    type: 'column',
                    name: 'Défaites',
                    color: '#F05050',
                    data: this.graphData.defaites,
                },{
                    type: 'spline',
                    name: 'Score',
                    yAxis: 1,
                    data: this.graphData.ratio,
                }],
                tooltip: { shared: true }
            });
        } else {
            if(this.chart){
                $('#userChart').highcharts().destroy();
                this.chart = false;
            }
        }
    },
    render: function () {
        return (<div id="userChart" className="homeChart"><div className="row-fluid">
                    <div className="col-md-12">
                        <i>Aucune donnée à afficher, il faut jouer plus !</i>
                    </div>
                </div>
            </div>);
    }
});
