/** @jsx React.DOM */

var Reflux = require('reflux');
var React = require('react');
var {Panel} = require('react-bootstrap');

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

        return null;
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-md-4">
                    <Panel header={[<i className="fa fa-trophy"></i>, "Classement par score"]}>
                        <UserTable data={this.state.users} mode="score" period="thismonth"></UserTable>
                    </Panel>
                </div>
                <div className="col-md-4">
                    <Panel header={[<i className="fa fa-trophy"></i>, "Classement par ratio"]}>
                        <UserTable data={this.state.users} mode="ratio" period="thismonth"></UserTable>
                    </Panel>
                </div>
                <div className="col-md-4">
                    <Panel header={[<i className="fa fa-trophy"></i>, "Classement par score (depuis toujours)"]}>
                        <UserTable data={this.state.users} mode="score" period="all"></UserTable>
                    </Panel>
                </div>
                {this.getDetail()}
            </div>
        );
    }
});
