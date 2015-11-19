import React from 'react'
import Line from './line'
import cx from 'classnames'

const Pane = React.createClass({
  getDefaultProps: function () {
    return {
      active: false,
      highlight: null,
      vars: {},
      name: '',
      lines: [],
      position: -1
    }
  },

  render: function () {
    let lines = this.props.lines.map((line, i) => {
      return <Line key={i} line={line} lineNo={i} position={this.props.position}
        vars={this.props.vars} highlight={this.props.highlight} />
    })

    return (
      <div className={cx({ 'code--pane': true, 'active': this.props.active })}>
        <table className='code--table'>
          <thead>
            <tr>
              <th colSpan='2'>{this.props.name}</th>
            </tr>
          </thead>
          <tbody>
            {lines}
          </tbody>
        </table>
      </div>
    )
  }
})

export default Pane
