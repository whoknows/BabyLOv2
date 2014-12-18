/** @jsx React.DOM */

var {Input,Button} = require('react-bootstrap');
var CurrentUserAction = require('actions/CurrentUserAction.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var UserForm = require('components/User/UserForm.js');
var ColPanel = require('components/Home/ColPanel.js');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(CurrentUserStore,"onUsersChange")],
    onUserChange: function(){
        this.setState({currentUser: CurrentUserStore.getCurrentUser()});
    },
    getInitialState: function(){
        return {currentUser: CurrentUserStore.getCurrentUser()};
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Gestion du compte</h3>
                <div className="row">
                    <ColPanel key={2} col="12" icon="edit" title="Mettez vos informations à jour">
                        <UserForm cancel={this.toggleForm} user={this.state.currentUser} width={9} />
                    </ColPanel>
                </div>
            </div>
        );
    }
});
