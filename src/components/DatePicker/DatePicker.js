var DayPicker = require('react-day-picker');
var moment = require('moment');
var {Input} = require('react-bootstrap');

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
    getDefaultProps: function(){
        return {inputClass: ''};
    },
    getInitialState: function(){
        return {value: dateToValue(moment()), visible: false};
    },
    onDayClick: function(day, modifiers, e) {
        this.setState({ value: dateToValue(day) });
    },
    handleInputChange: function(e) {
        this.setState({ value: e.target.value });
    },
    toggleDatepicker: function() {
        this.setState({visible: !this.state.visible});
    },
    getValue: function(){
        return this.state.value;
    },
    render: function() {
        var modifiers = {
            today: function (day) {
                return isSameDay(moment(), day);
            },
            selected: function (day) {
                return isSameDay(valueToDate(this.state.value), day);
            }.bind(this)
        };

        return (
            <div className="datepicker-wrapper">
                <Input type="text" ref="datepicker" className={this.props.inputClass} value={this.state.value} onClick={this.toggleDatepicker} onChange={this.handleInputChange} />
                {this.state.visible ? <DayPicker modifiers={modifiers} enableOutsideDays={true} onDayClick={this.onDayClick} /> : null}
            </div>
        );
    }
});
