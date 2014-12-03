/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var {DropdownButton, MenuItem, Input} = require('react-bootstrap');
var UserImage = require('components/User/UserImage.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore, "onUserChange")
    ],
    onUserChange: function(){
        this.setState({
            users: UserStore.getUsers().filter(function(user){
                return user.enabled;
            }.bind(this))
        });
    },
    getDefaultProps: function() {
        return {
            placeholder: "Select",
        };
    },
    getInitialState: function(){
        return {
            users: [],
            filter: ''
        };
    },
    handleSelect: function(userId) {
        this.setState({
            selectedUserId: userId
        });
    },
    handleFilterChange: function(){
        this.setState({
            filter: this.refs.filter.getValue()
        });
    },
    render: function () {
        var menuItems = this.state.users.filter(function(user){
            return user.username.indexOf(this.state.filter) > -1;
        }.bind(this)).map(function(user){
            return (
                <MenuItem onSelect={this.handleSelect} eventKey={user.id} key={user.id}>
                    <UserImage nolink user={user.id} />
                </MenuItem>
            );            
        }.bind(this));

        var title;
        if(this.state.selectedUserId){
            title = UserStore.getUserById(this.state.selectedUserId).username;
        }else{
            title = this.props.placeholder
        }

        return (
            <DropdownButton title={title}>
                <MenuItem>
                    <Input ref="filter" type="search" placeholder="Filter" value={this.state.filter} onChange={this.handleFilterChange} />
                </MenuItem>
                {menuItems}
            </DropdownButton>
        );
    }
});
