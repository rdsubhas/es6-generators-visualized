import React from 'react'
import ReactEs6 from './react-es6'
import Nav from './nav'

class App extends React.Component {

  render () {
    return (
      <div className='code'>
        <Nav exampleId={this.props.params.exampleId} />
        {this.props.children}
      </div>
    )
  }

}

export default ReactEs6(App).autobind()
