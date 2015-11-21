import React from 'react'

const About = (props) => {
  return (
    <div className='code--about'>
      <div className='container'>
        <h2 className='h1'>ES6 Generators</h2>
        <p className='h3'>
          ES6 Generators are awesome, but difficult to explain.
          The control flow keeps going back and forth.
          David Walsh has written <a href='https://davidwalsh.name/es6-generators' target='_blank'>
          a series of articles</a> on it. This is an attempt to visualize them interactively.
        </p>
        <p>
          <a href='#/example/1' className='btn btn-primary h3 p2'>
            Start Exploring <i className='fa fa-angle-right'></i>
          </a>
        </p>
        <p className='mt3'>
          Built with <a href='https://facebook.github.io/react/' target='_blank'>
          React</a> and <a href='http://www.basscss.com/' target='_blank'>
          Basscss</a>. Fork it on <a href='https://github.com/rdsubhas/es6-generators-visualized'>
          GitHub</a>.
        </p>
      </div>
    </div>
  )
}

export default About
