/** @jsx React.DOM */

var Reflux = require('reflux');
var React = require('react');
var Table = require('components/Table/Table.js');
var UserStore = require('stores/UserStore.js');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserStore,"onUserChange")],
    getInitialState: function() {
        return {
            users: []
        };
    },
    onUserChange: function() {
        this.setState({
            users: UserStore.getUsers()
        });
    },
    render: function () {
        return (
            <div>
                <h1>osef</h1>
                <Table data={this.state.users}></Table>
            </div>
        );
    }
});
