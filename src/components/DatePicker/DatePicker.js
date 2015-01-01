var DatePicker = require('react-date-picker');
var moment = require('moment');
var {Input} = require('react-bootstrap');

require('react-date-picker/index.css');
require('./DatePicker.css');

module.exports = React.createClass({
    getDefaultProps: function(){
        return {inputClass: ''};
    },
    getInitialState: function(){
        return {value: moment().format("YYYY-MM-DD"), visible: false};
    },
    handleInputChange: function(e) {
        this.setState({value: e.target.value});
    },
    toggleDatepicker: function() {
        this.setState({visible: !this.state.visible});
    },
    onChange: function(moment, dateString) {
        this.setState({value: dateString, visible: false});
    },
    getValue: function(){
        return this.state.value;
    },
    render: function() {
        return (
            <div className="datepicker-wrapper">
                <Input type="text" ref="datepicker" className={this.props.inputClass} value={this.state.value} onClick={this.toggleDatepicker} onChange={this.handleInputChange} />
                {this.state.visible ?
                    <DatePicker hideFooter={true} date={this.state.value} onChange={this.onChange} />
                : null}
            </div>
        );
    }
});
