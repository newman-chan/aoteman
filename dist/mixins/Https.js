'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Https = function (_wepy$mixin) {
  _inherits(Https, _wepy$mixin);

  function Https() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Https);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Https.__proto__ || Object.getPrototypeOf(Https)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      mixin: '请求方法',
      hash: {}, //是为了记录当前请求链接，避免重复请求
      isloading: false,
      isend: false,
      pageNum: 1,
      pageSize: 6,
      pageTotal: 0,
      list: []
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Https, [{
    key: 'isDouble',
    value: function isDouble(key) {
      var bl = false;
      for (var o in this.hash) {
        if (o == key) {
          bl = true;
          break;
        }
      }
      return bl;
    }
  }, {
    key: 'delHash',
    value: function delHash(key) {
      if (this.hash[key]) delete this.hash[key];
    }
    /**
     * 单次请求
     * @param {*} _url 
     * @param {*} _callback 
     * @param {*} _params 
     * @param {*} _method 
     */

  }, {
    key: 'wxRequest',
    value: function wxRequest(_url, _callback, _params, _method, _loading) {
      var self = this;
      var _tempUrl = _config2.default.host + _url;
      var _tempParams = _params || {};
      var _tempMethod = _method == 1 ? "POST" : "GET";
      var field0 = _url.substring(0, _url.lastIndexOf("/"));
      field0 = field0.substring(field0.lastIndexOf("/") + 1, field0.length);
      var field1 = _url.substring(_url.lastIndexOf("/") + 1, _url.length);
      var key = field0 + '_' + field1;
      //阻止连续点击
      if (self.isDouble(key)) {
        return;
      } else {
        self.hash[key] = _tempParams;
      }

      _tempParams.token = self.$parent.globalData.login.token;

      var log = "————————————————————————————————————————————————————————————\n";
      log += "请求的方法：" + _tempMethod + "\n";
      log += "请求的链接：" + _tempUrl + "\n";
      log += "请求的参数：" + JSON.stringify(_tempParams) + "\n";
      log += "————————————————————————————————————————————————————————————\n";
      if (_loading) wx.showLoading({ mask: true });
      wx.request({
        url: _tempUrl,
        data: _tempParams,
        method: _tempMethod,
        header: {
          'content-type': _tempMethod == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        success: function success(res) {
          wx.hideLoading();
          _config2.default.log(res);
          if (res.statusCode != 200 || res.data.code == undefined) {
            res.data = {
              code: res.statusCode,
              msg: "接口异常"
            };
          }

          log += JSON.stringify(res.data);
          log += "\n————————————————————————————————————————————————————————————\n";
          _config2.default.log(log);

          self.delHash(key);
          if (res.data.code == 5001) {
            res.data.msg = '加载中';
            _config2.default.log("去登录" + self.$parent.globalData.isLogin);
            if (!self.$parent.globalData.isLogin) {
              self.$parent.globalData.isLogin = true;
              wx.showLoading({ mask: true, title: "验证中" });
              self.wxLogin(function (r) {
                wx.hideLoading();
                self.$parent.globalData.isLogin = false;
                self.onShow();
              }, 1);
            }
          }
          _callback && _callback(res.data);
        },
        fail: function fail(res) {
          wx.hideLoading();
          _config2.default.log(res);
          _config2.default.log('\n');
          var obj = {
            code: 404,
            msg: "网络异常"
          };
          log += JSON.stringify(res.data);
          log += "\n————————————————————————————————————————————————————————————\n";
          _config2.default.log(log);

          self.delHash(key);
          _callback && _callback(obj);
        }
      });
    }
    /**
     * 多页请求
     */

  }, {
    key: 'wxRequests',
    value: function wxRequests(_init, _url, _callback, _params, _method, _loading) {
      var self = this;
      if (_init) {
        self.isloading = false;
        self.isend = false;
        self.pageNum = 1;
        self.pageSize = Math.max(_init, self.pageSize);
        self.list = [];
      }

      if (self.isend) return;
      if (self.isloading) return;
      self.isloading = true;

      _params = _params || {};
      _params.page = self.pageNum;
      _params.page_size = self.pageSize;
      self.wxRequest(_url, function (res) {
        res.data = res.data || {};
        self.isloading = false;
        self.isend = self.pageNum * self.pageSize >= res.data.total ? true : false;
        self.pageNum++;
        self.pageTotal = res.data.total || 0;
        _callback && _callback(res);
      }, _params, _method, _loading);
    }
  }]);

  return Https;
}(_wepy2.default.mixin);

exports.default = Https;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkh0dHBzLmpzIl0sIm5hbWVzIjpbIkh0dHBzIiwiZGF0YSIsIm1peGluIiwiaGFzaCIsImlzbG9hZGluZyIsImlzZW5kIiwicGFnZU51bSIsInBhZ2VTaXplIiwicGFnZVRvdGFsIiwibGlzdCIsIm1ldGhvZHMiLCJrZXkiLCJibCIsIm8iLCJfdXJsIiwiX2NhbGxiYWNrIiwiX3BhcmFtcyIsIl9tZXRob2QiLCJfbG9hZGluZyIsInNlbGYiLCJfdGVtcFVybCIsImhvc3QiLCJfdGVtcFBhcmFtcyIsIl90ZW1wTWV0aG9kIiwiZmllbGQwIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJsZW5ndGgiLCJmaWVsZDEiLCJpc0RvdWJsZSIsInRva2VuIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJsb2dpbiIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3eCIsInNob3dMb2FkaW5nIiwibWFzayIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiaGlkZUxvYWRpbmciLCJzdGF0dXNDb2RlIiwiY29kZSIsInVuZGVmaW5lZCIsIm1zZyIsImRlbEhhc2giLCJpc0xvZ2luIiwidGl0bGUiLCJ3eExvZ2luIiwib25TaG93IiwiZmFpbCIsIm9iaiIsIl9pbml0IiwiTWF0aCIsIm1heCIsInBhZ2UiLCJwYWdlX3NpemUiLCJ3eFJlcXVlc3QiLCJ0b3RhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLEksR0FBTztBQUNMQyxhQUFPLE1BREY7QUFFTEMsWUFBTSxFQUZELEVBRUk7QUFDVEMsaUJBQVcsS0FITjtBQUlMQyxhQUFPLEtBSkY7QUFLTEMsZUFBUyxDQUxKO0FBTUxDLGdCQUFVLENBTkw7QUFPTEMsaUJBQVcsQ0FQTjtBQVFMQyxZQUFNO0FBUkQsSyxRQVVQQyxPLEdBQVUsRTs7Ozs7NkJBR0RDLEcsRUFBSztBQUNaLFVB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QWEsS0FBYjtBQUNBYyxhQUFLYixPQUFMLEdBQWUsQ0FBZjtBQUNBYSxhQUFLWixRQUFMLEdBQWdCb0QsS0FBS0MsR0FBTCxDQUFTRixLQUFULEVBQWV2QyxLQUFLWixRQUFwQixDQUFoQjtBQUNBWSxhQUFLVixJQUFMLEdBQVksRUFBWjtBQUNEOztBQUVELFVBQUlVLEtBQUtkLEtBQVQsRUFBZ0I7QUFDaEIsVUFBSWMsS0FBS2YsU0FBVCxFQUFvQjtBQUNwQmUsV0FBS2YsU0FBTCxHQUFpQixJQUFqQjs7QUFFQVksZ0JBQVVBLFdBQVcsRUFBckI7QUFDQUEsY0FBUTZDLElBQVIsR0FBZTFDLEtBQUtiLE9BQXBCO0FBQ0FVLGNBQVE4QyxTQUFSLEdBQW9CM0MsS0FBS1osUUFBekI7QUFDQVksV0FBSzRDLFNBQUwsQ0FBZWpELElBQWYsRUFBcUIsZUFBTztBQUMxQitCLFlBQUk1QyxJQUFKLEdBQVc0QyxJQUFJNUMsSUFBSixJQUFZLEVBQXZCO0FBQ0FrQixhQUFLZixTQUFMLEdBQWlCLEtBQWpCO0FBQ0FlLGFBQUtkLEtBQUwsR0FBYWMsS0FBS2IsT0FBTCxHQUFlYSxLQUFLWixRQUFwQixJQUFnQ3NDLElBQUk1QyxJQUFKLENBQVMrRCxLQUF6QyxHQUFpRCxJQUFqRCxHQUF3RCxLQUFyRTtBQUNBN0MsYUFBS2IsT0FBTDtBQUNBYSxhQUFLWCxTQUFMLEdBQWlCcUMsSUFBSTVDLElBQUosQ0FBUytELEtBQVQsSUFBa0IsQ0FBbkM7QUFDQWpELHFCQUFhQSxVQUFVOEIsR0FBVixDQUFiO0FBQ0QsT0FQRCxFQU9HN0IsT0FQSCxFQU9ZQyxPQVBaLEVBT3FCQyxRQVByQjtBQVFEOzs7O0VBN0lnQyxlQUFLaEIsSzs7a0JBQW5CRixLIiwiZmlsZSI6Ikh0dHBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0dHBzIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcbiAgZGF0YSA9IHtcclxuICAgIG1peGluOiAn6K+35rGC5pa55rOVJyxcclxuICAgIGhhc2g6IHt9LC8v5piv5Li65LqG6K6w5b2V5b2T5YmN6K+35rGC6ZO+5o6l77yM6YG/5YWN6YeN5aSN6K+35rGCXHJcbiAgICBpc2xvYWRpbmc6IGZhbHNlLFxyXG4gICAgaXNlbmQ6IGZhbHNlLFxyXG4gICAgcGFnZU51bTogMSxcclxuICAgIHBhZ2VTaXplOiA2LFxyXG4gICAgcGFnZVRvdGFsOiAwLFxyXG4gICAgbGlzdDogW11cclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuXHJcbiAgfVxyXG4gIGlzRG91YmxlKGtleSkge1xyXG4gICAgbGV0IGJsID0gZmFsc2U7XHJcbiAgICBmb3IgKGxldCBvIGluIHRoaXMuaGFzaCkge1xyXG4gICAgICBpZiAobyA9PSBrZXkpIHtcclxuICAgICAgICBibCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBibDtcclxuICB9XHJcbiAgZGVsSGFzaChrZXkpIHtcclxuICAgIGlmICh0aGlzLmhhc2hba2V5XSkgZGVsZXRlIHRoaXMuaGFzaFtrZXldO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDljZXmrKHor7fmsYJcclxuICAgKiBAcGFyYW0geyp9IF91cmwgXHJcbiAgICogQHBhcmFtIHsqfSBfY2FsbGJhY2sgXHJcbiAgICogQHBhcmFtIHsqfSBfcGFyYW1zIFxyXG4gICAqIEBwYXJhbSB7Kn0gX21ldGhvZCBcclxuICAgKi9cclxuICB3eFJlcXVlc3QoX3VybCwgX2NhbGxiYWNrLCBfcGFyYW1zLCBfbWV0aG9kLCBfbG9hZGluZykge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IF90ZW1wVXJsID0gY2YuaG9zdCArIF91cmw7XHJcbiAgICBsZXQgX3RlbXBQYXJhbXMgPSBfcGFyYW1zIHx8IHt9O1xyXG4gICAgbGV0IF90ZW1wTWV0aG9kID0gX21ldGhvZCA9PSAxID8gXCJQT1NUXCIgOiBcIkdFVFwiO1xyXG4gICAgdmFyIGZpZWxkMCA9IF91cmwuc3Vic3RyaW5nKDAsIF91cmwubGFzdEluZGV4T2YoXCIvXCIpKTtcclxuICAgIGZpZWxkMCA9IGZpZWxkMC5zdWJzdHJpbmcoZmllbGQwLmxhc3RJbmRleE9mKFwiL1wiKSArIDEsIGZpZWxkMC5sZW5ndGgpO1xyXG4gICAgdmFyIGZpZWxkMSA9IF91cmwuc3Vic3RyaW5nKF91cmwubGFzdEluZGV4T2YoXCIvXCIpICsgMSwgX3VybC5sZW5ndGgpO1xyXG4gICAgbGV0IGtleSA9IGZpZWxkMCArICdfJyArIGZpZWxkMTtcclxuICAgIC8v6Zi75q2i6L+e57ut54K55Ye7XHJcbiAgICBpZiAoc2VsZi5pc0RvdWJsZShrZXkpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBzZWxmLmhhc2hba2V5XSA9IF90ZW1wUGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIF90ZW1wUGFyYW1zLnRva2VuID0gc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEubG9naW4udG9rZW47XHJcblxyXG4gICAgbGV0IGxvZyA9IFwi4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUXFxuXCI7XHJcbiAgICBsb2cgKz0gXCLor7fmsYLnmoTmlrnms5XvvJpcIiArIF90ZW1wTWV0aG9kICsgXCJcXG5cIjtcclxuICAgIGxvZyArPSBcIuivt+axgueahOmTvuaOpe+8mlwiICsgX3RlbXBVcmwgKyBcIlxcblwiO1xyXG4gICAgbG9nICs9IFwi6K+35rGC55qE5Y+C5pWw77yaXCIgKyBKU09OLnN0cmluZ2lmeShfdGVtcFBhcmFtcykgKyBcIlxcblwiO1xyXG4gICAgbG9nICs9IFwi4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUXFxuXCI7XHJcbiAgICBpZiAoX2xvYWRpbmcpIHd4LnNob3dMb2FkaW5nKHsgbWFzazogdHJ1ZSB9KTtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IF90ZW1wVXJsLFxyXG4gICAgICBkYXRhOiBfdGVtcFBhcmFtcyxcclxuICAgICAgbWV0aG9kOiBfdGVtcE1ldGhvZCxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IChfdGVtcE1ldGhvZCA9PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKVxyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICBjZi5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT0gMjAwIHx8IHJlcy5kYXRhLmNvZGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgY29kZTogcmVzLnN0YXR1c0NvZGUsXHJcbiAgICAgICAgICAgIG1zZzogXCLmjqXlj6PlvILluLhcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9nICs9IEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhKTtcclxuICAgICAgICBsb2cgKz0gXCJcXG7igJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJRcXG5cIjtcclxuICAgICAgICBjZi5sb2cobG9nKTtcclxuXHJcbiAgICAgICAgc2VsZi5kZWxIYXNoKGtleSk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gNTAwMSkge1xyXG4gICAgICAgICAgcmVzLmRhdGEubXNnID0gJ+WKoOi9veS4rSdcclxuICAgICAgICAgIGNmLmxvZyhcIuWOu+eZu+W9lVwiICsgc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEuaXNMb2dpbilcclxuICAgICAgICAgIGlmICghc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEuaXNMb2dpbikge1xyXG4gICAgICAgICAgICBzZWxmLiRwYXJlbnQuZ2xvYmFsRGF0YS5pc0xvZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoeyBtYXNrOiB0cnVlLHRpdGxlOlwi6aqM6K+B5LitXCIgfSk7XHJcbiAgICAgICAgICAgIHNlbGYud3hMb2dpbihyPT57XHJcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICBzZWxmLiRwYXJlbnQuZ2xvYmFsRGF0YS5pc0xvZ2luID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgc2VsZi5vblNob3coKTtcclxuICAgICAgICAgICAgfSwxKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBfY2FsbGJhY2sgJiYgX2NhbGxiYWNrKHJlcy5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbDogKHJlcykgPT4ge1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgY2YubG9nKHJlcyk7XHJcbiAgICAgICAgY2YubG9nKCdcXG4nKTtcclxuICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgY29kZTogNDA0LFxyXG4gICAgICAgICAgbXNnOiBcIue9kee7nOW8guW4uFwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvZyArPSBKU09OLnN0cmluZ2lmeShyZXMuZGF0YSk7XHJcbiAgICAgICAgbG9nICs9IFwiXFxu4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUXFxuXCI7XHJcbiAgICAgICAgY2YubG9nKGxvZyk7XHJcblxyXG4gICAgICAgIHNlbGYuZGVsSGFzaChrZXkpO1xyXG4gICAgICAgIF9jYWxsYmFjayAmJiBfY2FsbGJhY2sob2JqKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5aSa6aG16K+35rGCXHJcbiAgICovXHJcbiAgd3hSZXF1ZXN0cyhfaW5pdCwgX3VybCwgX2NhbGxiYWNrLCBfcGFyYW1zLCBfbWV0aG9kLCBfbG9hZGluZykge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgaWYgKF9pbml0KSB7XHJcbiAgICAgIHNlbGYuaXNsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHNlbGYuaXNlbmQgPSBmYWxzZTtcclxuICAgICAgc2VsZi5wYWdlTnVtID0gMTtcclxuICAgICAgc2VsZi5wYWdlU2l6ZSA9IE1hdGgubWF4KF9pbml0LHNlbGYucGFnZVNpemUpO1xyXG4gICAgICBzZWxmLmxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2VsZi5pc2VuZCkgcmV0dXJuO1xyXG4gICAgaWYgKHNlbGYuaXNsb2FkaW5nKSByZXR1cm47XHJcbiAgICBzZWxmLmlzbG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgX3BhcmFtcyA9IF9wYXJhbXMgfHwge307XHJcbiAgICBfcGFyYW1zLnBhZ2UgPSBzZWxmLnBhZ2VOdW07XHJcbiAgICBfcGFyYW1zLnBhZ2Vfc2l6ZSA9IHNlbGYucGFnZVNpemU7XHJcbiAgICBzZWxmLnd4UmVxdWVzdChfdXJsLCByZXMgPT4ge1xyXG4gICAgICByZXMuZGF0YSA9IHJlcy5kYXRhIHx8IHt9O1xyXG4gICAgICBzZWxmLmlzbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBzZWxmLmlzZW5kID0gc2VsZi5wYWdlTnVtICogc2VsZi5wYWdlU2l6ZSA+PSByZXMuZGF0YS50b3RhbCA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgc2VsZi5wYWdlTnVtKys7XHJcbiAgICAgIHNlbGYucGFnZVRvdGFsID0gcmVzLmRhdGEudG90YWwgfHwgMDtcclxuICAgICAgX2NhbGxiYWNrICYmIF9jYWxsYmFjayhyZXMpO1xyXG4gICAgfSwgX3BhcmFtcywgX21ldGhvZCwgX2xvYWRpbmcpO1xyXG4gIH1cclxufVxyXG4iXX0=