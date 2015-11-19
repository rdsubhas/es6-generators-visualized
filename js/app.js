import React from 'react'
import ReactDOM from 'react-dom'
import Nav from './nav'
import Workspace from './workspace'
import reqwest from 'reqwest'

import template from 'lodash/string/template'
import isEmpty from 'lodash/lang/isEmpty'
import isNumber from 'lodash/lang/isNumber'

const I_HIGHLIGHT_REGEX = 3
const T_UNQUOTE_REGEX = /\"([^"]+)\"\:/g
const T_INSPECT_REGEX = /\$\{(.+)\}/
const T_INSPECT_REPLACEMENT = '<em>$1: \${inspectVariable($1)}</em>'

function inspectVariable (value) {
  if (isNumber(value) || !isEmpty(value)) {
    return JSON.stringify(value).replace(T_UNQUOTE_REGEX, '$1:')
  }
}

function templatify (lines) {
  return lines.map((line) => {
    return template(line.replace(T_INSPECT_REGEX, T_INSPECT_REPLACEMENT), {
      imports: {
        isEmpty: isEmpty,
        isNumber: isNumber,
        inspectVariable: inspectVariable
      }
    })
  })
}

const App = React.createClass({
  getInitialState: function () {
    return {
      tabName: 'fibonacci',
      panes: [],
      steps: [],
      vars: {}
    }
  },

  componentDidMount: function () {
    this.doLoadFile(this.state.tabName)
  },

  doLoadFile: function (tabName) {
    reqwest({
      url: tabName + '.json',
      type: 'json'
    }).then((data) => {
      this.setState({
        tabName: tabName,
        panes: data.panes.map((pane) => {
          pane.lines = templatify(pane.lines)
          return pane
        }),
        steps: data.steps.map((step) => {
          step[I_HIGHLIGHT_REGEX] = new RegExp('(' + step[I_HIGHLIGHT_REGEX] + ')')
          return step
        }),
        vars: data.vars
      })
    })
  },

  render: function () {
    return (
      <div className='code'>
        <Nav tabName={this.state.tabName} doLoadFile={this.doLoadFile} />
        <Workspace panes={this.state.panes} steps={this.state.steps} vars={this.state.vars} />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
