/** @jsx React.DOM */

var Reflux = require('reflux');
var React = require('react');
var ColPanel = require('components/Home/ColPanel.js');

var UserStore = require('stores/UserStore.js');
var UserTable = require('components/Table/UserTable.js');
var UserDetail = require('./UserDetail.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore,"onUserChange")
    ],
    onUserChange: function() {
        this.setState({
            users: UserStore.getUsers()
        });
    },
    getInitialState: function() {
        return {
            users: UserStore.getUsers()
        };
    },
    getDetail: function (userId) {
        if(this.props.params.id){
            return <div className="col-md-12"><UserDetail user={this.props.params.id}></UserDetail></div>;
        }

        return <p><i>Cliquer sur un joueur pour afficher ses détails</i></p>;
    },
    render: function () {
        return <div>
                <div className="row">
                    <ColPanel col="4" icon="trophy" title="Classement par score">
                        <UserTable data={this.state.users} mode="score" period="thismonth"></UserTable>
                    </ColPanel>
                    <ColPanel col="4" icon="trophy" title="Classement par ratio">
                        <UserTable data={this.state.users} mode="ratio" period="thismonth"></UserTable>
                    </ColPanel>
                    <ColPanel col="4" icon="trophy" title="Classement par score (depuis toujours)">
                        <UserTable data={this.state.users} mode="score" period="all"></UserTable>
                    </ColPanel>
                </div>
                <div className="row">
                    {this.getDetail()}
                </div>
            </div>;
    }
});
