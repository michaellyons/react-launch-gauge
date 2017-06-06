import React from 'react';
import ReactDOM from 'react-dom';
import Gauge from '../src';
import moment from 'moment';
import marked from 'marked';
import './main.css';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import './mui-github-markdown.css';
import './prop-type-description.css';

const stringThing =
'```javascript\n\
import Gauge from \'react-launch-gauge\' \
\n\
class AwesomeComponent extends Component {\n\
  constructor(props) {\n\
    super(props);\n\
  }\n\
  render() {\n\
    return <Gauge value={42} max={100} />\n\
  }\n\
}\n\
```'

const propertyTable =
`
Name| Type | Default | Description
--- | --- | --- | ---
title | string | | Title of the chart
`
const now = moment();
const first_diff = now.date() - now.day();
const first = first_diff == now.date() ? moment().date(first_diff - 6) : moment().date(first_diff + 1);

const THIS_WEEK = [];

// We'll need a week's worth of days
for (var i = 0; i <= 7; i++) {
  // if (i == 2) continue;
  var date = moment(first).add(i, 'days');
  THIS_WEEK.push({
    name: date.format('ddd'),
    date: date.format('MM-DD-YYYY'),
    onComplete: () => {console.log("Woah!")}
  })
}

// Set Launch Time to abritrary date in future
const launchTime = moment('04-20-2020', 'MM-DD-YYYY');

// Set them Launch Items with T -/+ liftoff times
const timeLineItems = [
  [-15, 'INTERNAL'],
  [-5, 'STARTUP'],
  [0, 'LIFTOFF'],
  [15, 'MAX-Q'],
  [25, 'MECO'],
  [40, 'BOOSTBACK BURN'],
  [50, 'ENTRY BURN'],
  [55, 'STAGE 1 LANDING'],
  [65, 'PAYLOAD ORBIT'],
  [70, 'PROFIT']
];

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
const OPTION_LABEL_STYLE = {
};
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'This Week',
      gaugeVal: 4200,
      titleBkg: '#111111',
      textColor: '#FFFFFF',
      labelColor: '#FFFFFF',
      progressColor: '#EEEEEE',
      mainBkg: '#263238',
    };
    this.addAlert = this.addAlert.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.getSize = this.getSize.bind(this)
    this.setData = this.setData.bind(this)
    this.handleDataChange = this.handleDataChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize () {
    this.setState({ ...this.getSize() })
  }
  getSize () {
    return {w: window.innerWidth, h: window.innerHeight}
  }
  addAlert (title = 'Toast!', message = 'This is a toast!') {
    this.refs.toaster.success(
    message,
    title,
    {
      timeOut: 3000,
      extendedTimeOut: 3000
    });
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
  handleCheckboxChange(key) {
    let { ...state } = this.state;
    state[key] = !state[key];
    // console.log(key, state[key]);
    this.setState(state);
  }
  buildOptionRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2'>{row.component}</td>
              <td className='col-xs-2'>{row.key}</td>
              <td style={OPTION_LABEL_STYLE}>{row.name}</td>
           </tr>
  }
  buildPropRow(row, i) {
    return <tr key={i} style={OPTION_STYLE}>
              <td className='col-xs-2' style={{color: '#266d90'}}>{row.key}</td>
              <td className='col-xs-2' style={{color: '#bf2a5c'}}>{row.type}</td>
              <td style={OPTION_LABEL_STYLE}>{row.default}</td>
              <td style={OPTION_LABEL_STYLE}><div
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
  render() {

    let {
      h,
      w,
      titleBkg,
      progressColor,
      textColor,
      done,
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
        component: null
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
    let generalOptions = this.buildTable([
      {
        name: 'Title Background',
        key: 'titleStyle.backgroundColor',
        component: this.buildColorDiv('titleBkg', titleBkg)
      },
      {
        name: 'Main Background',
        key: 'style.backgroundColor',
        value: mainBkg,
        component: this.buildColorDiv('mainBkg', mainBkg)
      },
      {
        name: 'Text Color',
        key: 'textStyle.fill',
        value: textColor,
        component: this.buildColorDiv('textColor', textColor)
      },
      {
        name: 'Progress Color',
        key: 'progressStyle.fill',
        value: progressColor,
        component: this.buildColorDiv('progressColor', progressColor)
      }
    ].map((item, i) => {
      return this.buildOptionRow(item, i);
    }));

    return <div style={{color: 'white', backgroundImage: 'url("./public/launch.jpg")', backgroundSize: 'cover'}}>
            <div className='container'>
            <ToastContainer ref="toaster"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-left" />
            <div style={{ transition: 'all 0.9s ease-out', position: 'relative', zIndex: 1, paddingBottom: 120}}>
              <div style={{marginBottom: 30, textAlign: 'center'}} >
                <h1>React Launch Gauge</h1>
                <h4>{`npm install react-launch-gauge`}</h4>
                <h4>{`yarn add react-launch-gauge`}</h4>
              </div>
              <div style={{marginBottom: 30, textAlign: 'center'}}>
                <h3>{`Inspired by SpaceX's telemetry display.`}</h3>
                <h4>{`Depends on d3-shape from D3.js`}</h4>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <Gauge
                title="SPEED"
                unit="km/h"
                titleClass='fadeTitle'
                style={{backgroundColor: mainBkg}}
                titleStyle={{backgroundColor: titleBkg}}
                progressStyle={{fill: progressColor}}
                wrapStyle={{margin: ''}}
                value={gaugeVal}
                decimal={0}
                high={40000}
                max={45000} />
              <Gauge
                title="ALTITUDE"
                unit="km"
                titleClass='fadeTitle fadeTitleAfter'
                style={{backgroundColor: mainBkg}}
                titleStyle={{backgroundColor: titleBkg}}
                progressStyle={{fill: progressColor}}
                value={gaugeVal / 50}
                decimal={0}
                high={1100}
                max={1100} />
              </div>
              <div style={{textAlign: 'center'}}>
                <button
                 style={BTN_STYLE}
                 className='btn btn-primary'
                 onClick={this.setData.bind(null, 'gaugeVal', 0)}>
                 0
                 </button>
                 <button
                 style={BTN_STYLE}
                 className='btn btn-primary'
                 onClick={this.setData.bind(null, 'gaugeVal', 10000)}>
                  10000
                 </button>
                 <button
                 style={BTN_STYLE}
                  className='btn btn-primary'
                  onClick={this.setData.bind(null, 'gaugeVal', 20000)}>
                   20000
                  </button>
              </div>
              <input
                type='range'
                style={{padding: 10, maxWidth: 400, margin: 'auto'}}
                value={gaugeVal}
                max={45000}
                onChange={this.handleDataChange.bind(null, 'gaugeVal')} />
              <div className='paper' style={{color: 'black'}}>
              <div className='' style={SECTION_STYLE}>
                <h3 style={SECTION_TITLE_STYLE}>{"<Gauge />"}</h3>
                <h4 style={SECTION_TITLE_STYLE}>{"Usage"}</h4>
                <div style={{margin: '10px 0'}}dangerouslySetInnerHTML={{__html: marked(stringThing)}} />
                <h4 style={SECTION_TITLE_STYLE}>{"Props"}</h4>
                {generalProps}
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
