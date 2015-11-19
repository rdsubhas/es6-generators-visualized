import React from 'react/addons';
var cx = React.addons.classSet;

var Pane = React.createClass({
  getDefaultProps: function() {
    return {
      active: false,
      highlight: null,
      vars: {},
      name: '',
      lines: [],
      line: -1
    }
  },

  _createLine: function(line, i) {
    var active = i == this.props.line;
    var html = line(this.props.vars);

    if (active && this.props.highlight) {
      html = html.replace(this.props.highlight, '<b>$1</b>');
    }

    return (
      <tr key={i} className={cx({ 'active': i == this.props.line })}>
        <td>{i+1}</td>
        <td dangerouslySetInnerHTML={{ __html: html }}></td>
      </tr>
    )
  },

  render: function() {
    return (
      <div className={cx({ 'code--pane': true, 'active': this.props.active })}>
        <table className="code--table">
          <thead>
            <tr>
              <th colSpan="2">{this.props.name}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.lines.map(this._createLine)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Pane;
