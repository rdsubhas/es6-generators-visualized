import React from 'react/addons';
var cx = React.addons.classSet;

var Controls = React.createClass({
  getDefaultProps: function() {
    return {
      playing: false
    }
  },

  render: function() {
    var mainIcon = "fa fa-fw fa-lg " + (this.props.playing ? "fa-pause" : "fa-play");
    return (
      <nav className="code--controls clearfix">
        <div className="center">
          <button className="btn btn-outline"onClick={this.props.doStepFirst}>
            <i className="fa fa-fw fa-fast-backward"></i>
          </button>&nbsp;
          <button className="btn btn-outline" disabled="disabled">
            <i className="fa fa-fw fa-step-backward"></i>
          </button>&nbsp;
          <button className="btn btn-outline blue px2" onClick={this.props.doTogglePlay}>
            <i className={mainIcon}></i>
          </button>&nbsp;
          <button className="btn btn-outline" onClick={this.props.doStepNext} disabled={this.props.playing}>
            <i className="fa fa-fw fa-step-forward"></i>
          </button>&nbsp;
          <button className="btn btn-outline" disabled="disabled">
            <i className="fa fa-fw fa-fast-forward"></i>
          </button>&nbsp;
        </div>
      </nav>
    );
  }
});

module.exports = Controls;
