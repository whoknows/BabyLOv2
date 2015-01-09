/** @jsx React.DOM */

var {Button, ProgressBar, Label, ListGroup, ListGroupItem} = require('react-bootstrap');
var Select = require('components/Select/Select.js');
var UserStore = require('stores/UserStore.js');

require('./Compare.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {users:[]};
    },
    handleClick: function(){
        this.setState({users:[UserStore.getUserById(this.refs.p1.getValue()), UserStore.getUserById(this.refs.p2.getValue())]});
    },
    getRatio: function(p){
        return this.state.users[p].gameData.ratio * 100;
    },
    getScore: function(p){
        return this.state.users[p].gameData.score * 100;
    },
    render: function () {
        return (
            <div className="content-wrapper compare">
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
            {this.state.users.length == 2 ? (
                <div className="row">
                    <div className="col-md-5 compare-data compare-data-left">
                        <ListGroup>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-11">
                                        <ProgressBar bsStyle={this.getScore(0) < this.getScore(1) ? "danger" : "success"} now={this.getScore(0)} />
                                    </div>
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.getScore(0) / 100}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-11"></div>
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.state.users[0].gameData.played}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-11"></div>
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.state.users[0].gameData.won}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-11"></div>
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.state.users[0].gameData.lost}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-11">
                                        <ProgressBar bsStyle={this.getRatio(0) < this.getRatio(1) ? "danger" : "success"} now={this.getRatio(0)} />
                                    </div>
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.getRatio(0) / 100}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-md-2 compare-data-center">
                        <ListGroup>
                            <ListGroupItem>Score</ListGroupItem>
                            <ListGroupItem>Parties jouées</ListGroupItem>
                            <ListGroupItem>Parties gagnées</ListGroupItem>
                            <ListGroupItem>Parties perdues</ListGroupItem>
                            <ListGroupItem>Ratio</ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-md-5 compare-data compare-data-right">
                        <ListGroup>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.getScore(1) / 100}</Label>
                                    </div>
                                    <div className="col-md-11">
                                        <ProgressBar bsStyle={this.getScore(1) < this.getScore(0) ? "danger" : "success"} now={this.getScore(1)} />
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.state.users[1].gameData.played}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.state.users[1].gameData.won}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.state.users[1].gameData.lost}</Label>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row">
                                    <div className="col-md-1">
                                        <Label bsStyle="info">{this.getRatio(1) / 100}</Label>
                                    </div>
                                    <div className="col-md-11">
                                        <ProgressBar bsStyle={this.getRatio(1) < this.getRatio(0) ? "danger" : "success"} now={this.getRatio(1)} />
                                    </div>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>) : null}
            </div>
        );
    }
});
