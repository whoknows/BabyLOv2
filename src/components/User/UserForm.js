/** @jsx React.DOM */

var {Button, Input} = require('react-bootstrap');
var PopConfirm = require('components/PopConfirm/PopConfirm.js');
var UserAction = require('actions/UserAction.js');

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            user: {
                id: null,
                username: null,
                email:'',
                enabled: "0",
                roles: []
            },
            admin: true
        };
    },
    handleSubmit: function(e){
        e.preventDefault();
        var data = this.getFormData();
        if(this.validateForm(data)){
            if(this.props.user.id !== null){
                UserAction.saveUser(data);
            } else {
                UserAction.addUser(data);
            }
        }
    },
    validateForm: function(data){
        if(this.refs.confirm.getValue() != data.password){
            // show error !!!!!
            return false;
        }
        return true;
    },
    getFormData: function(){
        return {
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue()
        };
    },
    render: function () {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Input type="hidden" ref="userid" value={this.props.user.id} />
                <Input type="text" label="Username" placeholder="Sera utilisé comme identifiant de connexion" ref="username" value={this.props.user.username} labelClassName="col-md-2" wrapperClassName="col-md-8" />
                <Input type="password" label="Password" ref="password" placeholder="Au moins 6 charactères" labelClassName="col-md-2" wrapperClassName="col-md-8" />
                <Input type="password" label="Confirm" ref="password2" placeholder="Au moins 6 charactères" labelClassName="col-md-2" wrapperClassName="col-md-8" />
                <Input type="text" label="Email" placeholder="Utiliser un email associé à un compte Gravatar" ref="email" defaultValue={this.props.user.email} labelClassName="col-md-2" wrapperClassName="col-md-8" />
                {this.props.admin ?
                <div>
                    <Input type="select" label="Roles" ref="roles" multiple labelClassName="col-md-2" wrapperClassName="col-md-8">
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                    </Input>
                    <Input type="checkbox" label="Actif" ref="enabled" defaultValue={this.props.user.enabled == "0"} wrapperClassName="col-md-offset-2 col-md-8" />
                </div>
                : null}

                <Input type="submit" bsStyle="success" value="Enregistrer" wrapperClassName="col-md-offset-2 col-md-8" />
            </form>
        );
    }
});
