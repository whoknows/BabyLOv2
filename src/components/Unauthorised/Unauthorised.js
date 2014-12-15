/** @jsx React.DOM */

var {Button,Alert} = require('react-bootstrap');
var {Navigation} = require('react-router');
var CurrentUserAction = require('actions/CurrentUserAction.js');

module.exports = React.createClass({
    mixins:[
        Navigation
    ],
    handleClic: function(){
        if (this.props.noButton) {
            CurrentUserAction.logout();
        } else {
            this.transitionTo("home");
        }
    },
    render: function () {
        var button = (<span><br /><p><Button onClick={this.handleClic}>Retour à l'accueil</Button></p></span>);

        return (
            <Alert bsStyle="danger">
                <h4>Accès non authorisé</h4>
                <p>Vous n'êtes pas authorisé à accéder à cette page.</p>
                {button}
            </Alert>
        );
    }
});
