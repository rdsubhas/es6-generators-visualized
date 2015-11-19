import React from 'react'
import cx from 'classnames'

const Nav = React.createClass({

  _navClassFor: function (tabName) {
    return cx({ 'btn': true, 'bg-darken-2': tabName === this.props.tabName })
  },

  render: function () {
    return (
      <nav className='code--nav clearfix white bg-blue'>
        <div className='left'>
          <a className='btn' href='https://github.com/rdsubhas/es6-genvis' target='_blank'>
            <i className='fa fa-github fa-lg'></i>
          </a>
          <button className='btn h3 mxn1'>
            ES6 Generators Visualized
          </button>
        </div>
        <div className='right'>
          <button className={this._navClassFor('fibonacci')} onClick={this.props.doLoadFile.bind(null, 'fibonacci')}>
            Fibonacci
          </button>
          <button className={this._navClassFor('pingpong')} onClick={this.props.doLoadFile.bind(null, 'pingpong')}>
            Ping Pong
          </button>
          <button className={this._navClassFor('mapreduce')} onClick={this.props.doLoadFile.bind(null, 'mapreduce')}>
            Map Reduce
          </button>
          <button className={this._navClassFor('btree')} onClick={this.props.doLoadFile.bind(null, 'btree')}>
            Binary Tree
          </button>
          <button className={this._navClassFor('promisify')} onClick={this.props.doLoadFile.bind(null, 'promisify')}>
            Promisify
          </button>
        </div>
      </nav>
    )
  }
})

export default Nav
