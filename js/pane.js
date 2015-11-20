import React from 'react'
import Line from './line'
import cx from 'classnames'

class Pane extends React.Component {

  static defaultProps = {
    active: false,
    highlight: null,
    vars: {},
    stars: [],
    name: '',
    lines: [],
    position: -1
  }

  render () {
    let lines = this.props.lines.map((line, i) => {
      let star = this.props.stars.indexOf(i) !== -1
      return <Line key={i} line={line} lineNo={i} position={this.props.position}
        vars={this.props.vars} highlight={this.props.highlight} star={star} />
    })

    return (
      <div className={cx('code--pane', { 'active': this.props.active })}>
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

}

export default Pane
