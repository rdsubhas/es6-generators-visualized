import _ from 'lodash';
import reqwest from 'reqwest';
import React from 'react';
import Nav from './nav.jsx';
import Workspace from './workspace.jsx';

function convertLinesToTemplate(lines) {
  var regex = /\$\{(.+)\}/;
  var replacement = '<em>$1:\${$1}</em>';
  return lines.map((line) => {
    return _.template(line.replace(regex, replacement));
  });
}

var App = React.createClass({
  getInitialState: function() {
    return {
      fileName: './fibonacci.json',
      panes: [],
      steps: [],
      vars: {}
    }
  },

  componentDidMount: function() {
    this.loadFile(this.state.fileName);
  },

  loadFile: function(fileName) {
    reqwest({
      url: fileName,
      type: 'json'
    }).then((data) => {
      this.setState({
        fileName: fileName,
        panes: data.panes.map((pane) => {
          pane.lines = convertLinesToTemplate(pane.lines);
          return pane;
        }),
        steps: data.steps,
        vars: data.vars
      });
    });
  },

  render: function() {
    return (
      <div className="code">
        <Nav fileName={this.state.fileName} />
        <Workspace panes={this.state.panes} steps={this.state.steps} vars={this.state.vars} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
