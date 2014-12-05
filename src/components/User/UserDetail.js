/** @jsx React.DOM */

var UserDetailStore = require('stores/UserDetailStore.js');
var UserGraph = require('components/Graph/UserGraph.js');
var ItemBadge = require('./ItemBadge.js');
var {Panel, ListGroup, Nav, NavItem} = require('react-bootstrap');

require('./User.css');

module.exports = React.createClass({
    mixins:[
        Reflux.listenTo(UserDetailStore,"onUserDetailChange")
    ],
    handleSelect: function(selected) {
        this.setState({panel: selected});
    },
    getInitialState: function() {
        return {
            detail: UserDetailStore.getUserDetail(),
            panel: 'ThisMonth'
        };
    },
    onUserDetailChange: function () {
        this.setState({
            detail: UserDetailStore.getUserDetail()
        });
    },
    render: function () {
        return <Panel className="userDetailPanel" header={[<i key="icon" className="fa fa-user"></i>, "Statistiques détaillées : ", <span key="info" className="text-info">{this.state.detail.username}</span>]}>
                    <div className="row-fluid">
                        <div className="col-md-5">
                            <Nav bsStyle="pills" activeKey={this.state.panel} onSelect={this.handleSelect}>
                                <NavItem eventKey="ThisMonth">Ce mois ci</NavItem>
                                <NavItem eventKey="LastMonth">Le mois dernier</NavItem>
                                <NavItem eventKey="">Depuis toujours</NavItem>
                            </Nav>
                            <ListGroup>
                                {this.state.detail.userDetail && this.state.detail.userDetail.map(function(item,i){
                                    return <ItemBadge key={i} value={item.value} text={item.text} />;
                                })}
                            </ListGroup>
                        </div>
                        <div className="col-md-7">
                            <UserGraph />
                        </div>
                    </div>
                </Panel>;
    }
});
