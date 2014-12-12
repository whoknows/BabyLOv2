/** @jsx React.DOM */

var {curry} = require('utils.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var GameAction = require('actions/GameAction.js');
var {Table, Button} = require('react-bootstrap');
var UserImage = require('components/User/UserImage.js');
var PopConfirm = require('components/PopConfirm/PopConfirm.js');

require('components/Table/Table.css');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(CurrentUserStore, 'onCurrentUserChange')
    ],
    getInitialState: function(){
        return {admin: CurrentUserStore.isAdmin()};
    },
    onCurrentUserChange: function(){
        var admin = CurrentUserStore.isAdmin();
        if(this.state.admin != admin){
            this.setState({admin:admin});
        }
    },
    handleDelete: function(id,e){
        GameAction.deleteGame(id);
    },
    generateRows: function(games) {
        if(this.props.slice){
            games = games.slice(0,this.props.slice);
        }

        if (games.length === 0) {
            var colspan = this.getAdminCondition() ? 8 : 7;
            return <tr key="osef">
                <td colSpan={colspan}>Aucune partie disponible pour les filtres sélectionnés.</td>
            </tr>;
        }

        return games.map(function(game) {
            var classT1 = 'text-success';
            var classT2 = 'text-danger';

            if (parseInt(game.st1) < parseInt(game.st2)) {
                classT1 = 'text-danger';
                classT2 = 'text-success';
            }

            return <tr key={game.id}>
                        <td>{game.date}</td>
                        <td className={"hasUserImage " + classT1}><UserImage user={game.p1t1}></UserImage></td>
                        <td className={"hasUserImage " + classT1}><UserImage user={game.p2t1}></UserImage></td>
                        <td className={classT1}>{game.st1}</td>
                        <td className={"hasUserImage " + classT2}><UserImage user={game.p1t2}></UserImage></td>
                        <td className={"hasUserImage " + classT2}><UserImage user={game.p2t2}></UserImage></td>
                        <td className={classT2}>{game.st2}</td>
                        {this.getAdminCondition() ? <td><PopConfirm title="Supprimer la partie ?" onConfirm={curry(this.handleDelete, game.id)}><Button bsStyle="danger"><i className="fa fa-trash"></i></Button></PopConfirm></td> : null}
                    </tr>;
        }.bind(this));
    },
    getAdminCondition: function(){
        return this.state.admin && this.props.advancedDisplay;
    },
    render: function () {
        return <Table hover>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Joueur 1</th>
                        <th>Joueur 2</th>
                        <th>Score</th>
                        <th>Joueur 1</th>
                        <th>Joueur 2</th>
                        <th>Score</th>
                        {this.getAdminCondition() ? <th>Suppr.</th> : null}
                    </tr>
                    </thead>
                    <tbody>{this.generateRows(this.props.data)}</tbody>
                </Table>;
    }
});
