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

const PLAY_SPEED_NORMAL = 500
const PLAY_SPEED_FAST = 500

class Workspace extends React.Component {

  static defaultProps = {
    panes: [],
    steps: [],
    vars: {}
  }

  constructor (props) {
    super(props)
    this.state = this._getInitialState()
  }

  _getInitialState () {
    return {
      step: -1,
      activePane: 0,
      activeVars: cloneDeep(this.props.vars || {}),
      positions: [],
      highlights: [],

      playing: false,
      playSpeed: PLAY_SPEED_NORMAL,
      pauseOnPaneChange: true
    }
  }

  componentWillReceiveProps (nextProps) {
    this._reset(nextProps)
  }

  doTogglePlay () {
    this.setState({ playing: !this.state.playing, playSpeed: PLAY_SPEED_NORMAL, pauseOnPaneChange: true })
  }

  doPlayEnd () {
    this.setState({ playing: !this.state.playing, playSpeed: PLAY_SPEED_FAST, pauseOnPaneChange: false })
  }

  doStepFirst () {
    this._reset(this.props)
  }

  doStepNext () {
    if (this.props.panes.length > 0 && this.state.step < (this.props.steps.length - 1)) {
      let state = this._computeNext(cloneDeep(this.state), this.props)
      this.setState(state)
    } else {
      this.setState({ playing: false })
    }
  }

  doStepBack () {
    if (this.props.panes.length > 0 && this.state.step > 0) {
      let state = this._getInitialState()
      for (let i = 0; i < this.state.step; i++) {
        this._computeNext(state, this.props)
      }
      this.setState(state)
    }
  }

  _reset (props) {
    let state = this._getInitialState()
    state.activeVars = cloneDeep(props.vars)
    this.setState(this._computeNext(state, props))
  }

  _computeNext (state, props) {
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
  }

  render () {
    return (
      <div className='code--workspace'>
        <Controls playing={this.state.playing} step={this.state.step} numSteps={this.props.steps.length}
          doTogglePlay={this.doTogglePlay} doPlayEnd={this.doPlayEnd}
          doStepNext={this.doStepNext} doStepFirst={this.doStepFirst} doStepBack={this.doStepBack} />
        <div className='code--panes'>
          {this.props.panes.map((pane, i) => {
            return <Pane key={i} name={pane.name} lines={pane.lines} stars={pane.stars}
                position={this.state.positions[i]} active={this.state.activePane === i}
                vars={this.state.activeVars} highlight={this.state.highlights[i]} />
          })}
        </div>
      </div>
    )
  }

  componentDidUpdate () {
    if (this.state.playing) {
      this.setTimeout(() => {
        this.doStepNext()
      }, this.state.playSpeed)
    }
  }

}

export default ReactEs6(Workspace).mixins(TimerMixin).autobind()
