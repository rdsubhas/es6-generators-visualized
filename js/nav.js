import React from 'react'
import ReactEs6 from './react-es6'
import cx from 'classnames'

const FILE_NAMES = {
  '1.json' : '1. Basic',
  '2.json' : '2. Return',
  '3.json' : '3. Iterator'
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
            <span>{FILE_NAMES[this.props.fileName]}</span>
            <i className='fa fa-fw fa-angle-down'></i>
          </a>
          <div className={cx('fixed top-0 right-0 bottom-0 left-0', { hide: !this.state.dropdownOpen })} onClick={this.doToggleDropdown}></div>
          <div className={cx('fixed top-0 right-0 bottom-0 border-left nowrap silver bg-black', { hide: !this.state.dropdownOpen })}>
            <div className='btn block px3 border-bottom'>Examples</div>
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
        <a key={fileName} className='btn block px3 border-bottom' onClick={this.doLoadFile.bind(null, fileName)}>
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
