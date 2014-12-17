/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var UserDetailList = require('./UserDetailList.js');
var UserGraph = require('components/Graph/UserGraph.js');
var {Panel, Nav, NavItem} = require('react-bootstrap');

require('./User.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {period: 'ThisMonth', cumule: true};
    },
    componentDidMount: function () {
        this.scroll();
    },
    componentWillReceiveProps: function(newprops){
        this.scroll();
    },
    scroll: function() {
        setTimeout(function(){
            this.refs.userdetail.getDOMNode().scrollIntoView();
        }.bind(this), 0);
    },
    handlePeriod: function(selected) {
        if(this.state.period != selected){
            this.setState({period: selected});
        }
    },
    handleCumule: function(selected) {
        if(this.state.cumule != selected){
            this.setState({cumule: selected});
        }
    },
    render: function () {
        return <Panel ref="userdetail" className="userDetailPanel" header={[<i key="icon" className="fa fa-user"></i>, "Statistiques détaillées : ", <span key="info" className="text-info">{UserStore.getUserById(this.props.user).username}</span>]}>
                    <div className="row-fluid">
                        <div className="col-md-5">
                            <Nav bsStyle="pills" activeKey={this.state.period} onSelect={this.handlePeriod}>
                                <NavItem eventKey="ThisMonth">Ce mois ci</NavItem>
                                <NavItem eventKey="LastMonth">Le mois dernier</NavItem>
                                <NavItem eventKey="">Depuis toujours</NavItem>
                            </Nav>
                            <UserDetailList period={this.state.period} user={this.props.user} />
                        </div>
                        <div className="col-md-7">
                            <Nav bsStyle="pills" activeKey={this.state.cumule} onSelect={this.handleCumule}>
                                <NavItem eventKey={true}>Cumulé</NavItem>
                                <NavItem eventKey={false}>Non cumulé</NavItem>
                            </Nav>
                            <UserGraph user={this.props.user} period={this.state.period} cumule={this.state.cumule} />
                        </div>
                    </div>
                </Panel>;
    }
});
