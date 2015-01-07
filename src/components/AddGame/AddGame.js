/** @jsx React.DOM */

var {Input, Button} = require('react-bootstrap');
var Select = require('components/Select/Select.js');
var UserStore = require('stores/UserStore.js');
var UserImage = require('components/User/UserImage.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var GameAction = require('actions/GameAction.js');
var Unauthorised = require('components/Unauthorised/Unauthorised.js');
var DatePicker = require('components/DatePicker/DatePicker.js');
var ColPanel = require('components/Home/ColPanel.js');

require('./AddGame.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {errorMessage: "", successMessage: ""};
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
            this.setState({errorMessage: "Une date doit être spécifiée.", successMessage:""});
            return false;
        }

        if(typeof form.p1t1 == 'undefined' || typeof form.p2t1 == 'undefined' || typeof form.p1t2 == 'undefined' || typeof form.p2t2 == 'undefined'){
            this.setState({errorMessage: "Tous les joueurs doivent être renseignés.", successMessage:""});
            return false;
        }

        if(form.p1t1 == form.p2t1 || form.p1t2 == form.p2t2){
            this.setState({errorMessage: "Même joueur présent dans la même équipe.", successMessage:""});
            return false;
        }

        if(form.p1t1 == form.p1t2 || form.p1t1 == form.p2t2 || form.p2t1 == form.p1t2 || form.p2t1 == form.p2t2){
            this.setState({errorMessage: "Même joueur présent dans deux équipes.", successMessage:""});
            return false;
        }

        if(form.st1 == form.st2){
            this.setState({errorMessage: "Les deux équipes ne peuvent pas avoir le même score.", successMessage:""});
            return false;
        }

        this.setState({successMessage: "Partie enregistrée.", errorMessage:""});
        return true;
    },
    render: function () {
        if(!CurrentUserStore.isAdmin()){
            return <Unauthorised />;
        }

        var options = [];
        for(var i=0; i<=10; i++){
            options.push(<option key={i} value={i}>{i}</option>);
        }

        return (
            <ColPanel col="12" icon="plus" title="Ajouter une partie">
                <div className="row-fluid">
                    <div className="col-md-12">
                        <h4>Date</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <DatePicker ref="date" inputClass="select-date" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 form-container">
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
                            {/*<div className="col-md-12"><Button bsStyle="info" bsSize="large">Gagnant</Button></div>*/}
                            <div className="col-md-12 validation-container">
                                <Button onClick={this.handleSubmit} bsStyle="success">Enregistrer la partie</Button>
                                <span className="text-danger">{this.state.errorMessage}</span>
                                <span className="text-success">{this.state.successMessage}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 form-container">
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
                            {/*<div className="col-md-12"><Button bsStyle="info" bsSize="large">Gagnant</Button></div>*/}
                        </div>
                    </div>
                </div>
            </ColPanel>
        );
    }
});
