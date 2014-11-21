/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    render: function () {
        var rows = this.props.data.map(function(datum){
            return <tr key={datum.id}><td>{datum.username}</td></tr>
        });
        var header = [];
        return (
            <table className="table table-bordered">
                <thead>{header}</thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});
