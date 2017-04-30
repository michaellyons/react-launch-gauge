import React from 'react'
import * as d3 from 'd3'

export default class GaugePath extends React.Component {
  static propTypes = {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    thickness:React.PropTypes.number,
    data:React.PropTypes.array,
    pie:React.PropTypes.func
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

    this.arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius)

    this.transform = 'translate(' + width / 2 + ',' + height / 2 + ')'
  }
  createChart (_self) {
    var paths = (this.props.pie(this.props.data)).map(function (d, i) {
      var fill = _self.props.data[i].color || _self.props.fill || '#666'
      return (
        <path fill={fill} d={_self.arc(d)} key={i} />
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
