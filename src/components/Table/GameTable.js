/** @jsx React.DOM */

var React = require('react');
var {Table} = require('react-bootstrap');
var UserImage = require('components/User/UserImage.js');

require('components/Table/Table.css');

module.exports = React.createClass({
    generateRows: function(games) {
        if(this.props.slice){
            games = games.slice(0,this.props.slice);
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
                        <td className={classT1}><UserImage user={game.p1t1}></UserImage></td>
                        <td className={classT1}><UserImage user={game.p2t1}></UserImage></td>
                        <td className={classT1}>{game.st1}</td>
                        <td className={classT2}><UserImage user={game.p1t2}></UserImage></td>
                        <td className={classT2}><UserImage user={game.p2t2}></UserImage></td>
                        <td className={classT2}>{game.st2}</td>
                    </tr>;
        });
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
                    </tr>
                    </thead>
                    <tbody>{this.generateRows(this.props.data)}</tbody>
                </Table>;
    }
});
