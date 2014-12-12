/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Input,Button} = require('react-bootstrap');
var CurrentUserAction = require('actions/CurrentUserAction.js');
var UserForm = require('components/User/UserForm.js');

require('./LoginForm.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {login:true};
    },
    getDefaultProps: function() {
        return {message: ""};
    },
    toggleForm: function () {
        this.setState({login:!this.state.login});
    },
    handleConnection: function (e) {
        CurrentUserAction.login(this.refs.login.getValue(), this.refs.password.getValue());
        e.preventDefault();
    },
    getForm: function(){
        if (this.state.login) {
            return (
                <form onSubmit={this.handleConnection}>
                    <Input ref="login" type="text" autoFocus placeholder="Nom d'utilisateur" />
                    <Input ref="password" type="password" placeholder="Mot de passe" />
                    <Button type="submit" bsStyle="success">Se connecter</Button>
                    <a onClick={this.toggleForm}>Demander un compte</a>
                    <div className="text-danger error-message">{this.props.message}</div>
                </form>
            );
        } else {
            return <UserForm cancel={this.toggleForm} />;
        }
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="well bs-component thewell">
                            <h1>Bienvenue</h1>
                            {this.getForm()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
