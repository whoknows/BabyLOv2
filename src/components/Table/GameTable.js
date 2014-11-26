/** @jsx React.DOM */

var React = require('react');
var {Panel, Table} = require('react-bootstrap');

require('components/Table/Table.css');

module.exports = React.createClass({
    generateRows: function(games) {
        return games.map(function(game) {
            var classT1 = 'text-success';
            var classT2 = 'text-danger';

            if (game.st1 < game.st2) {
                var classT1 = 'text-danger';
                var classT2 = 'text-success';
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
        return (
            <div>
                <Panel header={[<i className="fa fa-futbol-o"></i>, this.props.title]}>
                    <Table hover>
                        <thead>
                        <tr>
                            <th rowSpan="2">Date</th>
                            <th colSpan="3">Equipe 1</th>
                            <th colSpan="3">Equipe 2</th>
                        </tr>
                        <tr>
                            <th>Joueur 1</th>
                            <th>Joueur 2</th>
                            <th>Score</th>
                            <th>Joueur 1</th>
                            <th>Joueur 2</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>{this.generateRows(this.props.data)}</tbody>
                    </Table>
                </Panel>
            </div>
        );
    }
});
