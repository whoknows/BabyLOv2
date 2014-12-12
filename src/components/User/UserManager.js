/** @jsx React.DOM */

//var {Input,Button} = require('react-bootstrap');
var UserStore = require('stores/UserStore.js');
var UserImage = require('components/User/UserImage.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var Unauthorised = require('components/Unauthorised/Unauthorised.js');

module.exports = React.createClass({
    render: function () {
        if(!CurrentUserStore.isSuperAdmin()){
            return <Unauthorised />;
        }

        return <h1>cool</h1>;
    }
});
