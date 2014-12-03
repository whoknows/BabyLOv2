/** @jsx React.DOM */

var {Input,Button} = require('react-bootstrap');
var Select = require('components/Select/Select.js');
var UserStore = require('stores/UserStore.js');

module.exports = React.createClass({
    getSelectContent: function() {
        var ret = [];

        UserStore.getUsers().map(function(datum, i){
            if (datum.enabled == 1) {
                ret.push(<UserImage user={datum.id} />);
            }
        });

        return ret;
    },
    render: function () {
        var selectContent = this.getSelectContent();

        return (
            <div className="content-wrapper">
                <h3>Ajouter une partie</h3>
                <div className="row-fluid">
                    <div className="col-md-12">
                        <h4>Date</h4>
                        <div className="row">
                            <div className="col-md-3">
                                <Input ref="date" type="text" placeholder="Date" value="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Equipe 1</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <Select ref="p1t1" placeholder="Joueur 1" data={selectContent} />
                            </div>
                            <div className="col-md-12">
                                <Input ref="p2t1" type="text" placeholder="Joueur 2" value="" />
                            </div>
                            <div className="col-md-12">
                                <Input ref="st1" type="text" placeholder="Score" value="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Equipe 2</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <Input ref="p1t2" type="text" placeholder="Joueur 1" value="" />
                            </div>
                            <div className="col-md-12">
                                <Input ref="p2t2" type="text" placeholder="Joueur 2" value="" />
                            </div>
                            <div className="col-md-12">
                                <Input ref="st2" type="text" placeholder="Score" value="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
