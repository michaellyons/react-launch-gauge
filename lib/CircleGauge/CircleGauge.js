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

var _GaugeArc = require('./GaugeArc');

var _GaugeArc2 = _interopRequireDefault(_GaugeArc);

var _d3Shape = require('d3-shape');

var _d3Ease = require('d3-ease');

var _d3Timer = require('d3-timer');

var _d3Interpolate = require('d3-interpolate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircleGauge = function (_React$Component) {
  _inherits(CircleGauge, _React$Component);

  function CircleGauge(props) {
    _classCallCheck(this, CircleGauge);

    var _this = _possibleConstructorReturn(this, (CircleGauge.__proto__ || Object.getPrototypeOf(CircleGauge)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this._updateStateValue = _this._updateStateValue.bind(_this);
    _this.goTween = _this.goTween.bind(_this);
    _this.tweenUp = _this.tweenUp.bind(_this);
    _this.tweenDown = _this.tweenDown.bind(_this);
    _this.state = {
      val: props.value
    };
    return _this;
  }

  _createClass(CircleGauge, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.value !== this.props.value) {
        var parsedVal = parseFloat(this.props.value);
        var parsedNext = parseFloat(nextProps.value);
        // console.log("Will Change Value!");
        // If we're growing, tween in the positive direction
        var func;
        if (parsedNext > parsedVal) {
          func = this.tweenUp;
        } else {
          func = this.tweenDown;
        }
        this.tween = func('val', this.state.val, parsedNext, this.props.duration).then(function (timer) {
          // console.log("Tween End!");
          timer.stop();
        });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.pie = (0, _d3Shape.pie)().value(function (d) {
        return d.number;
      }).startAngle(this.props.startAngle / 180 * Math.PI).endAngle(this.props.endAngle / 180 * Math.PI).sort(null);
    }
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
    key: 'tweenUp',
    value: function tweenUp(prop, start, end) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
      var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Linear';

      return this.goTween(prop, start, end, duration, 1, easing);
    }
  }, {
    key: 'tweenDown',
    value: function tweenDown(prop, start, end) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
      var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Linear';

      return this.goTween(prop, start, end, duration, -1, easing);
    }
  }, {
    key: 'goTween',
    value: function goTween(prop, start, end) {
      var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;

      var _this2 = this;

      var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var easing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'Linear';

      // console.log("Tween with Duration ", duration)
      return new Promise(function (resolve, reject) {
        var i = (0, _d3Interpolate.interpolate)(start, end);
        var easeFun = _d3Ease.easeLinear;

        /* The timer stops when the callback retuns a truthy value */
        var time = (0, _d3Timer.timer)(function (elapsed, d) {
          if (_this2._setStopped) {
            return true;
          }
          // return true;

          var progress = easeFun(elapsed / duration);

          var value = i(progress);

          // num = value;
          if (direction > 0) {
            if (value >= end) {
              // console.log("Hit the Step Point!")
              _this2._updateStateValue(prop, end);
              resolve(time);
              return true;
            }
          } else {
            if (value <= end) {
              // console.log("Hit the Step Point!")
              _this2._updateStateValue(prop, end);
              resolve(time);
              return true;
            }
          }

          _this2._updateStateValue(prop, value);

          // _self.setState({width: value})
          if (elapsed > duration) {
            _this2._updateStateValue(prop, end);
            resolve(time);
            return true;
          }
        });
      });
    }
  }, {
    key: 'getLabelPos',
    value: function getLabelPos(pos) {
      switch (pos) {
        case 'left':
          return 0.4;
        case 'center':
        case 'middle':
          return 0.5;
        default:
          return 0.6;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          wrapStyle = _props.wrapStyle,
          style = _props.style,
          mainBkg = _props.mainBkg,
          decorate = _props.decorate,
          textStyle = _props.textStyle,
          progressStyle = _props.progressStyle,
          progressBkg = _props.progressBkg,
          labelPos = _props.labelPos,
          progressColor = _props.progressColor,
          highColor = _props.highColor,
          decimal = _props.decimal,
          max = _props.max,
          high = _props.high;
      var val = this.state.val;

      var valueData = [{ number: 0, color: 'none' }, { number: val, color: progressColor }, { number: max - val, color: 'rgba(0,0,0,0)' }];
      var baseData = [{ number: 0, color: 'none' }, { number: high, color: progressBkg }, { number: max - high, color: highColor }];
      var decoration = decorate && [_react2.default.createElement('rect', {
        x: 1,
        y: 1,
        width: width - 2,
        height: height - 2,
        fill: 'transparent',
        stroke: 'rgb(170, 170, 170)',
        strokeWidth: '2px' }), _react2.default.createElement('polygon', {
        points: width * 0.75 + ',' + height + '                           ' + width * 0.8 + ',' + height * 0.95 + '  ' + width + ',' + height * 0.95 + '                           ' + width + ',' + height + ' ' + width * 0.75 + ',' + height,
        style: { fill: '#aaa', stroke: '', strokeWidth: 1 } })];
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width, height: height }, wrapStyle), ref: 'wrap' },
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            width: this.props.width,
            height: this.props.height,
            style: _extends({ background: mainBkg }, style) },
          _react2.default.createElement(_GaugeArc2.default, {
            width: this.props.width,
            height: this.props.height,
            thickness: this.props.thickness,
            pie: this.pie,
            color: this.color,
            data: baseData }),
          _react2.default.createElement(_GaugeArc2.default, {
            width: this.props.width,
            thickness: this.props.thickness,
            height: this.props.height,
            pie: this.pie,
            style: progressStyle,
            data: valueData }),
          _react2.default.createElement(
            'text',
            {
              x: this.props.width / 2,
              y: this.props.height / 2,
              fontSize: 36,
              fill: '#eee',
              textAnchor: 'middle',
              alignmentBaseline: 'central',
              style: textStyle },
            val && val.toLocaleString(undefined, {
              minimumFractionDigits: decimal,
              maximumFractionDigits: decimal
            })
          ),
          _react2.default.createElement(
            'text',
            {
              x: this.props.width * this.getLabelPos(labelPos),
              y: this.props.height - 40,
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

  return CircleGauge;
}(_react2.default.Component);

CircleGauge.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  max: _propTypes2.default.number,
  high: _propTypes2.default.number,
  value: _propTypes2.default.any,
  decorate: _propTypes2.default.bool,
  decimal: _propTypes2.default.number,
  thickness: _propTypes2.default.number,
  startAngle: _propTypes2.default.number,
  endAngle: _propTypes2.default.number,
  unit: _propTypes2.default.string,
  labelPos: _propTypes2.default.string,
  textStyle: _propTypes2.default.object,
  mainBkg: _propTypes2.default.string,
  progressBkg: _propTypes2.default.string,
  progressColor: _propTypes2.default.string,
  highColor: _propTypes2.default.string,
  progressStyle: _propTypes2.default.object,
  wrapStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  duration: _propTypes2.default.number,
  id: _propTypes2.default.string.isRequired
};
CircleGauge.defaultProps = {
  width: 200,
  height: 170,
  max: 100,
  high: 90,
  thickness: 10,
  startAngle: 180,
  endAngle: 420,
  decimal: 2,
  duration: 500,
  labelPos: 'right',
  progressColor: '#FFFFFF',
  progressBkg: '#666',
  mainBkg: false,
  highColor: 'crimson',
  id: 'launch-gauge'
};
exports.default = CircleGauge;