/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var UserDetailList = require('./UserDetailList.js');
var UserGraph = require('components/Graph/UserGraph.js');
var {Panel, Nav, NavItem} = require('react-bootstrap');

require('./User.css');

module.exports = React.createClass({
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
    handleSelect: function(selected) {
        this.setState({period: selected});
    },
    getInitialState: function() {
        return {period: 'ThisMonth'};
    },
    render: function () {
        return <Panel ref="userdetail" className="userDetailPanel" header={[<i key="icon" className="fa fa-user"></i>, "Statistiques détaillées : ", <span key="info" className="text-info">{UserStore.getUserById(this.props.user).username}</span>]}>
                    <div className="row-fluid">
                        <div className="col-md-5">
                            <Nav bsStyle="pills" activeKey={this.state.period} onSelect={this.handleSelect}>
                                <NavItem eventKey="ThisMonth">Ce mois ci</NavItem>
                                <NavItem eventKey="LastMonth">Le mois dernier</NavItem>
                                <NavItem eventKey="">Depuis toujours</NavItem>
                            </Nav>
                            <UserDetailList period={this.state.period} user={this.props.user} />
                        </div>
                        <div className="col-md-7">
                            <UserGraph user={this.props.user} period={this.state.period} />
                        </div>
                    </div>
                </Panel>;
    }
});
