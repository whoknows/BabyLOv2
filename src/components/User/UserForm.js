/** @jsx React.DOM */

var {Button, Input} = require('react-bootstrap');
var PopConfirm = require('components/PopConfirm/PopConfirm.js');
var UserAction = require('actions/UserAction.js');
var sha1 = require('sha1');

require('./UserForm.css');

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            user: {},
            admin: false,
            width: 10
        };
    },
    handleSubmit: function(e){
        e.preventDefault();
        var data = this.getFormData();

        if(this.validateForm(data)){
            //data.password = sha1(data.password);
            if(this.props.user.id){
                UserAction.saveUser(data);
            } else {
                UserAction.addUser(data);
            }
        }
    },
    validateForm: function(data){
        if(this.refs.password2.getValue() != data.password){
            // show error !!!!!
            return false;
        }
        return true;
    },
    getFormData: function(){
        if(this.props.admin){
            data = {
                roles: [].map.call(this.refs.roles.getInputDOMNode().selectedOptions, function (option) {
                    return option.value;
                }),
                enabled: this.refs.enabled.getChecked() ? 1 : 0
            };
        }

        return $.extend(data, {
            username: this.refs.username.getValue().trim(),
            password: this.refs.password.getValue(),
            email: this.refs.email.getValue().trim()
        });
    },
    render: function () {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Input type="hidden" ref="userid" value={this.props.user.id} />
                <Input type="text" label="Username" placeholder="Sera utilisé comme identifiant de connexion" ref="username" defaultValue={this.props.user.username} labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="password" label="Password" ref="password" placeholder="Au moins 6 charactères" labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="password" label="Confirm" ref="password2" placeholder="Au moins 6 charactères" labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                <Input type="email" label="Email" placeholder="Utiliser un email associé à un compte Gravatar" ref="email" defaultValue={this.props.user.email} labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width} />
                {this.props.admin ?
                <div>
                    <Input type="select" label="Roles" ref="roles" multiple labelClassName="col-md-2" wrapperClassName={"col-md-" + this.props.width}>
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                    </Input>
                    <Input type="checkbox" label="Actif" ref="enabled" checked={this.props.user.enabled == "0"} wrapperClassName={"col-md-offset-2 col-md-" + this.props.width} />
                </div>
                : null}

                <div className="form-group">
                    <div className={"col-md-offset-2 col-md-" + this.props.width}>
                        <Button type="submit" bsStyle="success">{this.props.user.id ? "Mettre à jour" : "Nouvel utilisateur"}</Button>
                        {this.props.cancel ?
                            <Button className="button-cancel" onClick={this.props.cancel}>Annuler</Button>
                        : null}
                    </div>
                </div>
            </form>
        );
    }
});
