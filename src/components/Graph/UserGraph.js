/** @jsx React.DOM */

var UsersGraphStore = require('stores/UsersGraphStore.js');

require('js/highcharts.js');
require('./Graph.css');

module.exports = React.createClass({
    stdData: {victoires:[], defaites:[], ratio:[]},
    graphData: {},
    mixins: [
        Reflux.listenTo(UsersGraphStore,"onUsersGraphChange")
    ],
    onUsersGraphChange: function() {
        this.generateChart();
    },
    componentWillReceiveProps: function(nextProps) {
        UsersGraphStore.loadData(nextProps.user);
    },
    componentWillMount: function() {
        UsersGraphStore.loadData(this.props.user);
    },
    componentDidMount: function() {
        this.generateChart();
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
            var utc = Date.UTC(date.getFullYear(), date.getMonth() + 1, 1);
            condition = datum[0] >= utc;
        } else if(this.props.period == "LastMonth") {
            var start = Date.UTC(date.getFullYear(), date.getMonth(), 1);
            var stop = Date.UTC(date.getFullYear(), date.getMonth() + 1, 0);
            condition = datum[0] >= start && datum[0] <= stop;
        }

        return condition;
    },
    generateChart: function(){
        this.graphData = this.filterData(UsersGraphStore.getUsersGraph());

        if (this.graphData) {
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
                    color: '#27C24C',
                    data: this.graphData.victoires,
                },{
                    type: 'column',
                    name: 'Victoires',
                    color: '#F05050',
                    data: this.graphData.defaites,
                },{
                    type: 'line',
                    name: 'Ratio',
                    yAxis: 1,
                    data: this.graphData.ratio,
                }]
            });
        }
    },
    render: function () {
        return (
            <div id="userChart" className="homeChart">
                <div className="row-fluid">
                    <div className="col-md-12">
                        <i>Aucune donnée à afficher, il faut jouer plus !</i>
                    </div>
                </div>
            </div>
        );
    }
});
