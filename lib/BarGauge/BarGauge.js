'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMotion = require('react-motion');

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarGauge = function (_React$Component) {
  _inherits(BarGauge, _React$Component);

  function BarGauge(props) {
    _classCallCheck(this, BarGauge);

    var _this = _possibleConstructorReturn(this, (BarGauge.__proto__ || Object.getPrototypeOf(BarGauge)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this._updateStateValue = _this._updateStateValue.bind(_this);
    _this.formatThicknessLength = _this.formatThicknessLength.bind(_this);
    return _this;
  }

  _createClass(BarGauge, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: '_updateStateValue',
    value: function _updateStateValue(prop, v) {
      if (typeof v !== 'number') {
        return false;
      }
      if (this.state && this.state[prop] !== undefined) {
        var state = {};
        state[prop] = v;
        this.setState(state);
      } else {
        var _state = _objectWithoutProperties(this.state, []);

        _state[prop] = v;
        this.setState(_state);
      }
    }
  }, {
    key: 'formatThicknessLength',
    value: function formatThicknessLength() {
      var _props = this.props,
          direction = _props.direction,
          width = _props.width,
          height = _props.height;

      // Format Data to [Thickness, Length]

      return direction === 'horizontal' ? [height, width] : [width, height];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          wrapStyle = _props2.wrapStyle,
          style = _props2.style,
          direction = _props2.direction,
          mainBkg = _props2.mainBkg,
          title = _props2.title,
          value = _props2.value,
          titleStyle = _props2.titleStyle,
          titleClass = _props2.titleClass,
          decorate = _props2.decorate,
          textStyle = _props2.textStyle,
          progressStyle = _props2.progressStyle,
          progressColor = _props2.progressColor,
          decimal = _props2.decimal,
          max = _props2.max;


      var barSizes = this.formatThicknessLength();
      var barPercent = value / max;
      var titleDiv = title ? _react2.default.createElement(
        'div',
        {
          className: titleClass,
          style: Object.assign({}, !titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }, titleStyle) },
        title
      ) : null;
      var decoration = decorate && [_react2.default.createElement('rect', {
        x: 1,
        y: 1,
        width: barSizes[0] - 2,
        height: barSizes[1] - 2,
        fill: 'transparent',
        stroke: 'rgb(170, 170, 170)',
        strokeWidth: '2px' }), _react2.default.createElement('polygon', {
        points: barSizes[0] * 0.75 + ',' + barSizes[1] + '         ' + barSizes[0] * 0.8 + ',' + barSizes[1] * 0.95 + '  ' + barSizes[0] + ',' + barSizes[1] * 0.95 + '         ' + barSizes[0] + ',' + barSizes[1] + ' ' + barSizes[0] * 0.75 + ',' + barSizes[1],
        style: { fill: '#aaa', stroke: '', strokeWidth: 1 } })];
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: barSizes[0] }, wrapStyle), ref: 'wrap' },
        titleDiv,
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            width: barSizes[0],
            height: barSizes[1],
            style: _extends({ background: mainBkg }, style) },
          _react2.default.createElement(
            _reactMotion.Motion,
            { defaultStyle: { x: 0 }, style: { x: (0, _reactMotion.spring)(barPercent) } },
            function (interpolatingStyle) {
              var interpLength = interpolatingStyle.x;
              return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement(_Bar2.default, {
                  style: progressStyle,
                  height: barSizes[1],
                  width: barSizes[0],
                  length: barSizes[1],
                  thickness: barSizes[0],
                  direction: direction,
                  progressColor: progressColor,
                  value: interpLength }),
                _react2.default.createElement(
                  'text',
                  {
                    x: barSizes[0] / 2,
                    y: barSizes[1] / 2,
                    fontSize: 36,
                    fill: '#eee',
                    textAnchor: 'middle',
                    alignmentBaseline: 'central',
                    style: textStyle },
                  interpolatingStyle.x && (interpolatingStyle.x * 100).toLocaleString(undefined, {
                    minimumFractionDigits: decimal,
                    maximumFractionDigits: decimal
                  })
                )
              );
            }
          ),
          _react2.default.createElement(
            'text',
            {
              x: direction === 'horizontal' ? barSizes[0] * 0.80 : barSizes[0] * 0.50,
              y: direction === 'horizontal' ? 24 : barSizes[1] - 40,
              fontSize: 24,
              fill: '#eee',
              textAnchor: 'middle',
              alignmentBaseline: 'central',
              style: textStyle },
            this.props.unit
          ),
          decoration
        )
      );
    }
  }]);

  return BarGauge;
}(_react2.default.Component);

BarGauge.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  max: _propTypes2.default.number,
  value: _propTypes2.default.any,
  decorate: _propTypes2.default.bool,
  decimal: _propTypes2.default.number,
  unit: _propTypes2.default.string,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  titleClass: _propTypes2.default.string,
  textStyle: _propTypes2.default.object,
  direction: _propTypes2.default.string,
  mainBkg: _propTypes2.default.string,
  progressColor: _propTypes2.default.string,
  progressStyle: _propTypes2.default.object,
  wrapStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  id: _propTypes2.default.string
};
BarGauge.defaultProps = {
  width: 53,
  height: 170,
  max: 100,
  high: 90,
  decimal: 0,
  decorate: false,
  direction: 'vertical',
  unit: '%',
  progressColor: '#0288d1',
  progressBkg: '#666',
  mainBkg: '#333',
  highColor: 'crimson'
};
exports.default = BarGauge;