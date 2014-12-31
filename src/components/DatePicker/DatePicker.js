var DayPicker = require('react-day-picker');
var moment = require('moment');

require('./DatePicker.css');

function dateToValue(d) {
    return d.format("YYYY-MM-DD");
}

function valueToDate(s) {
    var date = moment(s, "YYYY-MM-DD", true);
    return date.isValid() ? date : null;
}

function isSameDay(a, b) {
    return a.startOf('day').isSame(b.startOf('day'));
}

module.exports = React.createClass({
    getInitialState: function(){
        return {value: dateToValue(moment())};
    },
    onDayClick: function(day, modifiers, e) {
        this.setState({ value: dateToValue(day) });
    },
    handleMonthChange: function(month) {
        console.log('Switched to ' + month.format('MMMM YYYY'));
    },
    render: function() {
        var modifiers = {
            today: function (day) {
                return isSameDay(moment(), day);
            },
            selected: function (day) {
                var value = valueToDate(this.state.value);
                if (!value)
                    return false;
                else
                    return isSameDay(value, day);
            }.bind(this)
        };

        return (
            <DayPicker modifiers={modifiers} enableOutsideDays={true} onDayClick={this.onDayClick} />
        );
    }
});
