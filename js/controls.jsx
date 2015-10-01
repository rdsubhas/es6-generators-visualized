import React from 'react/addons';
var cx = React.addons.classSet;

var Controls = React.createClass({
  getDefaultProps: function() {
    return {
      playing: false,
      numSteps: 0,
      step: 0
    }
  },

  render: function() {
    var mainIcon = "fa fa-fw fa-lg " + (this.props.playing ? "fa-pause" : "fa-play");
    var playing = this.props.playing;
    var hasNext = this.props.step < this.props.numSteps-1;
    var hasPrev = this.props.step >= 0;

    return (
      <nav className="code--controls clearfix">
        <div className="center">
          <button className="btn btn-outline" onClick={this.props.doStepFirst} disabled={playing||!hasPrev} title="Restart">
            <i className="fa fa-fw fa-fast-backward"></i>
          </button>&nbsp;
          <button className="btn btn-outline" onClick={this.props.doStepBack} disabled={playing||!hasPrev} title="Step backward">
            <i className="fa fa-fw fa-step-backward"></i>
          </button>&nbsp;
          <button className="btn btn-outline blue px2" onClick={this.props.doTogglePlay} disabled={!hasNext} title="Play until next context switch">
            <i className={mainIcon}></i>
          </button>&nbsp;
          <button className="btn btn-outline" onClick={this.props.doStepNext} disabled={playing||!hasNext} title="Step forward">
            <i className="fa fa-fw fa-step-forward"></i>
          </button>&nbsp;
          <button className="btn btn-outline" onClick={this.props.doPlayEnd} disabled={playing||!hasNext} title="Play until end">
            <i className="fa fa-fw fa-forward"></i>
          </button>&nbsp;
        </div>
      </nav>
    );
  }
});

module.exports = Controls;
