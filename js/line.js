import React from 'react'
import ReactEs6 from './react-es6'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import isEmpty from 'lodash/lang/isEmpty'
import isNumber from 'lodash/lang/isNumber'
import cx from 'classnames'

const I_LINE = 0
const I_INSPECT = 1
const T_UNQUOTE_REGEX = /"([^"]+)":/g

class Line extends React.Component {

  _inspectVar (inspectVar) {
    let value = this.props.vars[inspectVar]
    if (isNumber(value) || !isEmpty(value)) {
      value = JSON.stringify(value)
        .replace('"undefined"', 'undefined')
        .replace(T_UNQUOTE_REGEX, '$1:')
    } else {
      value = null
    }
    return `${inspectVar}: ${value == null ? '' : value}`
  }

  render() {
    let props = this.props
    let active = props.lineNo === props.position
    let html = props.line[I_LINE]
    let inspectVar = props.line[I_INSPECT]

    if (active && props.highlight) {
      html = html.replace(props.highlight, '<b>$1</b>')
    }

    if (inspectVar) {
      html = html + this._inspectVar(inspectVar)
    }

    return (
      <tr className={cx({ 'active': active })}>
        <td>
          <span>{props.lineNo + 1}</span>
        </td>
        <td dangerouslySetInnerHTML={{ __html: html }}></td>
      </tr>
    )
  }

}

export default ReactEs6(Line).mixin(PureRenderMixin)
