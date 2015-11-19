import React from 'react'
import TimerMixin from 'react-timer-mixin'
import Pane from './pane'
import Controls from './controls'
import merge from 'lodash/object/merge'
import cloneDeep from 'lodash/lang/cloneDeep'

const I_ACTIVE_PANE = 0
const I_ACTIVE_LINE = 1
const I_UPDATED_VARS = 2
const I_HIGHLIGHT_REGEX = 3

const Workspace = React.createClass({
  mixins: [TimerMixin],

  getDefaultProps: function () {
    return {
      panes: [],
      steps: [],
      vars: {}
    }
  },

  getInitialState: function () {
    return {
      step: -1,
      activePane: 0,
      activeVars: cloneDeep(this.props.vars || {}),
      positions: [],
      highlights: [],

      playing: false,
      playSpeed: 500,
      pauseOnPaneChange: true
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this._reset(nextProps)
  },

  doTogglePlay: function () {
    this.setState({ playing: !this.state.playing, playSpeed: 500, pauseOnPaneChange: true })
  },

  doPlayEnd: function () {
    this.setState({ playing: !this.state.playing, playSpeed: 300, pauseOnPaneChange: false })
  },

  doStepFirst: function () {
    this._reset(this.props)
  },

  doStepNext: function () {
    if (this.props.panes.length > 0 && this.state.step < (this.props.steps.length - 1)) {
      let state = this._computeNext(cloneDeep(this.state), this.props)
      this.setState(state)
    } else {
      this.setState({ playing: false })
    }
  },

  doStepBack: function () {
    if (this.props.panes.length > 0 && this.state.step > 0) {
      let state = this.getInitialState()
      for (let i = 0; i < this.state.step; i++) {
        this._computeNext(state, this.props)
      }
      this.setState(state)
    }
  },

  _reset: function (props) {
    let state = this.getInitialState()
    state.activeVars = cloneDeep(props.vars)
    this.setState(this._computeNext(state, props))
  },

  _computeNext: function (state, props) {
    let step = state.step + 1
    let stepData = props.steps[step]
    let positions = state.positions
    let highlights = state.highlights
    let activePane = stepData[I_ACTIVE_PANE]
    positions[activePane] = stepData[I_ACTIVE_LINE]
    let vars = stepData[I_UPDATED_VARS]
    highlights[activePane] = stepData[I_HIGHLIGHT_REGEX]

    return merge(state, {
      step: step,
      activePane: activePane,
      positions: positions,
      highlights: highlights,
      activeVars: merge(state.activeVars, vars),
      playing: (state.pauseOnPaneChange && activePane !== state.activePane) ? false : state.playing
    })
  },

  render: function () {
    return (
      <div className='code--workspace'>
        <Controls playing={this.state.playing} step={this.state.step} numSteps={this.props.steps.length}
          doTogglePlay={this.doTogglePlay} doPlayEnd={this.doPlayEnd}
          doStepNext={this.doStepNext} doStepFirst={this.doStepFirst} doStepBack={this.doStepBack} />
        <div className='code--panes'>
          {this.props.panes.map((code, i) => {
            return <Pane key={i} name={code.name}
                lines={code.lines} position={this.state.positions[i]} active={this.state.activePane === i}
                vars={this.state.activeVars} highlight={this.state.highlights[i]} />
          })}
        </div>
      </div>
    )
  },

  componentDidUpdate: function () {
    if (this.state.playing) {
      this.setTimeout(() => {
        this.doStepNext()
      }, this.state.playSpeed)
    }
  }
})

export default Workspace
