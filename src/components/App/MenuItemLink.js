/** @jsx React.DOM */

var React = require('react/addons');
var MenuItem = require('react-bootstrap').MenuItem;
var LinkMixin = require('components/Mixins/LinkMixin.js');

module.exports = React.createClass({
    mixins: [LinkMixin],
    render: function(){
        return <MenuItem {...this.props} className={this.getClassName()} href={this.getHref()} onClick={this.handleClick}>{this.props.children}</MenuItem>;
    }
});
