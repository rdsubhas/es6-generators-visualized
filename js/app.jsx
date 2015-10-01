import React from 'react/addons';
import Nav from './nav.jsx';
import Workspace from './workspace.jsx';
import template from 'lodash/string/template';
import reqwest from 'reqwest';

function templatify(lines) {
  var regex = /\$\{(.+)\}/;
  var replacement = '<em>$1:\${$1}</em>';
  return lines.map((line) => {
    return template(line.replace(regex, replacement));
  });
}

var App = React.createClass({
  getInitialState: function() {
    return {
      tabName: 'fibonacci',
      panes: [],
      steps: [],
      vars: {}
    }
  },

  componentDidMount: function() {
    this.doLoadFile(this.state.tabName);
  },

  doLoadFile: function(tabName) {
    reqwest({
      url: tabName + ".json",
      type: 'json'
    }).then((data) => {
      this.setState({
        tabName: tabName,
        panes: data.panes.map((pane) => {
          pane.lines = templatify(pane.lines);
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
        <Nav tabName={this.state.tabName} doLoadFile={this.doLoadFile} />
        <Workspace panes={this.state.panes} steps={this.state.steps} vars={this.state.vars} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
