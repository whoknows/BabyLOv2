/** @jsx React.DOM */

var ColPanel = require('components/Home/ColPanel.js');

var UserStore = require('stores/UserStore.js');
var UserTable = require('components/Table/UserTable.js');
var UserDetail = require('./UserDetail.js');
var {State} = require('react-router');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore,"onUserChange"),
        State
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
    getDetail: function () {
        var id = this.getParams().id;
        if(id){
            return <div className="col-md-12"><UserDetail user={id}></UserDetail></div>;
        }

        return <div className="col-md-12"><p><i>Cliquer sur un joueur pour afficher ses détails</i></p></div>;
    },
    render: function () {
        return <div className="content-wrapper">
                <h3>Joueurs</h3>
                <div className="row userpanels">
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
