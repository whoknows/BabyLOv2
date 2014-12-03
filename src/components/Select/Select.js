/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var UserImage = require('components/User/UserImage.js');
var {DropdownButton, MenuItem} = require('react-bootstrap');

require('components/User/UserImage.css');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            data:[],
            placeholder: "Select"
        };
    },
    handleSelect: function() {
        //
    },
    render: function () {
        return (
            <DropdownButton title={this.props.placeholder}>
                {this.props.data.map(function(datum, i){
                    return <MenuItem eventKey={i} key={i}>{datum}</MenuItem>;
                })}
            </DropdownButton>
        );
    }
});
