'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Bar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Bar(props) {
  var progressColor = props.progressColor,
      value = props.value,
      width = props.width,
      height = props.height,
      direction = props.direction,
      style = props.style;


  var val = value * height;

  return direction === 'horizontal' ? _react2.default.createElement('rect', {
    fill: progressColor,
    height: height,
    style: style,
    width: value * width }) : _react2.default.createElement('rect', {
    style: style,
    fill: progressColor,
    height: val,
    y: height - val,
    width: width });
}
Bar.propTypes = {
  progressColor: _propTypes2.default.string,
  value: _propTypes2.default.number,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  direction: _propTypes2.default.string,
  style: _propTypes2.default.object
};