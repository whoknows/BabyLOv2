/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var {DropdownButton, MenuItem, Input} = require('react-bootstrap');
var UserImage = require('components/User/UserImage.js');

require('./Select.css');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore, 'onUserChange')
    ],
    onUserChange: function(){
        this.setState({users: this.getUserList()});
    },
    getUserList: function(){
        return UserStore.getUsers().filter(function(user){
                return user.enabled;
        }.bind(this));
    },
    getDefaultProps: function() {
        return {
            placeholder: "Select",
        };
    },
    getInitialState: function(){
        return {
            users: this.getUserList(),
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
    getValue: function(){
        return this.state.selectedUserId;
    },
    render: function () {
        var menuItems = this.state.users.filter(function(user){
            return user.username.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1;
        }.bind(this)).map(function(user){
            return (
                <MenuItem onSelect={this.handleSelect} eventKey={user.id} key={user.id}>
                    <UserImage nolink user={user.id} />
                </MenuItem>
            );
        }.bind(this));

        var title, classe;
        if (this.state.selectedUserId) {
            classe = "hasUserImage";
            title = <UserImage nolink user={this.state.selectedUserId} />;
        } else {
            title = this.props.placeholder;
        }

        return (
            <div className="select-wrapper">
                <DropdownButton className={classe} title={title}>
                    <MenuItem>
                        <Input ref="filter" type="text" placeholder="Nom du joueur" value={this.state.filter} onClick={function(e){e.stopPropagation();}} onChange={this.handleFilterChange} />
                    </MenuItem>
                    {menuItems}
                </DropdownButton>
            </div>
        );
    }
});
