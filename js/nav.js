import React from 'react'
import ReactEs6 from './react-es6'
import cx from 'classnames'

const FILE_NAMES = {
  '1.json' : '1. Basic',
  'fibonacci.json' : '2. Fibonacci',
  'pingpong.json' : '3. Ping Pong'
}

class Nav extends React.Component {

  constructor (...args) {
    super(...args)
    this.state = {
      dropdownOpen: false
    }
  }

  render () {
    return (
      <nav className='code--nav clearfix white bg-blue'>
        <div className='left'>
          <a className='btn btn-primary' href='https://github.com/rdsubhas/es6-generators-visualized' target='_blank'>
            <i className='fa fa-github fa-lg'></i>
          </a>
          <button className='btn h3 mxn1'>
            ES6 Generators Visualized
          </button>
        </div>
        <div className='right'>
          <a className='btn btn-primary' onClick={this.doToggleDropdown}>
            {FILE_NAMES[this.props.fileName]} &#9662;
          </a>
          <div className={cx('fixed top-0 right-0 bottom-0 left-0', { hide: !this.state.dropdownOpen })} onClick={this.doToggleDropdown}></div>
          <div className={cx('fixed top-0 right-0 bottom-0 border-left nowrap white bg-blue', { hide: !this.state.dropdownOpen })}>
            {this.renderMenu()}
          </div>
        </div>
      </nav>
    )
  }

  renderMenu () {
    let menu = []
    for (let fileName in FILE_NAMES) {
      menu.push(
        <a key={fileName} className='btn btn-primary block px3 border-bottom' onClick={this.doLoadFile.bind(null, fileName)}>
          {FILE_NAMES[fileName]}
        </a>
      )
    }
    return menu
  }

  doLoadFile (fileName) {
    this.setState({ dropdownOpen: false })
    this.props.doLoadFile(fileName)
  }

  doToggleDropdown () {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

}

export default ReactEs6(Nav).autobind()
