/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    mixins: [
        //Reflux.listenTo(ScheduleStore,"onScheduleChange")
    ],
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Ajouter une partie</h3>
                <div className="row-fluid">
                    <div className="col-md-6">
                        <h3>Equipe 1</h3>
                    </div>
                    <div className="col-md-6">
                        <h3>Equipe 2</h3>
                    </div>
                </div>
            </div>
        );
    }
});
