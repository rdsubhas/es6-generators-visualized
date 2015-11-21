import React from 'react'
import ReactEs6 from './react-es6'
import cx from 'classnames'

const EXAMPLES = [
  'Basic',
  'Return',
  'Iterator',
  'Fibonacci'
]

class Nav extends React.Component {

  constructor (...args) {
    super(...args)
    this.state = { dropdownOpen: false }
  }

  componentWillReceiveProps () {
    this.setState({ dropdownOpen: false })
  }

  render () {
    let exampleIndex = parseInt(this.props.exampleId || '0') - 1
    let hasNext = exampleIndex < (EXAMPLES.length - 1)
    let hasPrev = exampleIndex > 0

    return (
      <nav className='code--nav clearfix white bg-blue'>
        <div className='left'>
          <a className='btn btn-primary h3' href='#/'>
            ES6 Generators Visualized
          </a>
          <a className='btn btn-primary border-left' href='https://github.com/rdsubhas/es6-generators-visualized' target='_blank'>
            <i className='fa fa-github fa-lg'></i>
          </a>
          <a className='btn btn-primary border-left' href='https://davidwalsh.name/es6-generators' target='_blank'>
            <i className='fa fa-pencil-square fa-lg'></i>
          </a>
        </div>
        <div className='right'>
          <a className={cx('btn btn-primary', { hide: !hasPrev })} href={'#/example/' + exampleIndex}>
            <i className='fa fa-chevron-left'></i>
          </a>
          <a className='btn btn-primary border-left border-right' onClick={this.doToggleDropdown}>
            <span>
              {exampleIndex >= 0 ? `${exampleIndex+1}. ${EXAMPLES[exampleIndex]}` : 'Examples'}
            </span>
            <i className='fa fa-fw fa-angle-down'></i>
          </a>
          <a className={cx('btn btn-primary', { hide: !hasNext })} href={'#/example/' + (exampleIndex+2)}>
            <i className='fa fa-chevron-right'></i>
          </a>

          <div className={cx('fixed top-0 right-0 bottom-0 left-0', { hide: !this.state.dropdownOpen })} onClick={this.doToggleDropdown}></div>
          <div className={cx('fixed top-0 right-0 bottom-0 border-left nowrap silver bg-black', { hide: !this.state.dropdownOpen })}>
            <div className='btn block px3 border-bottom'>Examples</div>
            {EXAMPLES.map((title, exampleIndex) => (
              <a key={exampleIndex} className='btn block px3 border-bottom' href={'#/example/' + (exampleIndex+1)}>
                {exampleIndex+1}. {title}
              </a>
            ))}
          </div>
        </div>
      </nav>
    )
  }

  doToggleDropdown () {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

}

export default ReactEs6(Nav).autobind()
