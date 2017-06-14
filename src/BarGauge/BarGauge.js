import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import Bar from './Bar'

export default class BarGauge extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.any,
    decimal: PropTypes.number,
    unit: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    titleClass: PropTypes.string,
    textStyle: PropTypes.object,
    direction: PropTypes.string,
    mainBkg: PropTypes.string,
    progressColor: PropTypes.string,
    progressStyle: PropTypes.object,
    wrapStyle: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string
  };

  static defaultProps = {
    width: 53,
    height: 170,
    max: 100,
    high: 90,
    decimal: 0,
    direction: 'vertical',
    unit: '%',
    progressColor: '#0288d1',
    progressBkg: '#666',
    mainBkg: '#333',
    highColor: 'crimson'
  };
  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this._updateStateValue = this._updateStateValue.bind(this)
    this.formatThicknessLength = this.formatThicknessLength.bind(this)
  }
  componentDidMount () {
  }
  componentWillUnmount () {
  }
  componentWillUpdate (nextProps, nextState) {
  }
  componentWillMount () {
  }
  _updateStateValue (prop, v) {
    if (typeof v !== 'number') {
      return false
    }
    if (this.state && this.state[prop] !== undefined) {
      let state = {}
      state[prop] = v
      this.setState(state)
    } else {
      let { ...state } = this.state
      state[prop] = v
      this.setState(state)
    }
  }
  formatThicknessLength () {
    let { direction, width, height } = this.props

    // Format Data to [Thickness, Length]
    return direction === 'horizontal'
          ? [height, width]
          : [width, height]
  }
  render () {
    let {
      wrapStyle,
      style,
      direction,
      mainBkg,
      title,
      value,
      titleStyle,
      titleClass,
      textStyle,
      progressStyle,
      progressColor,
      decimal,
      max
    } = this.props

    var barSizes = this.formatThicknessLength()
    var barPercent = (value / max)
    var titleDiv = title
              ? <div
                className={titleClass}
                style={
                 Object.assign(
                   {},
                   (!titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }),
                   titleStyle)}>
                {title}
              </div>
              : null
    return (
      <div style={{ width: barSizes[0], ...wrapStyle }} ref={'wrap'}>
        {titleDiv}
        <svg
          id={this.props.id}
          width={barSizes[0]}
          height={barSizes[1]}
          style={{ background: mainBkg, ...style }}>
          <Motion defaultStyle={{ x: 0 }} style={{ x: spring(barPercent) }}>
            {
              interpolatingStyle => {
                let interpLength = interpolatingStyle.x
                return <g>
                  <Bar
                    style={progressStyle}
                    height={barSizes[1]}
                    width={barSizes[0]}
                    length={barSizes[1]}
                    thickness={barSizes[0]}
                    direction={direction}
                    progressColor={progressColor}
                    value={interpLength} />
                  <text
                    x={barSizes[0] / 2}
                    y={barSizes[1] / 2}
                    fontSize={36}
                    fill={'#eee'}
                    textAnchor={'middle'}
                    alignmentBaseline={'central'}
                    style={textStyle}>
                    {
                            interpolatingStyle.x &&
                            (interpolatingStyle.x * 100).toLocaleString(undefined,
                              {
                                minimumFractionDigits: decimal,
                                maximumFractionDigits: decimal
                              })
                          }
                  </text>
                </g>
              }
              }
          </Motion>
          <text
            x={direction === 'horizontal' ? barSizes[0] * 0.80 : barSizes[0] * 0.50}
            y={direction === 'horizontal' ? 24 : barSizes[1] - 40}
            fontSize={24}
            fill={'#eee'}
            textAnchor={'middle'}
            alignmentBaseline={'central'}
            style={textStyle}>
            {this.props.unit}
          </text>
          <rect
            x={1}
            y={1}
            width={barSizes[0] - 2}
            height={barSizes[1] - 2}
            fill={'transparent'}
            stroke={'rgb(170, 170, 170)'}
            strokeWidth={'2px'} />
          <polygon
            points={`${barSizes[0] * 0.75},${barSizes[1]} \
            ${barSizes[0] * 0.8},${barSizes[1] * 0.95}  ${barSizes[0]},${barSizes[1] * 0.95} \
            ${barSizes[0]},${barSizes[1]} ${barSizes[0] * 0.75},${barSizes[1]}`}
            style={{ fill: ('#aaa'), stroke:'', strokeWidth:1 }} />
        </svg>
      </div>
    )
  }
}
