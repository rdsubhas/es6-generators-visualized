import React from 'react'
import cx from 'classnames'

const Line = (props) => {
  let active = props.lineNo === props.position
  let html = props.line(props.vars)

  if (active && props.highlight) {
    html = html.replace(props.highlight, '<b>$1</b>')
  }

  return (
    <tr className={cx({ 'active': active })}>
      <td>{props.lineNo + 1}</td>
      <td dangerouslySetInnerHTML={{ __html: html }}></td>
    </tr>
  )
}

export default Line
