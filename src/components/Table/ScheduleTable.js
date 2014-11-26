/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Panel, Table, Button} = require('react-bootstrap');
var CurrentUserStore = require('stores/CurrentUserStore.js');

module.exports = React.createClass({
    getUserList: function(users) {
        var currentUser = CurrentUserStore.getCurrentUser();
        var userScheduled = false;

        var ret = users.map(function(user){
            if(user.id == currentUser.id){
                userScheduled = true;
                return <UserImage user={user} removable></UserImage>
            } else {
                return <UserImage user={user}></UserImage>
            }
        });

        if(!userScheduled){
            ret.push(<Button className="pull-right" bsStyle="success">GO</Button>);
        }

        return ret;
    },
    generateTable: function(data) {
        return data.map(function(row, i){
            return <tr key={i}>
                <td>{row.creneau}</td>
                <td>{this.getUserList(row.users)}</td>
            </tr>;
        }.bind(this));
    },
    render: function () {
        return (
            <Panel header={[<i className="fa fa-calendar"></i>, this.props.title]}>
                <Table hover>
                    <thead><tr><th>Créneau</th><th>Joueurs</th></tr></thead>
                    <tbody>{this.generateTable(this.props.data)}</tbody>
                </Table>
            </Panel>
        );
    }
});
