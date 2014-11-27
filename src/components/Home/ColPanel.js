/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Panel} = require('react-bootstrap');

module.exports = React.createClass({
    render: function () {
        return <div className={"col-md-" + this.props.col}>
                    <Panel header={[<i className={"fa fa-" + this.props.icon}></i>, this.props.title]}>
                        {this.props.children}
                    </Panel>
                </div>;
    }
});
