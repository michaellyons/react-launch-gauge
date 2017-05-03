'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Shape = require('d3-shape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GaugePath = function (_React$Component) {
  _inherits(GaugePath, _React$Component);

  function GaugePath(props) {
    _classCallCheck(this, GaugePath);

    var _this = _possibleConstructorReturn(this, (GaugePath.__proto__ || Object.getPrototypeOf(GaugePath)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.createChart = _this.createChart.bind(_this);
    return _this;
  }

  _createClass(GaugePath, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          thickness = _props.thickness;


      var radius = this.props.height / 2;

      var outerRadius = radius - 10;
      var innerRadius = outerRadius - thickness;

      this.arc = (0, _d3Shape.arc)().outerRadius(outerRadius).innerRadius(innerRadius);

      this.transform = 'translate(' + width / 2 + ',' + height / 2 + ')';
    }
  }, {
    key: 'createChart',
    value: function createChart(_self) {
      var paths = this.props.pie(this.props.data).map(function (d, i) {
        var fill = _self.props.data[i].color || _self.props.fill || '#666';
        var style = i === 1 ? _self.props.style : {};
        return _react2.default.createElement('path', { fill: fill, d: _self.arc(d), key: i, style: style });
      });
      return paths;
    }
  }, {
    key: 'render',
    value: function render() {
      var paths = this.createChart(this);

      return _react2.default.createElement(
        'g',
        { transform: this.transform },
        paths
      );
    }
  }]);

  return GaugePath;
}(_react2.default.Component);

GaugePath.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  thickness: _propTypes2.default.number,
  data: _propTypes2.default.array,
  pie: _propTypes2.default.func
};
GaugePath.defaultProps = {
  thickness: 10
};
exports.default = GaugePath;