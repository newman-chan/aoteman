'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

var _Util = require('./../util/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '领取成功'
    }, _this.mixins = [], _this.data = {
      prizeId: ''
    }, _this.methods = {
      clickConfirm: function clickConfirm() {
        _Util2.default.goPage('index', {}, 3);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(_opt) {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Y2Nlc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiZGF0YSIsInByaXplSWQiLCJtZXRob2RzIiwiY2xpY2tDb25maXJtIiwiZ29QYWdlIiwiX29wdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBTztBQUNMQyw4QkFBd0I7QUFEbkIsSyxRQUdQQyxNLEdBQVMsRSxRQUNUQyxJLEdBQU87QUFDTEMsZUFBUTtBQURILEssUUFJUEMsTyxHQUFVO0FBQ1JDLGtCQURRLDBCQUNPO0FBQ2IsdUJBQUdDLE1BQUgsQ0FBVSxPQUFWLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCO0FBQ0Q7QUFITyxLOzs7OzsyQkFLSEMsSSxFQUFNLENBRVo7Ozs2QkFDUSxDQUFFOzs7O0VBakJzQixlQUFLQyxJOztrQkFBbkJWLEsiLCJmaWxlIjoic3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB1dCBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZz17XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aKG5Y+W5oiQ5YqfJ1xyXG4gIH1cclxuICBtaXhpbnMgPSBbXTtcclxuICBkYXRhID0ge1xyXG4gICAgcHJpemVJZDonJ1xyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0NvbmZpcm0oKSB7XHJcbiAgICAgIHV0LmdvUGFnZSgnaW5kZXgnLCB7fSwgMyk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBvbkxvYWQoX29wdCkge1xyXG4gICAgXHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbn1cclxuIl19