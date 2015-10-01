import React from 'react/addons';

var Controls = React.createClass({
  getDefaultProps: function() {
    return {
      playing: false,
      numSteps: 0,
      step: 0
    }
  },

  render: function() {
    var playing = this.props.playing;
    var hasNext = this.props.step < this.props.numSteps-1;
    var hasPrev = this.props.step > 0;

    return (
      <nav className="code--controls clearfix">
        <div className="center">
          <button className="btn btn-outline" onClick={this.props.doStepFirst} disabled={playing||!hasPrev} title="Restart">
            <i className="fa fa-fw fa-fast-backward"></i>
          </button>
          <button className="btn btn-outline" onClick={this.props.doStepBack} disabled={playing||!hasPrev} title="Step backward">
            <i className="fa fa-fw fa-backward"></i>
          </button>
          <button className="btn btn-outline blue" onClick={this.props.doTogglePlay} disabled={!hasNext} title="Play until next context switch">
            <i className="fa fa-lg fa-pause" style={{display: this.props.playing?'inline':'none'}}></i>
            <i className="fa fa-lg fa-play" style={{display: this.props.playing?'none':'inline'}}></i>
            <i className="fa fa-lg fa-ellipsis-v" style={{display: this.props.playing?'none':'inline'}}></i>
          </button>
          <button className="btn btn-outline" onClick={this.props.doStepNext} disabled={playing||!hasNext} title="Step forward">
            <i className="fa fa-fw fa-forward"></i>
          </button>
          <button className="btn btn-outline" onClick={this.props.doPlayEnd} disabled={playing||!hasNext} title="Play until end">
            <i className="fa fa-fw fa-fast-forward"></i>
          </button>
        </div>
      </nav>
    );
  }
});

module.exports = Controls;
