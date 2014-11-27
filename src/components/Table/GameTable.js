/** @jsx React.DOM */

var React = require('react');
var {Table} = require('react-bootstrap');

require('components/Table/Table.css');

module.exports = React.createClass({
    generateRows: function(games) {
        return games.map(function(game) {
            var classT1 = 'text-success';
            var classT2 = 'text-danger';

            if (game.st1 < game.st2) {
                classT1 = 'text-danger';
                classT2 = 'text-success';
            }

            return <tr key={game.id}>
                    <td>{game.date}</td>
                    <td className={classT1}>{game.p1t1}</td>
                    <td className={classT1}>{game.p2t1}</td>
                    <td className={classT1}>{game.st1}</td>
                    <td className={classT2}>{game.p1t2}</td>
                    <td className={classT2}>{game.p2t2}</td>
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
