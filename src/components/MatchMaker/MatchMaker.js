/** @jsx React.DOM */

var UserStore = require('stores/UserStore.js');
var UserImage = require('components/User/UserImage.js');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserStore,"onUserChange")],
    onUserChange: function() {
        //
    },
    getUserList: function() {
    /*    var ret = [];
console.log(UserStore.getUsers());
        UserStore.getUsers().map(function(datum, i){
            if (datum.enabled == "1") {
                ret.push(datum.id);
            }
        });

        return ret;*/
    },
    render: function () {
        return (
            <div className="content-wrapper">
                <h3>Match Maker</h3>
                <div className="row">
                    <div className="col-md-4">
                        {this.getUserList()}
                    </div>
                </div>
            </div>
        );
    }
});
