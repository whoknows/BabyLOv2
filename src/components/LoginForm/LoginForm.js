/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Input,Button} = require('react-bootstrap');
var CurrentUserAction = require('actions/CurrentUserAction.js');

require('./LoginForm.css');

module.exports = React.createClass({
    askAccount: function () {
        alert("LOL t'as crus quoi la ?");
    },
    handleConnection: function (e) {
        CurrentUserAction.login(this.refs.login.getValue(), this.refs.password.getValue());
        e.preventDefault();
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="well bs-component thewell">
                            <h1>Bienvenue</h1>
                            <form>
                                <Input ref="login" type="text" placeholder="Nom d'utilisateur" />
                                <Input ref="password" type="password" placeholder="Mot de passe" />
                                <Button onClick={this.handleConnection} bsStyle="success">Se connecter</Button>
                                <a onClick={this.askAccount}>Demander un compte</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
