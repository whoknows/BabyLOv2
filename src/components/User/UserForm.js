/** @jsx React.DOM */

var {Button, Input} = require('react-bootstrap');
var UserAction = require('actions/UserAction.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var UserStore = require('stores/UserStore.js');
var sha1 = require('sha1');

require('./UserForm.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            user: this.props.user ? this.props.user : {},
            success:"",
            error:""
        };
    },
    getDefaultProps: function () {
        return {admin: false, width: 10};
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({user: nextProps.user ? nextProps.user : {}});
    },
    handleChange: function(ref){
        var data = this.state.user;

        if(ref == "enabled"){
            data[ref] = this.refs.enabled.getChecked() ? "1" : "0";
        } else if (ref == "roles") {
            data[ref] = [].map.call(this.refs.roles.getInputDOMNode().selectedOptions, function (option) {
                return option.value;
            });
        } else {
            data[ref] = this.refs[ref].getValue().trim();
        }

        this.setState({user: data});
    },
    handleSubmit: function(e){
        e.preventDefault();
        Promise.resolve(this.validateForm(this.state.user)).then(function(isValid){
            if(isValid){
                this.setState({error:"", success: (
                    this.state.user.id ? "Le compte à bien été mis à jour." : "Votre compte à bien été créé, il est en attente d'activation par un administrateur."
                )});

                var data = this.cleanForm(JSON.parse(JSON.stringify(this.state.user)));

                if(data.id){
                    UserAction.saveUser(data);
                } else {
                    UserAction.addUser(data);
                }

                if (this.props.doAfterSubmit) {
                    this.props.doAfterSubmit();
                } else {
                    setTimeout(function(){
                        this.setState({user: {}});
                    }.bind(this), 2000);
                }
            }
        }.bind(this));
    },
    cleanForm: function(data) {
        data.password2 = undefined;

        if(data.password){
            data.password = sha1(data.password);
        }

        if(this.props.admin){
            data.admin = true;
        }

        return data;
    },
    validateForm: function(data){
        if (!this.state.user.id && (!data.password || data.password === '')){
            this.setState({success:"", error:"Vous devez spécifier un mot de passe."});
            return false;
        } else if(data.password) {
            if (data.password2 != data.password) {
                this.setState({success:"", error:"Les deux mots de passe sont différents."});
                return false;
            } else if(data.password.length < 6) {
                this.setState({success:"", error:"Le mot de passe est trop court (6 charactères min.)."});
                return false;
            }
        }

        if (!data.username){
            if(this.state.user.username){
                data.username = this.state.user.username;
            } else {
                this.setState({success:"", error:"Vous devez spécifier un nom d'utilisateur."});
                return false;
            }
        } else if(this.props.admin) {
            if(UserStore.getUserBy('username', data.username) !== null){
                this.setState({success:"", error:"Ce nom d'utilisateur est déjà pris."});
                return false;
            }
        } else {
            return UserStore.userExists(data.username).then(function(userExists){
                if(userExists === true){
                    this.setState({success:"", error:"Ce nom d'utilisateur est déjà pris."});
                    return false;
                }
                return true;
            }.bind(this));
        }

        return true;
    },
    render: function () {
        var buttonLabel = this.state.user.id ? "Mettre à jour les données utilisateur" : (this.props.admin ? "Nouvel utilisateur" : "Valider");

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Input type="hidden" ref="userid" readOnly value={this.state.user.id} />
                {this.props.admin || !this.props.user ?
                    <Input type="text" label="Username" autoComplete="off" onChange={this.handleChange.bind(this, "username")} placeholder="Sera utilisé comme identifiant de connexion" ref="username" value={this.state.user.username} labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                : null }

                <Input type="password" autoComplete="off" label="Password" onChange={this.handleChange.bind(this, "password")} value={this.state.user.nothing} ref="password" placeholder="Au moins 6 charactères" labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="password" label="Confirm" autoComplete="off" onChange={this.handleChange.bind(this, "password2")} value={this.state.user.nothing} ref="password2" placeholder="Confirmation du mot de passe" labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="email" label="Email" onChange={this.handleChange.bind(this, "email")} placeholder="Utiliser un email associé à un compte Gravatar" ref="email" value={this.state.user.email} labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                {this.props.admin ?
                <div>
                    <Input type="select" value={this.state.user.roles ? this.state.user.roles : []} onChange={this.handleChange.bind(this, "roles")} label="Roles" ref="roles" multiple labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width}>
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                    </Input>
                    <Input type="checkbox" label="Actif" ref="enabled" onChange={this.handleChange.bind(this, "enabled")} checked={this.state.user.enabled == "1"} wrapperClassName={"col-md-offset-2 col-md-" + this.props.width} />
                </div>
                : null}

                <div className="form-group">
                    <div className={"col-md-offset-2 col-md-" + this.props.width}>
                        <Button bsStyle="success" type="submit">{buttonLabel}</Button>
                        {this.props.cancel ?
                            <Button bsStyle="default" className="button-cancel" onClick={this.props.cancel}>Annuler</Button>
                        : null}
                    </div>
                </div>
                <div className="form-group">
                    <div className={"col-md-offset-2 col-md-" + this.props.width}>
                        <span className="text-danger">{this.state.error}</span>
                    </div>
                    <div className={"col-md-offset-2 col-md-" + this.props.width}>
                        <span className="text-success">{this.state.success}</span>
                    </div>
                </div>
            </form>
        );
    }
});
