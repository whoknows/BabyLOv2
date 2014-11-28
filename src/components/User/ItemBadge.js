/** @jsx React.DOM */

var {ListGroupItem, Label} = require('react-bootstrap');

require('components/User/UserImage.css');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {text: "", value: 0};
    },
    render: function () {
        return <ListGroupItem>{this.props.text} <Label bsStyle="info" className="pull-right">{this.props.value}</Label></ListGroupItem>;
    }
});
