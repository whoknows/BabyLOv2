/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Button, ListGroup, ListGroupItem} = require('react-bootstrap');
var {RaisedButton} = require('material-ui');
var UserStore = require('stores/UserStore.js');
var ScheduleStore = require('stores/ScheduleStore.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');

module.exports = React.createClass({
    userScheduled: false,
    mixins: [
        Reflux.listenTo(UserStore,"onUsersChange")
    ],
    onUsersChange: function() {
        if(this.props.users.length == 4){
            this.setState({teams: UserStore.getMatchMaking(this.props.users)});
        }
    },
    getInitialState: function(){
        return {teams: UserStore.getMatchMaking(this.props.users)};
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({teams: UserStore.getMatchMaking(nextProps.users)});
    },
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
                return (
                    <span className="outerRemovable" key={userid}>
                        <UserImage className={"removable " + this.getTeam(userid)} user={userid} />
                        <span className="innerRemovable" onClick={this.userClickHandler.bind(this, this.props.creneau, userid)}><i className="fa fa-remove"></i></span>
                    </span>
                );
            }

            return <UserImage key={userid} className={this.getTeam(userid)} user={userid}></UserImage>;
        }.bind(this));
    },
    getTeam: function(uid) {
        if(this.state.teams.length == 2){
            if(this.state.teams[0].indexOf(uid) != -1){
                return 'team1';
            } else {
                return 'team2';
            }
        } else {
            return '';
        }
    },
    getButton: function () {
        if(CurrentUserStore.getCurrentUser().enabled != "1") {
            return null;
        } else if (this.props.creneau < ScheduleStore.getCurrentTime()) {
            return <i className="moveMe">Le créneau est déjà passé.</i>;
        } else if(this.isEmpty() || (!this.userScheduled && !this.isFull())){
            return <RaisedButton data-schedule={this.props.creneau} onClick={this.clickHandler} secondary={true} label="GO" />;
        } else if (this.isFull() && this.props.vertical) {
            return <i className="moveMe">Le créneau est plein.</i>;
        }
    },
    userClickHandler: function(schedule, user){
        ScheduleAction.unparticipate(schedule, user);
    },
    clickHandler: function (e) {
        var schedule = e.target.dataset.schedule;
        if(!schedule){
            schedule = e.target.parentNode.dataset.schedule;
        }

        ScheduleAction.participate(schedule, CurrentUserStore.getCurrentUser().id);
    },
    render: function () {
        if (this.props.vertical) {
            return (
                <ListGroup>
                    {this.getUserList().map(function(userItem,i){
                       if (userItem.type == "i") {
                           return userItem;
                       }
                       return <ListGroupItem key={i}>{userItem}</ListGroupItem>;
                    }), this.getButton()}
                </ListGroup>
            );
        }

        return (<div className="scheduleItem">{this.getUserList()} {this.getButton()}</div>);
    }
});
