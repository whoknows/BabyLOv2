var Reflux = require('reflux');

var UserActions = Reflux.createActions(["loadData", "loadSuccess", "loadFail"]);

module.exports = UserActions;
