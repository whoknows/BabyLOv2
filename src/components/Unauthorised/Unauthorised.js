/** @jsx React.DOM */

var {Button,Alert} = require('react-bootstrap');
var {Navigation} = require('react-router');

module.exports = React.createClass({
    mixins:[
        Navigation
    ],
    handleClic: function(){
        this.transitionTo("home");
    },
    render: function () {
        return (
            <Alert bsStyle="danger">
                <h4>Accès non authorisé</h4>
                <p>Vous n'êtes pas authorisé à accéder à cette page.</p>
                <br />
                <p><Button onClick={this.handleClic}>Retour à l'accueil</Button></p>
            </Alert>
        );
    }
});