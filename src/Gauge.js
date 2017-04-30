import React from 'react'
import GaugePath from './GaugePath'
import * as d3 from 'd3'

export default class Gauge extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    max: React.PropTypes.number,
    high: React.PropTypes.number,
    value: React.PropTypes.number,
    unit: React.PropTypes.string,
    title: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    wrapStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    id: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    width: 200,
    height: 170,
    max: 100,
    id: 'launch-gauge'
  };
  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.getWidth = this.getWidth.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.state = {
      width: props.width
    }
  }
  componentDidMount () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize () {
    this.setState({ width: this.getWidth() })
  }
  getWidth () {
    return this.refs.wrap.offsetWidth
  }
  componentWillMount () {
    this.pie = d3.pie()
    .value(function (d) { return d.number })
      .startAngle(1 * Math.PI)
      .endAngle(2.35 * Math.PI)
      .sort(null)
  }
  render () {
    let { height, width, wrapStyle, style, title, titleStyle, max, high, value } = this.props

    let valueData = [
      { number: 0, color: '#aaa' },
      { number: value, color: '#eee' },
      { number: max - value, color: 'rgba(0,0,0,0)' }
    ]
    let baseData = [
      { number: 0, color: '#aaa' },
      { number: high, color: '#666' },
      { number: max - high, color: 'crimson' }
    ]
    return (
      <div style={wrapStyle} ref={'wrap'}>
        <div style={{ background: '#666', padding: '4px 12px', color: 'white', fontSize: 24, ...titleStyle }}>
          {title}
        </div>
        <svg
          id={this.props.id}
          width={this.state.width}
          height={this.props.height}
          style={{ background: '#333', ...style }}>
          <GaugePath
            width={this.state.width}
            height={this.props.height}
            pie={this.pie}
            color={this.color}
            data={baseData} />
          <GaugePath
            width={this.state.width}
            height={this.props.height}
            pie={this.pie}
            data={valueData} />
          <text
            x={this.props.width / 2}
            y={this.props.height / 2}
            fontSize={42}
            fill={'#eee'}
            textAnchor={'middle'}
            alignmentBaseline={'central'}>
            {this.props.value}
          </text>
          <text
            x={this.props.width * 0.60}
            y={this.props.height - 40}
            fontSize={24}
            fill={'#eee'}
            textAnchor={'right'}
            alignmentBaseline={'central'}>
            {this.props.unit}
          </text>
          <polygon
            points={`${width * 0.75},${height} \
            ${width * 0.8},${height * 0.95}  ${width},${height * 0.95} \
            ${width},${height} ${width * 0.75},${height}`}
            style={{ fill: ('#aaa'), stroke:'', strokeWidth:1 }} />
        </svg>
      </div>
    )
  }
}
