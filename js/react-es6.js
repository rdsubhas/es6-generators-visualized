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
  'forceUpdate'
]

const LIFECYCLE_FNS = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'shouldComponentUpdate'
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

function reactEs6 (baseClass) {
  baseClass.autobind = autobind
  baseClass.mixins = mixins
  baseClass.mixin = mixin
  return baseClass
}

function autobind (...members) {
  let autobindFns = (members && members.length > 0) ? members : memberFunctions(this.prototype)
  return reactEs6(
    class extends this {
      constructor (...args) {
        super(...args)
        autobindFns.forEach((fn) => {
          this[fn] = this[fn].bind(this)
        })
      }
    }
  )
}

function mixin (mixin) {
  let mixinClass = reactEs6(
    class extends this { }
  )

  memberFunctions(mixin).forEach((fn) => {
    if (fn === 'shouldComponentUpdate') {
      mixinClass.prototype[fn] = function (...args) {
        let should = mixin[fn].apply(this, args)
        if (should) {
          return should
        } else if (this.prototype.shouldComponentUpdate) {
          return this.prototype.shouldComponentUpdate.apply(this, args)
        } else {
          return false
        }
      }
    } else if (LIFECYCLE_FNS.indexOf(fn) !== -1) {
      mixinClass.prototype[fn] = function (...args) {
        mixin[fn].apply(this, args)
        if (this.prototype[fn]) {
          this.prototype[fn].apply(this, args)
        }
      }
    } else {
      mixinClass.prototype[fn] = mixin[fn]
    }
  })

  return mixinClass
}

function mixins (...mixins) {
  return mixins.reduce((baseClass, mixin) => baseClass.mixin(mixin), this)
}

export default reactEs6
