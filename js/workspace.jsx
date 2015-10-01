import _ from 'lodash';
import React from 'react/addons';
import TimerMixin from 'react-timer-mixin';
import Pane from './pane.jsx';
import Controls from './controls.jsx';
var cx = React.addons.classSet;

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
      activeVars: _.clone(this.props.vars || {}),
      positions: [0, null, null],

      playing: false,
      playSpeed: 500,
      pauseOnPaneChange: true
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this._reset(nextProps);
  },

  doTogglePlay: function() {
    this.setState({ playing: !this.state.playing, playSpeed: 500, pauseOnPaneChange: true });
  },

  doPlayEnd: function() {
    this.setState({ playing: !this.state.playing, playSpeed: 300, pauseOnPaneChange: false });
  },

  doStepFirst: function() {
    this._reset(this.props);
  },

  doStepNext: function() {
    if (this.props.panes.length > 0 && this.state.step < this.props.steps.length-1) {
      var state = this._computeNext(_.clone(this.state));
      this.setState(state);
    }
  },

  doStepBack: function() {
    if (this.props.panes.length > 0 && this.state.step > 0) {
      var state = this.getInitialState();
      for (var i=0; i<this.state.step-1; i++)
        this._computeNext(state);
      this.setState(state);
    }
  },

  _reset: function(props) {
    var state = this.getInitialState();
    state.activeVars = _.clone(props.vars);
    this.setState(state);
  },

  _computeNext: function(oldState) {
    var step = oldState.step + 1;
    var stepData = this.props.steps[step];
    var positions = oldState.positions;
    var activePane = stepData[0];
    var vars = stepData[2];
    positions[activePane] = stepData[1];

    return _.merge(oldState, {
      step: step,
      activePane: activePane,
      positions: positions,
      activeVars: _.merge(oldState.activeVars, vars),
      playing: (oldState.pauseOnPaneChange && activePane != oldState.activePane ? false : oldState.playing)
    });
  },

  render: function() {
    if (this.state.playing) {
      this.setTimeout(() => {
        this.doStepNext();
      }, this.state.playSpeed);
    }

    return (
      <div className="code--workspace">
        <Controls playing={this.state.playing} step={this.state.step} numSteps={this.props.steps.length}
          doTogglePlay={this.doTogglePlay} doPlayEnd={this.doPlayEnd} 
          doStepNext={this.doStepNext} doStepFirst={this.doStepFirst} doStepBack={this.doStepBack} />
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
