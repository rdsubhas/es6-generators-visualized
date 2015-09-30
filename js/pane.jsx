import React from 'react';

var Pane = React.createClass({
  getDefaultProps: function() {
    return {
      name: 'filename',
      lines: []
    }
  },

  render: function() {
    return (
      <div className="code--pane">
        <table className="code--table">
          <thead>
            <tr>
              <th colSpan="2">{this.props.name}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lines.map(function(line, i) { return (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{line}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Pane;
