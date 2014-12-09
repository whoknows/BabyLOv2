/** @jsx React.DOM */

var {Input,Button} = require('react-bootstrap');
var Select = require('components/Select/Select.js');
var UserStore = require('stores/UserStore.js');
var UserImage = require('components/User/UserImage.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var GameAction = require('actions/GameAction.js');
var Unauthorised = require('components/Unauthorised/Unauthorised.js');

module.exports = React.createClass({
    getInitialState: function(){
        return {errorMessage: ""};
    },
    handleSubmit: function(){
        var form = {
            p1t1: this.refs.p1t1.getValue(),
            p2t1: this.refs.p2t1.getValue(),
            st1: this.refs.st1.getValue(),
            p1t2: this.refs.p1t2.getValue(),
            p2t2: this.refs.p2t2.getValue(),
            st2: this.refs.st2.getValue(),
            date: this.refs.date.getValue().trim()
        };

        if(this.checkForm(form)){
            GameAction.saveGame(form);
        }
    },
    checkForm: function(form){
        if(form.date === ""){
            this.setState({errorMessage: "Une date doit être spécifiée."});
            return false;
        }

        if(typeof form.p1t1 == 'undefined' || typeof form.p2t1 == 'undefined' || typeof form.p1t2 == 'undefined' || typeof form.p2t2 == 'undefined'){
            this.setState({errorMessage: "Tous les joueurs doivent être renseignés."});
            return false;
        }

        if(form.p1t1 == form.p2t1 || form.p1t2 == form.p2t2){
            this.setState({errorMessage: "Même joueur présent dans la même équipe."});
            return false;
        }

        if(form.p1t1 == form.p1t2 || form.p1t1 == form.p2t2 || form.p2t1 == form.p1t2 || form.p2t1 == form.p2t2){
            this.setState({errorMessage: "Même joueur présent dans deux équipes."});
            return false;
        }

        if(form.st1 == form.st2){
            this.setState({errorMessage: "Les deux équipes ne peuvent pas avoir le même score."});
            return false;
        }

        this.setState({errorMessage: "Partie enregistrée."});
        return true;
    },
    render: function () {
        if(!CurrentUserStore.isAdmin()){
            return <Unauthorised />;
        }
        var options = [];
        for(var i=0; i<=10; i++){
            options.push(<option value={i}>{i}</option>);
        }

        return (
            <div className="content-wrapper">
                <h3>Ajouter une partie</h3>
                <div className="row-fluid">
                    <div className="col-md-12">
                        <h4>Date</h4>
                        <div className="row">
                            <div className="col-md-3">
                                <Input ref="date" type="text" placeholder="Date" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Equipe 1</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <Select ref="p1t1" placeholder="Joueur 1" />
                            </div>
                            <div className="col-md-12">
                                <Select ref="p2t1" placeholder="Joueur 2" />
                            </div>
                            <div className="col-md-12">
                                <Input type="select" ref="st1" label='Score'>
                                    {options}
                                </Input>
                            </div>
                            <div className="col-md-12">
                                <Button bsStyle="info" bsSize="large">Gagnant</Button>
                            </div>
                            <div className="col-md-12 gimemargin-vertical">
                                <Button bsStyle="success" onClick={this.handleSubmit} bsSize="large">Enregistrer la partie</Button>
                                <br />
                                <span className="text-danger">{this.state.errorMessage}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Equipe 2</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <Select ref="p1t2" placeholder="Joueur 1" />
                            </div>
                            <div className="col-md-12">
                                <Select ref="p2t2" placeholder="Joueur 2" />
                            </div>
                            <div className="col-md-12">
                                <Input type="select" ref="st2" label='Score'>
                                    {options}
                                </Input>
                            </div>
                            <div className="col-md-12">
                                <Button bsStyle="info" bsSize="large">Gagnant</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
