import React from 'react'
import PropTypes from 'prop-types'

export default function Bar (props) {
  let {
    progressColor,
    value,
    width,
    height,
    direction,
    style
  } = props

  let val = value * height

  return direction === 'horizontal'
  ? <rect
    fill={progressColor}
    height={height}
    style={style}
    width={value * width} />
  : <rect
    style={style}
    fill={progressColor}
    height={val}
    y={height - val}
    width={width} />
}
Bar.propTypes = {
  progressColor: PropTypes.string,
  value: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
  style: PropTypes.object
}
