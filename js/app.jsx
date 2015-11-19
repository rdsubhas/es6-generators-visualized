import React from 'react/addons';
import Nav from './nav.jsx';
import Workspace from './workspace.jsx';
import reqwest from 'reqwest';

import template from 'lodash/string/template';
import isEmpty from 'lodash/lang/isEmpty';
import isNumber from 'lodash/lang/isNumber';

const I_HIGHLIGHT_REGEX = 3;

function templatify(lines) {
  var regex = /\$\{(.+)\}/;
  var replacement = '<em>$1: \${isNumber($1) || !isEmpty($1) ? JSON.stringify($1) : null}</em>';
  return lines.map((line) => {
    return template(line.replace(regex, replacement), {
      imports: {
        isEmpty: isEmpty,
        isNumber: isNumber
      }
    });
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
        steps: data.steps.map((step) => {
          step[I_HIGHLIGHT_REGEX] = new RegExp("(" + step[I_HIGHLIGHT_REGEX] + ")");
          return step;
        }),
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
