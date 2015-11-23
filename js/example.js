import React from 'react'
import ReactEs6 from './react-es6'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Workspace from './workspace'
import reqwest from 'reqwest'

const I_HIGHLIGHT_REGEX = 3
const I_LINE_STR = 0
const SEED = new Date().getTime()

class Example extends React.Component {

  constructor (...args) {
    super(...args)
    this.state = {
      loading: true,
      description: null,
      panes: [],
      steps: [],
      vars: {}
    }
  }

  componentDidMount () {
    if (this.state.loading) {
      this.doLoadFile()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.exampleId !== this.props.params.exampleId) {
      this.setState({ loading: true })
    }
  }

  componentDidUpdate () {
    this.componentDidMount()
  }

  _prepareData (data) {
    data.loading = false
    data.steps.forEach((step) => {
      // precompile regex
      if (step[I_HIGHLIGHT_REGEX]) {
        step[I_HIGHLIGHT_REGEX] = new RegExp('(' + step[I_HIGHLIGHT_REGEX] + ')')
      }
    })
    return data
  }

  doLoadFile () {
    reqwest({
      url: `${this.props.params.exampleId}.json?${SEED}`,
      type: 'json'
    }).then((data) => {
      this._prepareData(data)
      this.setState(data)
    })
  }

  render () {
    return (
      <Workspace loading={this.state.loading} panes={this.state.panes} 
        steps={this.state.steps} vars={this.state.vars} description={this.state.description} />
    )
  }

}

export default ReactEs6(Example).mixin(PureRenderMixin).autobind()
