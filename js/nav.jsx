import React from 'react/addons';
var cx = React.addons.classSet;

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="code--nav clearfix white bg-blue">
        <div className="left">
          <a className="btn"><i className="fa fa-github fa-lg"></i></a>
          <a className="btn h3 mxn1">ES6 Generators Visualized</a>
        </div>
        <div className="right">
          <a className="btn">Fibonacci</a>
          <a className="btn">Ping Pong</a>
          <a className="btn">Map Reduce</a>
          <a className="btn">Binary Tree</a>
          <a className="btn">Promisify</a>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
