import reqwest from 'reqwest';
import React from 'react';
import Pane from './pane.jsx';

var App = React.createClass({
  getInitialState: function() {
    return {
      filename: './data/fibonacci.json',
      codes: [],
      steps: [],
      step: 0
    }
  },

  componentDidMount: function() {
    reqwest({
      url: this.state.filename,
      type: 'json'
    }).then((data) => {
      this.setState({
        codes: data.codes,
        steps: data.steps,
        step: 0
      });
    });
  },

  render: function() {
    return (
      <div className="code">
        <div className="code--panes">
          {this.state.codes.map((code, i) => { return (
            <Pane key={i} name={code.name} lines={code.lines} step={this.state.steps[this.state.step]} />
          )})}
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
