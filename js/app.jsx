import reqwest from 'reqwest';
import React from 'react';
import Nav from './nav.jsx';
import Pane from './pane.jsx';

var App = React.createClass({
  getInitialState: function() {
    return {
      fileName: './data/fibonacci.json',
      codes: [],
      steps: [],
      step: 0
    }
  },

  componentDidMount: function() {
    reqwest({
      url: this.state.fileName,
      type: 'json'
    }).then((data) => {
      this.setState({
        codes: data.codes,
        steps: data.steps,
        step: 0
      });
    });
  },

  onStepNext: function() {
    var step = this.state.step + 1;
    if (step < this.state.steps.length) {
      this.setState({ step: step });
    }
  },

  onStepPrev: function() {
    var step = this.state.step - 1;
    if (step >= 0) {
      this.setState({ step: step });
    }
  },

  render: function() {
    var currentStep = this.state.steps[this.state.step];
    return (
      <div className="code">
        <Nav fileName={this.state.fileName} steps={this.state.steps} step={this.state.step}
             onStepNext={this.onStepNext} onStepPrev={this.onStepPrev} />
        <div className="code--panes">
          {this.state.codes.map((code, i) => {
            var lineStep = currentStep[i];
            return (
              <Pane key={i} name={code.name} lines={code.lines} 
                    active={lineStep.active} line={lineStep.line} />
              )
          })}
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
