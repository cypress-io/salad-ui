'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatter = require('../../../lib/formatter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = function (_React$Component) {
  _inherits(Bar, _React$Component);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
  }

  _createClass(Bar, [{
    key: 'formatValue',
    value: function formatValue(value) {
      return this.props.metricName === '%' ? Math.round(value) : (0, _formatter.formatNumber)(value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: {
            position: 'relative',
            marginBottom: 15
          } },
        _react2.default.createElement(
          'div',
          { style: { fontSize: 13, textTransform: 'uppercase' } },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'bar-row' },
          _react2.default.createElement(
            'div',
            { style: {
                backgroundColor: this.props.barRailColor,
                width: '100%',
                height: this.props.barHeight,
                display: 'block',
                marginTop: 4,
                position: 'relative' } },
            _react2.default.createElement('div', { style: {
                width: this.props.percent + '%',
                height: this.props.barHeight,
                position: 'absolute',
                backgroundColor: this.props.barColor,
                top: 0,
                left: 0,
                bottom: 0,
                transition: 'all .5s' } })
          ),
          _react2.default.createElement(
            'div',
            { style: {
                paddingLeft: this.props.metricPadding,
                fontSize: 13,
                display: 'inline-block',
                position: 'absolute',
                right: 0,
                top: 0,
                fontWeight: 'bold',
                color: this.props.metricColor,
                textAlign: 'right' } },
            this.formatValue(this.props.value) + ' ' + this.props.metricName
          )
        )
      );
    }
  }]);

  return Bar;
}(_react2.default.Component);

Bar.defaultProps = {
  metricName: 'points',
  value: '0',
  percent: 100,
  metricPadding: 15,
  metricColor: '#777',
  barHeight: 7,
  barRailColor: '#ddd',
  barColor: '#408AE5',
  label: 'N/A'
};
Bar.propTypes = {
  metricName: _propTypes2.default.string,
  percent: _propTypes2.default.number,
  barWidth: _propTypes2.default.number,
  barHeight: _propTypes2.default.number,
  metricPadding: _propTypes2.default.number,
  label: _propTypes2.default.string,
  metricColor: _propTypes2.default.string,
  barColor: _propTypes2.default.string,
  barRailColor: _propTypes2.default.string
};
exports.default = Bar;