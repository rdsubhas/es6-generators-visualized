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
      step: -1,
      activePane: 0,
      activeVars: _.clone(this.props.vars || {}),
      positions: [],
      highlights: [],

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
      var state = this._computeNext(_.clone(this.state), this.props);
      this.setState(state);
    } else {
      this.setState({ playing: false });
    }
  },

  doStepBack: function() {
    if (this.props.panes.length > 0 && this.state.step > 0) {
      var state = this.getInitialState();
      for (var i=0; i<this.state.step; i++)
        this._computeNext(state, this.props);
      this.setState(state);
    }
  },

  _reset: function(props) {
    var state = this.getInitialState();
    state.activeVars = _.clone(props.vars);
    this.setState(this._computeNext(state, props));
  },

  _computeNext: function(state, props) {
    var step = state.step + 1;
    var stepData = props.steps[step];
    var positions = state.positions;
    var highlights = state.highlights;
    var activePane = stepData[0];
    positions[activePane] = stepData[1];
    var vars = stepData[2];
    highlights[activePane] = stepData[3];

    return _.merge(state, {
      step: step,
      activePane: activePane,
      positions: positions,
      highlights: highlights,
      activeVars: _.merge(state.activeVars, vars),
      playing: (state.pauseOnPaneChange && activePane!=state.activePane) ? false : state.playing
    });
  },

  render: function() {
    return (
      <div className="code--workspace">
        <Controls playing={this.state.playing} step={this.state.step} numSteps={this.props.steps.length}
          doTogglePlay={this.doTogglePlay} doPlayEnd={this.doPlayEnd} 
          doStepNext={this.doStepNext} doStepFirst={this.doStepFirst} doStepBack={this.doStepBack} />
        <div className="code--panes">
          {this.props.panes.map((code, i) => { return (
              <Pane key={i} name={code.name} 
                lines={code.lines} line={this.state.positions[i]} active={this.state.activePane == i}
                vars={this.state.activeVars} highlight={this.state.highlights[i]} />
          )})}
        </div>
      </div>
    );
  },

  componentDidUpdate: function() {
    if (this.state.playing) {
      this.setTimeout(() => {
        this.doStepNext();
      }, this.state.playSpeed);
    }
  }
});

module.exports = Workspace;
