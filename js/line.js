import React from 'react'
import ReactEs6 from './react-es6'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import isEmpty from 'lodash/lang/isEmpty'
import isNumber from 'lodash/lang/isNumber'
import cx from 'classnames'

const I_LINE = 0
const I_INSPECT = 1
const T_UNQUOTE_REGEX = /"([^"]+)":/g

function pp(value) {
  if (isNumber(value) || !isEmpty(value)) {
    return JSON.stringify(value)
      .replace('"undefined"', 'undefined')
      .replace(T_UNQUOTE_REGEX, '$1:')
  } else {
    return null
  }
}

class Line extends React.Component {

  render() {
    let props = this.props
    let active = props.lineNo === props.position
    let html = props.line[I_LINE]
    let stdout = props.stdout[props.line.id]
    let inspectVar = props.line[I_INSPECT]

    if (active && props.highlight) {
      html = html.replace(props.highlight, '<b>$1</b>')
    }

    return (
      <tr className={cx('line', { 'active': active })}>
        <td className='line--no'>
          <span>{props.lineNo + 1}</span>
        </td>
        <td className='line--data'>
          <span className='line--code' dangerouslySetInnerHTML={{ __html: html }}></span>
          <span className={cx('line--var', { hide: !inspectVar })}>
            {inspectVar}: {inspectVar ? pp(this.props.vars[inspectVar]) : null}
          </span>
          <span className={cx('line--stdout', { hide: !stdout})}>
            &raquo; {stdout ? pp(stdout) : null}
          </span>
        </td>
      </tr>
    )
  }

}

export default ReactEs6(Line).mixin(PureRenderMixin)
