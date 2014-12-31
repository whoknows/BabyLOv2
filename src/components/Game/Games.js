/** @jsx React.DOM */

var GameTable = require('components/Table/GameTable.js');
var GameStore = require('stores/GameStore.js');
var GameActions = require('actions/GameAction.js');
var ColPanel = require('components/Home/ColPanel.js');
var {Input} = require('react-bootstrap');
var {RaisedButton} = require('material-ui');
var {State} = require('react-router');
var Select = require('components/Select/Select.js');
var DatePicker = require('components/DatePicker/DatePicker.js');

require('./Game.css');

function isSameDay(a, b) {
    return a.startOf('day').isSame(b.startOf('day'));
}

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(GameStore,"onGameChange"),
        State
    ],
    onGameChange: function() {
        this.setState({
            games: GameStore.getGames()
        });
    },
    getInitialState: function () {
        var dateString;

        if(this.getParams().date){
            dateString = this.getParams().date;
        } else {
            dateString = GameStore.getCurrentDate();
        }

        GameActions.loadGames({date:dateString});

        return {
            games: GameStore.getGames(),
            date: dateString,
            formVisible: false
        };
    },
    handleSubmit: function(e){
        e.preventDefault();
        var data = {date: this.refs.date.getValue()};

        if (this.state.formVisible) {
            data.users = [
                this.refs.p1.getValue(),
                this.refs.p2.getValue()
            ];
            data.mode = this.refs.mode.getValue();
        }

        GameActions.loadGames(data);
    },
    handleChange: function(ref){
        var s = {};
        s[ref] = this.refs[ref].getValue().trim();
        this.setState(s);
    },
    handleDisplay: function(e){
        e.preventDefault();

        this.setState({formVisible: !this.state.formVisible});
    },
    getForm: function(){
        return (
            <div className="row">
                <div className="col-md-5">
                    <Select ref="p1" placeholder="Joueur 1" />
                </div>
                <div className="col-md-2 select-container">
                    <Input type="select" ref="mode" className="middle-select">
                        <option value="avec">Avec</option>
                        <option value="contre">Contre</option>
                    </Input>
                </div>
                <div className="col-md-5">
                    <Select ref="p2" placeholder="Joueur 2" />
                </div>
            </div>
        );
    },
    render: function () {
        return <div className="content-wrapper">
                    <h3>Parties</h3>
                    <div className="row">
                        <ColPanel col="12" icon="search" title="Recherche de parties">
                            <div className="col-md-7 gameform">
                                <form ref="gameform" onSubmit={this.handleSubmit}>
                                    <DatePicker ref="date" inputClass="select-date" />
                                    {this.state.formVisible ? this.getForm() : null}
                                    <RaisedButton label="Valider" secondary={true}/>
                                    <a href="#" onClick={this.handleDisplay}>
                                    Recherche{this.state.formVisible ? " standard" : " avancée"}
                                    </a>
                                </form>
                            </div>
                        </ColPanel>
                        <ColPanel col="12" icon="futbol-o" title="Parties jouées">
                            <GameTable advancedDisplay={true} data={this.state.games} />
                        </ColPanel>
                    </div>
                </div>;
    }
});
