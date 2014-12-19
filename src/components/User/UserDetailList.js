/** @jsx React.DOM */

var UserDetailStore = require('stores/UserDetailStore.js');
var UserDetailAction = require('actions/UserDetailAction.js');
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
        UserDetailAction.loadData(nextProps.user);
    },
    componentWillMount: function() {
        UserDetailAction.loadData(this.props.user);
    },
    onUserDetailChange: function () {
        this.setState({
            detail: UserDetailStore.getUserDetail()
        });
    },
    getItems: function(){
        var ret = [];
        if(this.state.detail.length !== 0){
            for(var i in this.state.detail.userDetail){
                var item = this.state.detail.userDetail[i];
                ret.push(<ItemBadge key={i} value={item.value} text={item.text} />);
            }
        }

        return ret;
    },
    render: function () {
        return <ListGroup>{this.getItems()}</ListGroup>;
    }
});
