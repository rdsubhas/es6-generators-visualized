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
    if (this.state.step < this.props.steps.length-hops) {
      this._loadStepState(this.state.step + hops);
    }
  },

  _loadStepState: function(step) {
    if (this.props.panes.length < 1) return;
    var stepData = this.props.steps[step];

    if (stepData == null) {
      this.setState({
        playing: false,
        step: step
      });
    } else {
      var positions = this.state.positions;
      var activePane = stepData[0];
      var vars = stepData[2];
      positions[activePane] = stepData[1];

      this.setState({
        step: step,
        activePane: activePane,
        positions: positions,
        activeVars: _.merge(this.state.activeVars, vars)
      });
    }
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
