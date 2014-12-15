/** @jsx React.DOM */

var UsersGraphStore = require('stores/UsersGraphStore.js');
var UsersGraphAction = require('actions/UsersGraphAction.js');

require('js/highcharts.js');
require('./Graph.css');

module.exports = React.createClass({
    stdData: {victoires:[], defaites:[], ratio:[]},
    graphData: {},
    chart: false,
    mixins: [
        Reflux.listenTo(UsersGraphStore,"onUsersGraphChange")
    ],
    onUsersGraphChange: function() {
        this.generateChart();
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.user != this.props.user || this.props.period != nextProps.period){
            UsersGraphAction.loadData(nextProps.user);
        }
    },
    componentWillMount: function() {
        UsersGraphAction.loadData(this.props.user);
    },
    componentWillUnmount: function() {
        //$('#userChart').highcharts().destroy();
    },
    filterData: function(data) {
        if (data.length === 0) {
            return false;
        } else if (this.props.period === "") {
            return data;
        } else {
            var ret = JSON.parse(JSON.stringify(this.stdData));

            data.victoires.forEach(function(datum, i){
                if(this.getCondition(datum)){
                    ret.victoires.push(datum);
                    ret.defaites.push(data.defaites[i]);
                    ret.ratio.push(data.ratio[i]);
                }
            }.bind(this));

            return JSON.stringify(ret) === JSON.stringify(this.stdData) ? false : ret;
        }
    },
    getCondition: function(datum) {
        var date = new Date();
        var condition = true;

        if(this.props.period == "ThisMonth") {
            var utc = Date.UTC(date.getFullYear(), date.getMonth(), 1);
            condition = datum[0] >= utc;
        } else if(this.props.period == "LastMonth") {
            var start = Date.UTC(date.getFullYear(), date.getMonth() - 1, 1);
            var stop = Date.UTC(date.getFullYear(), date.getMonth(), 0);
            condition = datum[0] >= start && datum[0] <= stop;
        }
        return condition;
    },
    generateChart: function(){
        this.graphData = this.filterData(UsersGraphStore.getUsersGraph());

        if (this.graphData) {
            this.chart = true;
            $('#userChart').highcharts({
                chart: { zoomType: 'x' },
                credits: { enabled: false },
                title: { text: null },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%e. %b',
                        year: '%b'
                    },
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
                    name: 'Victoires',
                    color: '#F05050',
                    data: this.graphData.defaites,
                },{
                    type: 'line',
                    name: 'Score',
                    yAxis: 1,
                    data: this.graphData.ratio,
                }]
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
