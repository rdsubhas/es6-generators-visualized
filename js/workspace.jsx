import _ from 'lodash';
import React from 'react/addons';
import TimerMixin from 'react-timer-mixin';
import Pane from './pane.jsx';
import Controls from './controls.jsx';
var cx = React.addons.classSet;

var INTERVAL = 500;

var Workspace = React.createClass({
  mixins: [TimerMixin],

  getDefaultProps: function() {
    return {
      panes: [],
      steps: [],
      vars: {}
    }
  },

  getInitialState: function() {
    return {
      step: 0,
      activePane: 0,
      activeVars: {},
      positions: [0, null, null],
      playing: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this._reset(nextProps);
  },

  doTogglePlay: function() {
    this.setState({ playing: !this.state.playing });
  },

  doStepFirst: function() {
    this._reset(this.props);
  },

  doStepNext: function() {
    var stepData = this.props.steps[this.state.step + 1];
    this._stepNext(stepData ? 1 : 2);
  },

  _reset: function(props) {
    var state = this.getInitialState();
    state.activeVars = _.clone(props.vars);
    this.setState(state);
  },

  _stepNext: function(hops) {
    if (this.props.panes.length > 0 && this.state.step < this.props.steps.length-hops) {
      var state = _.clone(this.state);
      for (var i=0; i<hops; i++) _.merge(state, this._computeNext(state));
      this.setState(state);
    }
  },

  _computeNext: function(oldState) {
    var step = oldState.step + 1;
    var stepData = this.props.steps[step];
    var positions = oldState.positions;
    var activePane = stepData[0];
    var vars = stepData[2];
    positions[activePane] = stepData[1];

    return {
      step: step,
      activePane: activePane,
      positions: positions,
      activeVars: _.merge(oldState.activeVars, vars),
      playing: (activePane == oldState.activePane ? oldState.playing : false)
    };
  },

  render: function() {
    if (this.state.playing) {
      this.setTimeout(() => {
        this._stepNext(1);
      }, INTERVAL);
    }

    return (
      <div className="code--workspace">
        <Controls playing={this.state.playing} doTogglePlay={this.doTogglePlay} 
          doStepNext={this.doStepNext} doStepFirst={this.doStepFirst} />
        <div className="code--panes">
          {this.props.panes.map((code, i) => { return (
              <Pane key={i} name={code.name} lines={code.lines} active={this.state.activePane == i}
                line={this.state.positions[i]} vars={this.state.activeVars} />
          )})}
        </div>
      </div>
    );
  }
});

module.exports = Workspace;
