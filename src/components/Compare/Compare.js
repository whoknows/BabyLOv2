/** @jsx React.DOM */

var {Button} = require('react-bootstrap');
var Select = require('components/Select/Select.js');

require('./Compare.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {users:[]};
    },
    handleClick: function(){
        console.log(
            this.refs.p1.getValue(),
            this.refs.p2.getValue()
        );
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Comparateur</h3>
                <div className="row">
                    <div className="col-md-5">
                        <Select ref="p1" placeholder="Joueur 1" />
                    </div>
                    <div className="col-md-2">
                        <Button bsStyle="danger" type="submit" className="compare-submit" onClick={this.handleClick}>Comparer les deux joueurs</Button>
                    </div>
                    <div className="col-md-5">
                        <Select ref="p2" placeholder="Joueur 2" />
                    </div>
                </div>
            </div>
        );
    }
});
