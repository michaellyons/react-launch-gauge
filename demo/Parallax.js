import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

let clamp = (x, low, high) => Math.min(Math.max(x, low), high)

export default class ParallaxComponent extends Component {
  static propTypes = {
    full: PropTypes.bool,
    style: PropTypes.object,
    background: PropTypes.any,
    children: PropTypes.any
  }
  static defaultProps = {
    full: true
  };
  constructor (...p) {
    super(...p)

    this.state = {
      style: {
        transform: ''
      }
    }

    this._calcPosition = () => {
      let { scrollY } = window
      let el = ReactDOM.findDOMNode(this)
      let { offsetTop, offsetHeight } = el
      let d = (offsetTop - scrollY) * 1.75 / offsetHeight
      let n = clamp((d * 100).toFixed(0), (-2 * offsetHeight).toFixed(0), (0.75 * offsetHeight).toFixed(0))
      let t = `translateY(${n}px) translateZ(0)`

      this.setState({
        style: {
          transform: t
        }
      })
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this._calcPosition)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this._calcPosition)
  }
  render () {
    let { full, style } = this.props
    return (
      <div className={'parallax content-a ' + (full ? 'fullscreen' : '')} style={style}>
        <div style={this.state.style} className='parallax-back'>
          {this.props.background}
        </div>
        <div className='parallax-base content-b'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
