import React from 'react/addons';
var cx = React.addons.classSet;

var Nav = React.createClass({

  render: function() {
    var navClassFor = (tabName) => {
      return cx({ 'btn': true, 'bg-darken-2': tabName == this.props.tabName });
    };

    return (
      <nav className="code--nav clearfix white bg-blue">
        <div className="left">
          <a className="btn" href="https://github.com/rdsubhas/es6-genvis" target="_blank">
            <i className="fa fa-github fa-lg"></i>
          </a>
          <button className="btn h3 mxn1">
            ES6 Generators Visualized
          </button>
        </div>
        <div className="right">
          <button className={navClassFor('fibonacci')} onClick={this.props.doLoadFile.bind(null, 'fibonacci')}>
            Fibonacci
          </button>
          <button className={navClassFor('pingpong')} onClick={this.props.doLoadFile.bind(null, 'pingpong')}>
            Ping Pong
          </button>
          <button className={navClassFor('mapreduce')} onClick={this.props.doLoadFile.bind(null, 'mapreduce')}>
            Map Reduce
          </button>
          <button className={navClassFor('btree')} onClick={this.props.doLoadFile.bind(null, 'btree')}>
            Binary Tree
          </button>
          <button className={navClassFor('promisify')} onClick={this.props.doLoadFile.bind(null, 'promisify')}>
            Promisify
          </button>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
