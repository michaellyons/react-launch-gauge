import React from 'react';
import ReactDOM from 'react-dom';
import { CircleGauge, BarGauge } from '../src';
import moment from 'moment';
import marked from 'marked';
import ParallaxWrap from './Parallax';
import LazyImage from './LazyImage';
import './main.css';
import barProps from './BarProps';

// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
import './mui-github-markdown.css';
import './prop-type-description.css';

const stringThing =
'```javascript\n\
import { CircleGauge } from \'react-launch-gauge\' \
\n\
class AwesomeComponent extends Component {\n\
  constructor(props) {\n\
    super(props);\n\
  }\n\
  render() {\n\
    return <CircleGauge value={42} max={100} />\n\
  }\n\
}\n\
```'
const BarGaugeCodeString =
'```javascript\n\
import { BarGauge } from \'react-launch-gauge\' \
\n\
class AwesomeComponent extends Component {\n\
  constructor(props) {\n\
    super(props);\n\
  }\n\
  render() {\n\
    return <BarGauge value={42} max={100} />\n\
  }\n\
}\n\
```'
const SECTION_TITLE_STYLE = {
  margin: '0px 0px 20px 0px',
  padding: 10,
  borderBottom: '1px solid lightgrey'
};
const SECTION_STYLE = {
  padding: 10
};

const COLOR_INPUT_STYLE = {
  position: 'relative',
  height: 34,
  width: 60,
  boxShadow: '0px 0px 4px grey',
  margin: 4,
  borderRadius: 34,
};
const CHECKBOX_INPUT_STYLE = {
  width: 18,
  margin: '0px 36px',
  textAlign: 'center'
};
const BTN_STYLE = {
  margin: '0px 8px'
};
const OPTION_STYLE = {
  borderBottom: '1px solid lightgrey'

};

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'This Week',
      gaugeVal: 4200,
      showCode: {},
      bars: [],
      titleBkg: '#111111',
      textColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      progressColor: '#EEEEEE',
      mainBkg: '#263238',
    };
    this.handleResize = this.handleResize.bind(this)
    this.getSize = this.getSize.bind(this)
    this.setData = this.setData.bind(this)
    this.toggleCode = this.toggleCode.bind(this)
    this.buildPropTable = this.buildPropTable.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
    this.getRandoms = this.getRandoms.bind(this)
  }
  componentDidMount() {
    this.getRandoms();
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize () {
    this.setState({ ...this.getSize() })
  }
  toggleCode(key) {
    let { ...state } = this.state;
    let { showCode } = state;
    showCode[key] = !showCode[key];
    this.setState({showCode});
  }
  getSize () {
    return {w: window.innerWidth, h: window.innerHeight}
  }
  setData(key, val) {
    let { ...state } = this.state;
    state[key] = val;
    // console.log(key, e.target.value);
    this.setState(state);
  }
  handleDataChange(key, e) {
    let { ...state } = this.state;
    state[key] = e.target.value;
    // console.log(key, e.target.value);
    this.setState(state);
  }
  buildPropRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2 propKey'>{row.key}</td>
              <td className='col-xs-2 propType'>{row.type}</td>
              <td>{row.default}</td>
              <td><div
                style={{margin: ''}}
                dangerouslySetInnerHTML={{__html: marked(row.desc || '')}} /></td>
           </tr>
  }
  buildTable(header, rows) {
    return <table className='displayTable' style={{padding: 20, width: '100%'}}>
              <thead>
              <tr>
               {header.map((h, i) => <th style={{paddingLeft: 10}} key={i}>{h}</th>)}
               </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
  }
  buildColorDiv(key, value) {
    return <div key={key} style={{position: 'relative', margin: '6px 0px', boxShadow: '0px 0px 4px grey', height: 34, width: 60, borderRadius: 34, background: value}}>
          <input
            type='color'
            style={{...COLOR_INPUT_STYLE, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0}}
            value={value}
            onChange={this.handleDataChange.bind(null, key)} />
      </div>
  }
  getRandoms() {
    let bars = [
      getRandomInRange(0, 100),
      getRandomInRange(0, 100),
      getRandomInRange(0, 100)
    ]
    this.setState({
      gaugeVal: getRandomInRange(0, 45000),
      bars
    })
  }
  buildPropTable(rows) {
    let propRows = rows.map((row, i) => this.buildPropRow(row, i));
    return this.buildTable(['Name', 'Type', 'Default', 'Description'], propRows)
  }
  render() {

    let {
      h,
      w,
      titleBkg,
      showCode,
      progressColor,
      textColor,
      done,
      bars,
      launch,
      gaugeVal,
      title,
      mainBkg,
    } = this.state;
    let generalProps = this.buildTable(['Name', 'Type', 'Default', 'Description'], [
      {
        name: 'Title',
        type: 'String',
        key: 'title',
        desc: 'Title of the Chart.',
        component: this.buildColorDiv('titleBkg', titleBkg)
      },
      {
        name: 'value',
        key: 'value',
        type: 'number',
        desc: 'Value to display in the gauge.',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        name: 'high',
        key: 'high',
        type: 'number',
        desc: 'Value where progressBkg color changes.',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        name: 'max',
        key: 'max',
        type: 'number',
        default: '100',
        desc: 'Sets the Max for input domain. (Determines scale)',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        name: 'width',
        key: 'width',
        type: 'string|number',
        default: '200',
        desc: 'Width of the Container div',
        component: null
      },
      {
        name: 'height',
        key: 'height',
        default: '170',
        type: 'string|number',
        desc: 'Height of the Container div',
      },
      {
        name: 'startAngle',
        key: 'startAngle',
        default: '180',
        type: 'number',
        desc: 'Starting angle of the gauge.',
        component: null
      },
      {
        name: 'endAngle',
        key: 'endAngle',
        default: '420',
        type: 'number',
        desc: 'Ending angle of the gauge.',
        component: null
      },
      {
        name: 'progressBkg',
        key: 'progressBkg',
        type: 'string',
        default: '#666666',
        desc: 'Color for the progress\'s background.',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        name: 'progressColor',
        key: 'progressColor',
        type: 'string',
        default: '#FFFFFF',
        desc: 'The color of the primary progress. (Default is white.)',
        component: null
      },
      {
        name: 'highColor',
        key: 'highColor',
        type: 'string',
        default: 'crimson',
        desc: 'The color of the gauge top color. (Default is equal to lineColor.)',
        component: null
      },
      {
        name: 'id',
        key: 'id',
        type: 'string',
        default: '',
        desc: 'The string id applied to the SVG component',
        component: null
      },
      {
        name: 'mainBkg',
        key: 'mainBkg',
        type: 'string',
        default: '#333333',
        desc: 'Color for the chart\'s background.',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        key: 'style',
        type: 'object',
        default: ``,
        desc: 'Override the default Chart style object.',
        component: null
      },
      {
        key: 'titleStyle',
        type: 'object',
        default: ``,
        desc: 'Override the default Title style object.',
        component: null
      },
      {
        key: 'containerStyle',
        type: 'object',
        default: ``,
        desc: 'Override the default container style object.',
        component: null
      }
    ].map((item, i) => {
      return this.buildPropRow(item, i);
    }));
    let barGaugePropTable = this.buildPropTable(barProps);

    return <div style={{color: 'white'}}>
            <div style={{width: '100%', position: 'fixed', top: 0, left: 0}}>
                <ParallaxWrap
                  full={true}
                  background={<LazyImage src={'./public/launch.jpg'} />}
                  style={{ minHeight: h }}>
                  </ParallaxWrap>
            </div>
            <div className='container'>
            <div style={{ transition: 'all 0.9s ease-out', position: 'relative', zIndex: 1, paddingBottom: 120}}>
              <div style={{marginBottom: 30, textAlign: 'center'}} >
                <h1>React Launch Gauge</h1>
                <h4>{`npm install react-launch-gauge`}</h4>
                <h4>{`yarn add react-launch-gauge`}</h4>
              </div>
              <div style={{marginBottom: 30, textAlign: 'center'}}>
                <h3>{`Inspired by SpaceX's telemetry display.`}</h3>
                <h4>{`Depends on D3.js and React Motion`}</h4>
              </div>

              <div style={{display: 'flex', justifyContent: 'center'}}>
              <CircleGauge
                unit="km/h"
                style={{backgroundColor: mainBkg}}
                titleStyle={{backgroundColor: titleBkg}}
                progressStyle={{fill: progressColor}}
                wrapStyle={{margin: '0px 10px'}}
                value={gaugeVal}
                decimal={0}
                high={40000}
                max={45000} />
              <CircleGauge
                unit="km/h"
                startAngle={240}
                endAngle={480}
                labelPos={'center'}
                style={{backgroundColor: mainBkg}}
                titleStyle={{backgroundColor: titleBkg}}
                progressStyle={{fill: '#00aa44'}}
                wrapStyle={{margin: '0px 10px'}}
                value={gaugeVal}
                decimal={0}
                high={40000}
                max={45000} />
              <CircleGauge
                unit="km/h"
                startAngle={180}
                endAngle={-60}
                labelPos={'left'}
                style={{backgroundColor: mainBkg}}
                titleStyle={{backgroundColor: titleBkg}}
                progressStyle={{fill: '#F44336'}}
                wrapStyle={{margin: '0px 10px'}}
                value={gaugeVal}
                decimal={0}
                high={40000}
                max={45000} />
              </div>

              <div
                className='glassBkg flex pad2'
                style={{ maxWidth: 400, textAlign: 'center', justifyContent: 'center', margin: '30px auto'}}>
                <button
                style={BTN_STYLE}
                 className='btn btn-large btn-primary'
                 onClick={this.getRandoms}>
                  Randomize Values
                 </button>
              </div>

                <div className='glassBkg'>
                  <div className='pad2'>
                    <div className='flex' style={{fontSize: 24, marginBottom: 20}}>
                     <span style={{fontSize: 24, margin: 'auto 0px'}}>
                      {'<CircleGauge />'}
                     </span>
                      <div style={{marginLeft: 'auto'}}>
                      <button
                        className={'btn '+ (showCode['circleGauge'] ? 'btn-disabled' : 'btn-primary')}
                        onClick={this.toggleCode.bind(null, 'circleGauge')}>
                        {showCode['circleGauge'] ? 'Hide Code' : 'Show Code'}
                      </button>
                      </div>
                    </div>
                    <div className={'accordion ' + (!showCode['circleGauge'] && 'accordionClosed')}>
                      <div className='accordionContent'>
                        <div
                          style={{margin: '10px 0'}}
                          dangerouslySetInnerHTML={{__html: marked(stringThing)}} />
                      </div>
                    </div>
                    <h3 style={SECTION_TITLE_STYLE}>{"Properties"}</h3>
                    {generalProps}
                  </div>
                </div>
                <div style={{display: 'flex', margin: '30px 0px', justifyContent: 'center'}}>
                <BarGauge
                  progressColor={'#F44336'}
                  wrapStyle={{margin: '0px 10px'}}
                  style={{backgroundColor: mainBkg}}
                  value={bars[0]}
                  max={100} />
                <BarGauge
                  wrapStyle={{margin: '0px 10px'}}
                  progressColor={'#00aa44'}
                  style={{backgroundColor: mainBkg}}
                  value={bars[1]}
                  max={100} />
                <BarGauge
                  wrapStyle={{margin: '0px 10px'}}
                  style={{backgroundColor: mainBkg}}
                  value={bars[2]}
                  max={100} />
                <div>
                  <BarGauge
                    progressColor={'#F44336'}
                    direction={'horizontal'}
                    wrapStyle={{margin: '0px 10px'}}
                    value={bars[0]}
                    max={100} />
                  <BarGauge
                    wrapStyle={{margin: '0px 10px'}}
                    direction={'horizontal'}
                    progressColor={'#00aa44'}
                    value={bars[1]}
                    max={100} />
                  <BarGauge
                    wrapStyle={{margin: '0px 10px'}}
                    direction={'horizontal'}
                    value={bars[2]}
                    max={100} />
                </div>
                </div>
                <div
                  className='glassBkg flex pad2'
                  style={{ maxWidth: 400, textAlign: 'center', justifyContent: 'center', margin: '30px auto'}}>
                  <button
                  style={BTN_STYLE}
                   className='btn btn-large btn-primary'
                   onClick={this.getRandoms}>
                    Randomize Values
                   </button>
                </div>
                <div className='glassBkg'>
                  <div className='pad2'>
                    <div className='flex' style={{fontSize: 24, marginBottom: 20}}>
                     <span style={{fontSize: 24, margin: 'auto 0px'}}>
                      {'<BarGauge />'}
                     </span>
                      <div style={{marginLeft: 'auto'}}>
                      <button
                        className={'btn '+ (showCode['barGauge'] ? 'btn-disabled' : 'btn-primary')}
                        onClick={this.toggleCode.bind(null, 'barGauge')}>
                        {showCode['barGauge'] ? 'Hide Code' : 'Show Code'}
                      </button>
                      </div>
                    </div>
                    <div className={'accordion ' + (!showCode['barGauge'] && 'accordionClosed')}>
                      <div className='accordionContent'>
                        <div
                          style={{margin: '10px 0'}}
                          dangerouslySetInnerHTML={{__html: marked(BarGaugeCodeString)}} />
                      </div>
                    </div>
                    <h3 style={SECTION_TITLE_STYLE}>{"Properties"}</h3>
                    {barGaugePropTable}
                  </div>
                </div>

              </div>

            </div>
          </div>
  }
}
// <div
// className='propTypeDescription'>
//   <div
//   className='markdown-body'
//   style={{width: '100%', margin: '10px 0'}}
//   dangerouslySetInnerHTML={{__html: marked(propertyTable)}} />
// </div>
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {

  ReactDOM.render(
    <Demo style={{backgroundColor: 'none'}} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./main', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render();
