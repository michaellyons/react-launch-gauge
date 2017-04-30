'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GaugePath = require('./GaugePath');

var _GaugePath2 = _interopRequireDefault(_GaugePath);

var _d3Shape = require('d3-shape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gauge = function (_React$Component) {
  _inherits(Gauge, _React$Component);

  function Gauge(props) {
    _classCallCheck(this, Gauge);

    var _this = _possibleConstructorReturn(this, (Gauge.__proto__ || Object.getPrototypeOf(Gauge)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.getWidth = _this.getWidth.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    _this.state = {
      width: props.width
    };
    return _this;
  }

  _createClass(Gauge, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      this.setState({ width: this.getWidth() });
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.refs.wrap.offsetWidth;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.pie = (0, _d3Shape.pie)().value(function (d) {
        return d.number;
      }).startAngle(1 * Math.PI).endAngle(2.35 * Math.PI).sort(null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          wrapStyle = _props.wrapStyle,
          style = _props.style,
          title = _props.title,
          titleStyle = _props.titleStyle,
          max = _props.max,
          high = _props.high,
          value = _props.value;


      var valueData = [{ number: 0, color: '#aaa' }, { number: value, color: '#eee' }, { number: max - value, color: 'rgba(0,0,0,0)' }];
      var baseData = [{ number: 0, color: '#aaa' }, { number: high, color: '#666' }, { number: max - high, color: 'crimson' }];
      return _react2.default.createElement(
        'div',
        { style: wrapStyle, ref: 'wrap' },
        _react2.default.createElement(
          'div',
          { style: _extends({ background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }, titleStyle) },
          title
        ),
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            width: this.state.width,
            height: this.props.height,
            style: _extends({ background: '#333' }, style) },
          _react2.default.createElement(_GaugePath2.default, {
            width: this.state.width,
            height: this.props.height,
            pie: this.pie,
            color: this.color,
            data: baseData }),
          _react2.default.createElement(_GaugePath2.default, {
            width: this.state.width,
            height: this.props.height,
            pie: this.pie,
            data: valueData }),
          _react2.default.createElement(
            'text',
            {
              x: this.props.width / 2,
              y: this.props.height / 2,
              fontSize: 42,
              fill: '#eee',
              textAnchor: 'middle',
              alignmentBaseline: 'central' },
            this.props.value
          ),
          _react2.default.createElement(
            'text',
            {
              x: this.props.width * 0.60,
              y: this.props.height - 40,
              fontSize: 24,
              fill: '#eee',
              textAnchor: 'right',
              alignmentBaseline: 'central' },
            this.props.unit
          ),
          _react2.default.createElement('polygon', {
            points: width * 0.75 + ',' + height + '             ' + width * 0.8 + ',' + height * 0.95 + '  ' + width + ',' + height * 0.95 + '             ' + width + ',' + height + ' ' + width * 0.75 + ',' + height,
            style: { fill: '#aaa', stroke: '', strokeWidth: 1 } })
        )
      );
    }
  }]);

  return Gauge;
}(_react2.default.Component);

Gauge.propTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number,
  high: _react2.default.PropTypes.number,
  value: _react2.default.PropTypes.number,
  unit: _react2.default.PropTypes.string,
  title: _react2.default.PropTypes.string,
  titleStyle: _react2.default.PropTypes.object,
  wrapStyle: _react2.default.PropTypes.object,
  style: _react2.default.PropTypes.object,
  id: _react2.default.PropTypes.string.isRequired
};
Gauge.defaultProps = {
  width: 200,
  height: 170,
  max: 100,
  id: 'launch-gauge'
};
exports.default = Gauge;