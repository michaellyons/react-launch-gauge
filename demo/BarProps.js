module.exports = [
  {
    type: 'String',
    key: 'title',
    desc: 'Title of the Chart.'
  },
  {
    key: 'value',
    type: 'number',
    desc: 'Value to display in the gauge.'
  },
  {
    key: 'max',
    type: 'number',
    default: '100',
    desc: 'Sets the Max for input domain. (Determines scale)'
  },
  {
    key: 'width',
    type: 'string|number',
    default: '200',
    desc: 'Width of the Container div'
  },
  {
    key: 'height',
    default: '170',
    type: 'string|number',
    desc: 'Height of the Container div'
  },
  {
    key: 'progressColor',
    type: 'string',
    default: '#FFFFFF',
    desc: 'The color of the primary progress. (Default is white.)'
  },
  {
    key: 'id',
    type: 'string',
    default: '',
    desc: 'The string id applied to the SVG component'
  },
  {
    key: 'mainBkg',
    type: 'string',
    default: '#333333',
    desc: 'Color for the chart\'s background.'
  },
  {
    key: 'style',
    type: 'object',
    default: ``,
    desc: 'Override the default Chart style object.'
  },
  {
    key: 'titleStyle',
    type: 'object',
    default: ``,
    desc: 'Override the default Title style object.'
  },
  {
    key: 'containerStyle',
    type: 'object',
    default: ``,
    desc: 'Override the default container style object.'
  }
]
