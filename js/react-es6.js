const reactMixin = require('react-mixin')

const IGNORED_FNS = [
  'constructor',
  'toString',
  'toLocaleString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  '__defineGetter__',
  '__lookupGetter__',
  '__defineSetter__',
  '__lookupSetter__',
  'getDOMNode',
  'isMounted',
  'replaceProps',
  'setProps',
  'replaceState',
  'setState',
  'render',
  'forceUpdate',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'shouldComponentUpdate',
  'render'
]

function memberFunctions (proto) {
  let allFns = []
  let curr = proto
  do {
    let props = Object.getOwnPropertyNames(curr)
    props.forEach((prop) => {
      if (IGNORED_FNS.indexOf(prop) === -1 && allFns.indexOf(prop) === -1 && typeof curr[prop] === 'function') {
        allFns.push(prop)
      }
    })
  } while ((curr = Object.getPrototypeOf(curr)))
  return allFns
}

function autobindMixin (members) {
  return {
    componentWillMount: function () {
      members.forEach((name) => {
        this[name] = this[name].bind(this)
      })
    }
  }
}

function autobind (...members) {
  reactMixin.onClass(this, autobindMixin(memberFunctions(this.prototype)))
  return this
}

function mixins (...mixins) {
  mixins.forEach((m) => {
    reactMixin.onClass(this, m)
  })
  return this
}

function reactEs6 (baseClass) {
  baseClass.autobind = autobind
  baseClass.mixin = mixins
  baseClass.mixins = mixins
  return baseClass
}

export default reactEs6
