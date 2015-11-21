import React from 'react'
import App from './app'
import About from './about'
import Example from './example'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={About} />
      <Route path='/example/:exampleId' component={Example} />
    </Route>
  </Router>
), document.getElementById('app'))
