import React from 'react'
import cx from 'classnames'

const Line = (props) => {
  let active = props.lineNo === props.position
  let html = props.line(props.vars)
  let star = null

  if (active && props.highlight) {
    html = html.replace(props.highlight, '<b>$1</b>')
  }

  if (props.star) {
    star = <i className='fa fa-star'></i>
  }

  return (
    <tr className={cx({ 'active': active })}>
      <td>
        {star}
        <span>{props.lineNo + 1}</span>
      </td>
      <td dangerouslySetInnerHTML={{ __html: html }}></td>
    </tr>
  )
}

export default Line
