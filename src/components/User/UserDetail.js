/** @jsx React.DOM */

var UserDetailStore = require('stores/UserDetailStore.js');
var UserGraph = require('components/Graph/UserGraph.js');
var ItemBadge = require('./ItemBadge.js');
var {Panel, ListGroup, Nav, NavItem, Label} = require('react-bootstrap');

require('./User.css');

module.exports = React.createClass({
    mixins:[
        Reflux.listenTo(UserDetailStore,"onUserDetailChange")
    ],
    handleSelect: function(selected) {
        console.log("lol " + selected);
    },
    getInitialState: function() {
        return {
            detail: UserDetailStore.getUserDetail()
        };
    },
    onUserDetailChange: function () {
        this.setState({
            detail: UserDetailStore.getUserDetail()
        });
    },
    render: function () {
        return <Panel className="userDetailPanel" header={[<i className="fa fa-user"></i>, "Statistiques détaillées : ", <span className="text-info">{this.state.detail.username}</span>]}>
                    <div className="row-fluid">
                        <div className="col-md-5">
                            <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
                                <NavItem eventKey={1}>Ce mois ci</NavItem>
                                <NavItem eventKey={2}>Depuis toujours</NavItem>
                            </Nav>
                            <ListGroup>
                                {this.state.detail.userDetail && this.state.detail.userDetail.map(function(item){
                                    return <ItemBadge value={item.value} text={item.text} />;
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
