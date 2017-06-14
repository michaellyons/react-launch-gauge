import React from 'react'
import PropTypes from 'prop-types'
import { arc } from 'd3-shape'

export default class GaugeArc extends React.Component {
  static propTypes = {
    width:PropTypes.number,
    height:PropTypes.number,
    thickness:PropTypes.number,
    data:PropTypes.array,
    pie:PropTypes.func
  };
  static defaultProps = {
    thickness: 10
  }
  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.createChart = this.createChart.bind(this)
  }
  componentWillMount () {
    let { height, width, thickness } = this.props

    let radius = this.props.height / 2

    let outerRadius = radius - 10
    let innerRadius = outerRadius - thickness

    this.arc = arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius)

    this.transform = 'translate(' + width / 2 + ',' + height / 2 + ')'
  }
  createChart (_self) {
    var paths = (this.props.pie(this.props.data)).map(function (d, i) {
      var fill = _self.props.data[i].color || _self.props.fill || '#666'
      var style = i === 1 ? _self.props.style : {}
      return (
        <path fill={fill} d={_self.arc(d)} key={i} style={style} />
      )
    })
    return paths
  }

  render () {
    var paths = this.createChart(this)

    return (
      <g transform={this.transform}>
        {paths}
      </g>
    )
  }
}
