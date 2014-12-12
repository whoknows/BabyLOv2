/** @jsx React.DOM */

var {Button, Input} = require('react-bootstrap');
var PopConfirm = require('components/PopConfirm/PopConfirm.js');
var UserAction = require('actions/UserAction.js');
var sha1 = require('sha1');

require('./UserForm.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {user:{}};
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
            data[ref] = this.refs[ref].getValue();
        }

        this.setState({user: data});
    },
    handleSubmit: function(e){
        e.preventDefault();

        if(this.validateForm(this.state.user)){

            var data = this.cleanForm(JSON.parse(JSON.stringify(this.state.user)));

            if(data.id){
                UserAction.saveUser(data);
            } else {
                UserAction.addUser(data);
            }
        }
    },
    cleanForm: function(data) {
        data.password2 = undefined;

        if(data.password){
            data.password = sha1(data.password);
        }

        return data;
    },
    validateForm: function(data){
        if(data.password2 != data.password){
            // show error !!!!!
            return false;
        }

        return true;
    },
    render: function () {
        var buttonLabel = this.state.user.id ? "Mettre à jour les données utilisateur" : (this.props.admin ? "Nouvel utilisateur" : "Valider");

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Input type="hidden" ref="userid" readOnly value={this.state.user.id} />
                <Input type="text" label="Username" onChange={this.handleChange.bind(this, "username")} placeholder="Sera utilisé comme identifiant de connexion" ref="username" value={this.state.user.username} labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="password" label="Password" onChange={this.handleChange.bind(this, "password")} ref="password" placeholder="Au moins 6 charactères" labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="password" label="Confirm" onChange={this.handleChange.bind(this, "password2")} ref="password2" placeholder="Confirmation du mot de passe" labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="email" label="Email" onChange={this.handleChange.bind(this, "email")} placeholder="Utiliser un email associé à un compte Gravatar" ref="email" value={this.state.user.email} labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                {this.props.admin ?
                <div>
                    <Input type="select" value={this.state.user.roles} onChange={this.handleChange.bind(this, "roles")} label="Roles" ref="roles" multiple labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width}>
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                    </Input>
                    <Input type="checkbox" label="Actif" ref="enabled" onChange={this.handleChange.bind(this, "enabled")} checked={this.state.user.enabled == "1"} wrapperClassName={"col-md-offset-2 col-md-" + this.props.width} />
                </div>
                : null}

                <div className="form-group">
                    <div className={"col-md-offset-2 col-md-" + this.props.width}>
                        <Button type="submit" bsStyle="success">{buttonLabel}</Button>
                        {this.props.cancel ?
                            <Button className="button-cancel" onClick={this.props.cancel}>Annuler</Button>
                        : null}
                    </div>
                </div>
            </form>
        );
    }
});
