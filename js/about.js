import React from 'react'

const About = (props) => {
  return (
    <div className='code--about'>
      <div className='container'>
        <h2 className='h1'>ES6 Generators</h2>
        <p>
          ES6 Generators are awesome, but difficult to explain
          because the control flow keeps going back and forth.
          You can get a value, you can also send a value into it,
          like GOTO on steroids!
        </p>
        <p>
          David Walsh has written a <a href='https://davidwalsh.name/es6-generators' target='_blank'>
          series of articles</a> on it. This is an attempt to visualize those code examples 
          (plus a few more I have thrown in).
        </p>
        <p className='center'>
          <a href='#/example/1' className='btn btn-primary h3 p2'>Start Exploring!</a>
        </p>
      </div>
    </div>
  )
}

export default About
