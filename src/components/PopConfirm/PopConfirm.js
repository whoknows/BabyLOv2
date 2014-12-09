/** @jsx React.DOM */

var {Popover, OverlayTrigger, Button} = require('react-bootstrap');

require('./PopConfirm.css');

module.exports = React.createClass({
    handleSelect: function(selected) {
        //
    },
    confirm: function(){
        this.hide();
        this.props.onConfirm();
    },
    hide: function(){
        this.refs.overlay.hide();
    },
    render: function () {
        var pop = <Popover title={this.props.title} className="popconfirm">
                    <Button bsStyle="success" onClick={this.confirm}>Oui</Button>
                    <Button bsStyle="danger" onClick={this.hide}>Non</Button>
                </Popover>;
        return (
            <OverlayTrigger ref="overlay" trigger="click" placement="top" overlay={pop}>
                {this.props.children}
            </OverlayTrigger>
        );
    }
});
