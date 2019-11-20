'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

var _Https = require('./../mixins/Https.js');

var _Https2 = _interopRequireDefault(_Https);

var _Auth = require('./../mixins/Auth.js');

var _Auth2 = _interopRequireDefault(_Auth);

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
      navigationBarTitleText: '账号'
    }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {}, _this.methods = {
      clickAddress: function clickAddress() {
        _Util2.default.goPage('address', { isEdit: 1 });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(opt) {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiZGF0YSIsIm1ldGhvZHMiLCJjbGlja0FkZHJlc3MiLCJnb1BhZ2UiLCJpc0VkaXQiLCJvcHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLE0sR0FBUyxpQyxRQUNUQyxJLEdBQU8sRSxRQUlQQyxPLEdBQVU7QUFDUkMsa0JBRFEsMEJBQ007QUFDWix1QkFBR0MsTUFBSCxDQUFVLFNBQVYsRUFBb0IsRUFBQ0MsUUFBTyxDQUFSLEVBQXBCO0FBQ0Q7QUFITyxLOzs7OzsyQkFLSEMsRyxFQUFLLENBQUU7Ozs2QkFDTCxDQUVSOzs7O0VBakJnQyxlQUFLQyxJOztrQkFBbkJWLEsiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCBodHRwcyBmcm9tICcuLi9taXhpbnMvSHR0cHMnO1xyXG5pbXBvcnQgYXV0aCBmcm9tICcuLi9taXhpbnMvQXV0aCc7XHJcbmltcG9ydCB1dCBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotKblj7cnXHJcbiAgfTtcclxuICBtaXhpbnMgPSBbaHR0cHMsIGF1dGhdO1xyXG4gIGRhdGEgPSB7XHJcbiAgICBcclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2xpY2tBZGRyZXNzKCl7XHJcbiAgICAgIHV0LmdvUGFnZSgnYWRkcmVzcycse2lzRWRpdDoxfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBvbkxvYWQob3B0KSB7fVxyXG4gIG9uU2hvdygpIHtcclxuICAgIFxyXG4gIH1cclxufVxyXG4iXX0=