import React from 'react'
import ReactEs6 from './react-es6'

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
    return JSON.stringify(value)
      .replace(T_UNQUOTE_REGEX, '$1:')
      .replace('"undefined"', 'undefined')
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

class Example extends React.Component {

  constructor (...args) {
    super(...args)
    this.state = {
      panes: [],
      steps: [],
      vars: {}
    }
  }

  componentDidMount () {
    this.doLoadFile()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.params.exampleId !== this.props.params.exampleId) {
      this.doLoadFile()
    }
  }

  doLoadFile () {
    reqwest({
      url: this.props.params.exampleId + '.json',
      type: 'json'
    }).then((data) => {
      this.setState({
        panes: data.panes.map((pane) => {
          pane.lines = templatify(pane.lines)
          return pane
        }),
        steps: data.steps.map((step) => {
          if (step[I_HIGHLIGHT_REGEX]) {
            step[I_HIGHLIGHT_REGEX] = new RegExp('(' + step[I_HIGHLIGHT_REGEX] + ')')
          }
          return step
        }),
        vars: data.vars
      })
    })
  }

  render () {
    return (
      <Workspace panes={this.state.panes} steps={this.state.steps} vars={this.state.vars} />
    )
  }

}

export default ReactEs6(Example).autobind()