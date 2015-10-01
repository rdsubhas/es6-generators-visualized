import React from 'react/addons';

var cx = React.addons.classSet;

var Pane = React.createClass({
  getDefaultProps: function() {
    return {
      active: false,
      vars: {},
      name: '',
      lines: [],
      line: 0
    }
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
            {this.props.lines.map((line, i) => {
              return (
                <tr key={i} className={cx({ 'active': i == this.props.line })}>
                  <td><i className="fa fa-caret-right"></i>{i+1}</td>
                  <td dangerouslySetInnerHTML={{ __html: line(this.props.vars) }}></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Pane;
