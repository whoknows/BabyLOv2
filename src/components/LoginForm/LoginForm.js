/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Input,Button} = require('react-bootstrap');

require('./LoginForm.css');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="well bs-component thewell">
                            <h1>Bienvenue.</h1>
                            <form>
                                <Input type="text" placeholder="Nom d'utilisateur" />
                                <Input type="password" placeholder="Mot de passe" />
                                <Button bsStyle="success">Se connecter</Button>
                                <a href="javascript:void(0)">Demander un compte</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
