/** @jsx React.DOM */

var UserDetailStore = require('stores/UserDetailStore.js');
var ItemBadge = require('./ItemBadge.js');
var {Panel, ListGroup, Nav, NavItem} = require('react-bootstrap');

require('./User.css');

module.exports = React.createClass({
    mixins:[
        Reflux.listenTo(UserDetailStore,"onUserDetailChange")
    ],
    getInitialState: function() {
        return {
            detail: UserDetailStore.getUserDetail(),
        };
    },
    componentWillReceiveProps: function(nextProps) {
        UserDetailStore.loadData(nextProps.user);
    },
    componentWillMount: function() {
        UserDetailStore.loadData(this.props.user);
    },
    onUserDetailChange: function () {
        this.setState({
            detail: UserDetailStore.getUserDetail()
        });
    },
    render: function () {
        return <ListGroup>
                {this.state.detail.userDetail && this.state.detail.userDetail.map(function(item,i){
                    return <ItemBadge key={i} value={item.value} text={item.text} />;
                })}
            </ListGroup>;
    }
});
