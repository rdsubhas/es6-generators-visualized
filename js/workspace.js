import React from 'react'
import ReactEs6 from './react-es6'
import TimerMixin from 'react-timer-mixin'
import Pane from './pane'
import Controls from './controls'
import merge from 'lodash/object/merge'
import cloneDeep from 'lodash/lang/cloneDeep'

const I_ACTIVE_PANE = 0
const I_ACTIVE_LINE = 1
const I_UPDATED_VARS = 2
const I_HIGHLIGHT_REGEX = 3

const PLAY_SPEED_MULTIPLIER = 300

class Workspace extends React.Component {

  static defaultProps = {
    panes: [],
    steps: [],
    vars: {}
  }

  constructor (...args) {
    super(...args)
    this.state = this._getInitialState()
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.state.step = -1
    this.doStepFirst()
  }

  doTogglePlay () {
    let newPlaying = !this.state.playing
    if (newPlaying) {
      this.state.playing = true
      this.doStepNext()
    } else {
      this.setState({ playing: false })
    }
  }

  doTogglePlaySpeed() {
    let newPlaySpeed = (this.state.playSpeed + 1) % 3
    this.setState({ playSpeed: newPlaySpeed })
  }

  doStepFirst () {
    this._gotoStep(0)
  }

  doStepNext () {
    this._gotoStep(this.state.step + 1)
  }

  doStepBack () {
    this._gotoStep(this.state.step - 1)
  }

  doStepLast () {
    this._gotoStep(this.props.steps.length - 1)
  }

  doToggleBreak () {
    this.setState({ pauseOnPaneChange: !this.state.pauseOnPaneChange })
  }

  _getInitialState () {
    return {
      step: -1,
      activePane: 0,
      activeVars: cloneDeep(this.props.vars || {}),
      positions: [],
      highlights: [],

      playing: false,
      playSpeed: 0,
      pauseOnPaneChange: false
    }
  }

  _gotoStep (step) {
    if (step >=0 && step < this.props.steps.length && this.props.panes.length > 0) {
      let state = (this.state.step < 0 || step < this.state.step) ? this._getInitialState() : cloneDeep(this.state)
      for (let i = state.step+1; i <= step; i++) {
        this._computeNextStep(state, this.props)
      }
      this.setState(state)
    } else {
      this.setState({ playing: false })
    }
  }

  _computeNextStep (state, props) {
    let step = state.step + 1
    if (props.panes.length === 0 || step < 0 || step >= props.steps.length) {
      state.playing = false
      return state;
    }

    let stepData = props.steps[step]
    let positions = state.positions
    let highlights = state.highlights
    let activePane = stepData[I_ACTIVE_PANE]
    positions[activePane] = stepData[I_ACTIVE_LINE]
    let vars = stepData[I_UPDATED_VARS]
    highlights[activePane] = stepData[I_HIGHLIGHT_REGEX]

    merge(state, {
      step: step,
      activePane: activePane,
      positions: positions,
      highlights: highlights,
      activeVars: merge(state.activeVars, vars),
      playing: (state.pauseOnPaneChange && activePane !== state.activePane) ? false : state.playing
    })
  }

  render () {
    return (
      <div className='code--workspace'>
        <Controls playing={this.state.playing} step={this.state.step} numSteps={this.props.steps.length} 
          pauseOnPaneChange={this.state.pauseOnPaneChange} playSpeed={this.state.playSpeed}
          doTogglePlay={this.doTogglePlay} doToggleBreak={this.doToggleBreak} doTogglePlaySpeed={this.doTogglePlaySpeed}
          doStepFirst={this.doStepFirst} doStepBack={this.doStepBack} 
          doStepNext={this.doStepNext} doStepLast={this.doStepLast} />

        <div className='code--panes'>
          {this.renderPanes()}
        </div>
      </div>
    )
  }

  renderPanes () {
    return this.props.panes.map((pane, i) => {
      return <Pane key={i} name={pane.name} lines={pane.lines} stars={pane.stars}
          position={this.state.positions[i]} active={this.state.activePane === i}
          vars={this.state.activeVars} highlight={this.state.highlights[i]} />
    })
  }

  componentDidUpdate () {
    if (this.state.playing) {
      let interval = (3 - this.state.playSpeed) * PLAY_SPEED_MULTIPLIER
      this.setTimeout(this.doStepNext, interval)
    }
  }

}

export default ReactEs6(Workspace).mixins(TimerMixin).autobind()
