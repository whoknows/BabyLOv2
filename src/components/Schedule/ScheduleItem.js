/** @jsx React.DOM */

var UserImage = require('components/User/UserImage.js');
var {Button, ListGroup, ListGroupItem} = require('react-bootstrap');
var ScheduleStore = require('stores/ScheduleStore.js');
var CurrentUserStore = require('stores/CurrentUserStore.js');
var ScheduleAction = require('actions/ScheduleAction.js');
var MatchmakingActions = require('actions/MatchmakingActions.js');
var MatchmakingStore = require('stores/MatchmakingStore.js');

module.exports = React.createClass({
    userScheduled: false,
    /*mixins: [Reflux.listenTo(MatchmakingStore,"onMatchmakingChange")],*/
    getInitialState: function(){
        return {teams: MatchmakingStore.getTeams()};
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.users.length == 4){
            MatchmakingActions.doMatchMaking(nextProps.users);
            this.setState({teams: MatchmakingStore.getTeams()});
        }
    },
    onMatchmakingChange: function(){
        /**/
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
                return <UserImage key={userid} className={"removable " + this.getTeam(userid)} handleClick={this.userClickHandler.bind(null, this.props.creneau, userid)} user={userid}></UserImage>;
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
            return undefined;
        }
    },
    getButton: function () {
        if(CurrentUserStore.getCurrentUser().enabled != "1") {
            return null;
        } else if (this.props.creneau < ScheduleStore.getCurrentTime()) {
            return <i className="moveMe">Le créneau est déjà passé.</i>;
        } else if(this.isEmpty() || (!this.userScheduled && !this.isFull())){
            return <Button data-schedule={this.props.creneau} onClick={this.clickHandler} bsStyle="success">GO</Button>;
        } else if (this.isFull() && this.props.vertical) {
            return <i className="moveMe">Le créneau est plein.</i>;
        }
    },
    userClickHandler: function(schedule, user){
        ScheduleAction.unparticipate(schedule, user);
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

        return <div className="scheduleItem">{this.getUserList()} {this.getButton()}</div>;
    }
});
