import React from 'react'
import ReactEs6 from './react-es6'
import cx from 'classnames'

const FILE_NAMES = {
  'fibonacci.json' : 'Fibonacci',
  'pingpong.json' : 'Ping Pong'
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
          <a className='btn btn-primary' href='https://github.com/rdsubhas/es6-genvis' target='_blank'>
            <i className='fa fa-github fa-lg'></i>
          </a>
          <button className='btn h3 mxn1'>
            ES6 Generators Visualized
          </button>
        </div>
        <div className='right'>
          <label className='inline-block px1'>Example: </label>
          <button className='btn btn-primary' onClick={this.doToggleDropdown}>
            {FILE_NAMES[this.props.fileName]} &#9662;
          </button>
          <div className={cx('fixed top-0 right-0 bottom-0 left-0', { hide: !this.state.dropdownOpen })} onClick={this.doToggleDropdown}></div>
          <div className={cx('absolute m1 right-0 nowrap white bg-blue rounded', { hide: !this.state.dropdownOpen })}>
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
        <button key={fileName} className='btn btn-primary block' onClick={this.doLoadFile.bind(null, fileName)}>
          {FILE_NAMES[fileName]}
        </button>
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
