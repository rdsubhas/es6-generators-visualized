import React from 'react'
import ReactEs6 from './react-es6'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import cx from 'classnames'

class Controls extends React.Component {

  static defaultProps = {
    playing: false,
    numSteps: 0,
    step: 0
  }

  render() {
    let playing = this.props.playing
    let hasNext = this.props.step < (this.props.numSteps - 1)
    let hasPrev = this.props.step > 0
    let percent = Math.round(Math.max(this.props.step, 0) * 100.0 / (this.props.numSteps - 1)) + '%'

    return (
      <nav className='code--controls clearfix'>
        <div className='center'>
          <button className='btn btn-outline' onClick={this.props.doTogglePlaySpeed} title='Play speed'>
            <small>{this.props.playSpeed+1}x</small>
          </button>

          <button className='btn btn-outline' onClick={this.props.doStepFirst} disabled={playing || !hasPrev} title='First step'>
            <i className='fa fa-fw fa-fast-backward'></i>
          </button>

          <button className='btn btn-outline' onClick={this.props.doStepBack} disabled={playing || !hasPrev} title='Previous step'>
            <i className='fa fa-fw fa-backward'></i>
          </button>

          <button className='btn btn-outline blue' onClick={this.props.doTogglePlay} disabled={!hasNext} title='Play'>
            <i className='fa fa-lg fa-pause' style={{display: this.props.playing ? 'inline' : 'none'}}></i>
            <i className='fa fa-lg fa-play' style={{display: this.props.playing ? 'none' : 'inline'}}></i>
          </button>

          <button className='btn btn-outline' onClick={this.props.doStepNext} disabled={playing || !hasNext} title='Next step'>
            <i className='fa fa-fw fa-forward'></i>
          </button>

          <button className='btn btn-outline' onClick={this.props.doStepLast} disabled={playing || !hasNext} title='Last step'>
            <i className='fa fa-fw fa-fast-forward'></i>
          </button>

          <button className='btn btn-outline' onClick={this.props.doToggleBreak} title='Break on context switch'>
            <i className={cx('fa fa-fw fa-random', { red: this.props.pauseOnPaneChange })}></i>
          </button>
        </div>
        
        <div className='code--progress' style={{width: percent}}>&nbsp;</div>
      </nav>
    )
  }

}

export default ReactEs6(Controls).mixin(PureRenderMixin)
