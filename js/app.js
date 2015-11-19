import React from 'react/addons';
import Nav from './nav';
import Workspace from './workspace';
import reqwest from 'reqwest';

import template from 'lodash/string/template';
import isEmpty from 'lodash/lang/isEmpty';
import isNumber from 'lodash/lang/isNumber';

const I_HIGHLIGHT_REGEX = 3;
const UNQUOTE_REGEX = /\"([^"]+)\"\:/g;

function inspectVariable(value) {
  if (isNumber(value) || !isEmpty(value)) {
    return JSON.stringify(value).replace(UNQUOTE_REGEX, "$1:");
  }
}

function templatify(lines) {
  var regex = /\$\{(.+)\}/;
  var replacement = '<em>$1: \${inspectVariable($1)}</em>';
  return lines.map((line) => {
    return template(line.replace(regex, replacement), {
      imports: {
        isEmpty: isEmpty,
        isNumber: isNumber,
        inspectVariable: inspectVariable
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
