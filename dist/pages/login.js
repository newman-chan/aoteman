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

var _Tips = require('./../util/Tips.js');

var _Tips2 = _interopRequireDefault(_Tips);

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
      navigationBarTitleText: '登录'
    }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
      islogin: true
    }, _this.methods = {
      clickLogin: function clickLogin() {
        if (!this.islogin) {
          this.islogin = true;
          this.onShow();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onReady',
    value: function onReady() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      _config2.default.log('登录中');
      this.wxLogin(function (res) {
        if (res.code == 0) {
          _this2.$parent.globalData.isLogin = false;
          _Util2.default.goPageBack(1);
        } else {
          _Tips2.default.toast(_login.msg, function () {
            _this2.islogin = true;
          });
        }
      }, 1);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsImRhdGEiLCJpc2xvZ2luIiwibWV0aG9kcyIsImNsaWNrTG9naW4iLCJvblNob3ciLCJsb2ciLCJ3eExvZ2luIiwicmVzIiwiY29kZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNMb2dpbiIsImdvUGFnZUJhY2siLCJ0b2FzdCIsIl9sb2dpbiIsIm1zZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxNLEdBQVMsaUMsUUFDVEMsSSxHQUFPO0FBQ0xDLGVBQVM7QUFESixLLFFBSVBDLE8sR0FBVTtBQUNSQyxnQkFEUSx3QkFDSztBQUNYLFlBQUksQ0FBQyxLQUFLRixPQUFWLEVBQW1CO0FBQ2pCLGVBQUtBLE9BQUwsR0FBZSxJQUFmO0FBQ0EsZUFBS0csTUFBTDtBQUNEO0FBQ0Y7QUFOTyxLOzs7Ozs2QkFRRCxDQUFFOzs7OEJBQ0QsQ0FBRTs7OzZCQUNIO0FBQUE7O0FBQ1AsdUJBQUdDLEdBQUgsQ0FBTyxLQUFQO0FBQ0EsV0FBS0MsT0FBTCxDQUFhLGVBQU87QUFDbEIsWUFBSUMsSUFBSUMsSUFBSixJQUFZLENBQWhCLEVBQW1CO0FBQ2pCLGlCQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLE9BQXhCLEdBQWtDLEtBQWxDO0FBQ0EseUJBQUdDLFVBQUgsQ0FBYyxDQUFkO0FBQ0QsU0FIRCxNQUdPO0FBQ0wseUJBQUtDLEtBQUwsQ0FBV0MsT0FBT0MsR0FBbEIsRUFBdUIsWUFBTTtBQUMzQixtQkFBS2QsT0FBTCxHQUFlLElBQWY7QUFDRCxXQUZEO0FBR0Q7QUFDRixPQVRELEVBU0UsQ0FURjtBQVVEOzs7O0VBL0JnQyxlQUFLZSxJOztrQkFBbkJwQixLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY2YgZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IGh0dHBzIGZyb20gJy4uL21peGlucy9IdHRwcyc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcclxuaW1wb3J0IHV0IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcbmltcG9ydCBUaXBzIGZyb20gJy4uL3V0aWwvVGlwcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lSdcclxuICB9O1xyXG4gIG1peGlucyA9IFtodHRwcywgYXV0aF07XHJcbiAgZGF0YSA9IHtcclxuICAgIGlzbG9naW46IHRydWVcclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2xpY2tMb2dpbigpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzbG9naW4pIHtcclxuICAgICAgICB0aGlzLmlzbG9naW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25TaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZCgpIHt9XHJcbiAgb25SZWFkeSgpIHt9XHJcbiAgb25TaG93KCkge1xyXG4gICAgY2YubG9nKCfnmbvlvZXkuK0nKTtcclxuICAgIHRoaXMud3hMb2dpbihyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlzTG9naW4gPSBmYWxzZTtcclxuICAgICAgICB1dC5nb1BhZ2VCYWNrKDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFRpcHMudG9hc3QoX2xvZ2luLm1zZywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc2xvZ2luID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSwxKTtcclxuICB9XHJcbn1cclxuIl19