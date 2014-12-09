/** @jsx React.DOM */

var {Popover, OverlayTrigger, Button} = require('react-bootstrap');

require('./PopConfirm.css');

module.exports = React.createClass({
    handleSelect: function(selected) {
        //
    },
    render: function () {
        var pop = <Popover title={this.props.title} className="popconfirm">
                    <Button bsStyle="success">Oui</Button><Button bsStyle="danger">Non</Button>
                </Popover>;
        return (
            <OverlayTrigger trigger="click" placement="top" overlay={pop}>
                {this.props.children}
            </OverlayTrigger>
        );
    }
});
