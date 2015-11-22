import React from 'react'
import ReactEs6 from './react-es6'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Nav from './nav'

class App extends React.Component {

  render () {
    return (
      <div className='code box'>
        <Nav exampleId={this.props.params.exampleId} />
        <div className='code--container'>
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default ReactEs6(App).mixin(PureRenderMixin).autobind()
