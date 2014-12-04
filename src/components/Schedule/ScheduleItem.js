/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Button, ListGroup, ListGroupItem} = require('react-bootstrap');
var ScheduleStore = require('stores/ScheduleStore.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = React.createClass({
    userScheduled: false,
    setUserScheduled: function (us) {
        this.userScheduled = us;
    },
    isFull: function() {
        return this.props.users.length == 4;
    },
    isEmpty: function() {
        return this.props.users.length === 0;
    },
    getDefaultProps: function() {
        return { users: [], creneau: "", isFull: false };
    },
    getUserList: function() {
        var currentUser = CurrentUserStore.getCurrentUser();

        if (this.props.users.length === 0) {
            return [<i key={this.props.creneau}>Aucun joueur pour ce créneau.</i>];
        }

        this.setUserScheduled(false);

        return this.props.users.map(function(userid){
            if(userid == currentUser.id){
                this.setUserScheduled(true);
                return <UserImage key={userid} schedule={this.props.creneau} user={userid}></UserImage>;
            }

            return <UserImage key={userid} user={userid}></UserImage>;
        }.bind(this));
    },
    getButton: function () {
        if (this.props.creneau < ScheduleStore.getCurrentTime()) {
            return <i className="moveMe">Le créneau est déjà passé.</i>;
        } else if(this.isEmpty() || (!this.userScheduled && !this.isFull())){
            return <Button data-schedule={this.props.creneau} onClick={this.clickHandler} bsStyle="success">GO</Button>;
        } else if (this.isFull() && this.props.vertical) {
            return <i className="moveMe">Le créneau est plein.</i>;
        }
    },
    clickHandler: function (e) {
        ScheduleAction.participate(e.target.dataset.schedule, CurrentUserStore.getCurrentUser().id);
    },
    render: function () {
        if (this.props.vertical) {
            return <ListGroup>
                       {this.getUserList().map(function(user,i){
                           return <ListGroupItem key={i}>{user}</ListGroupItem>;
                       }), this.getButton()}
                   </ListGroup>;
        }

        return <div>{this.getUserList()} {this.getButton()}</div>;
    }
});
