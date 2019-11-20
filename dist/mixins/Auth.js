'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _jsMd = require('./../npm/js-md5/src/md5.js');

var _jsMd2 = _interopRequireDefault(_jsMd);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

var _Util = require('./../util/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auth = function (_wepy$mixin) {
    _inherits(Auth, _wepy$mixin);

    function Auth() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Auth);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Auth.__proto__ || Object.getPrototypeOf(Auth)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            mixin: '登录'
        }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Auth, [{
        key: 'isLogin',
        value: function isLogin() {
            var _self = this;
            return new Promise(function (resolve, reject) {
                wx.showLoading({ mask: true, title: "验证中" });
                _self.wxLogin(function (res) {
                    wx.hideLoading();
                    resolve(res);
                });
            });
        }
    }, {
        key: 'wxLogin',
        value: function wxLogin(_callback, _reset) {
            var _self = this;
            var _atmLogin = _Util2.default.getStorageSync('atm_login');
            var _curTime = parseInt(new Date().getTime() / 1000);

            _config2.default.log(_curTime);
            _config2.default.log(_atmLogin.expired_at);
            _config2.default.log(_atmLogin.expired_at - _curTime);
            _config2.default.log(_Util2.default.formatTime(_curTime * 1000));
            _config2.default.log(_Util2.default.formatTime(_atmLogin.expired_at * 1000));
            _config2.default.log("开始登录");
            if (_atmLogin && _atmLogin.token && _curTime < _atmLogin.expired_at && _reset != 1) {
                _config2.default.log("本地登录");
                _config2.default.log(_atmLogin);
                _self.$parent.globalData.login = _atmLogin;
                var obj = { code: 0, message: "已登录了" };
                _callback && _callback(obj);
            } else {
                wx.login({
                    success: function success(res) {
                        _config2.default.log("CODE " + res.code);
                        if (res.code) {
                            var _userInfo = _Util2.default.getStorageSync('atm_userInfo');
                            _config2.default.log(_userInfo);
                            var timeStamp = parseInt(new Date().getTime() / 1000);
                            if (_userInfo && timeStamp - parseInt(_userInfo.timeStamp) <= 30 * 86400) {
                                _config2.default.log(timeStamp - parseInt(_userInfo.timeStamp));
                                _self.$parent.globalData.userInfo = _userInfo;
                                _self.userLogin(res.code, _callback);
                            } else {
                                _config2.default.log('授权');
                                _self.getWxUserInfo(res.code, _callback);
                            }
                        } else {
                            var _obj = { code: 404, message: "登录失败" };
                            _callback && _callback(_obj);
                        }
                    },
                    fail: function fail(e) {
                        var obj = { code: 404, message: "链接失败" };
                        _callback && _callback(obj);
                    }
                });
            }
        }
    }, {
        key: 'getWxUserInfo',
        value: function getWxUserInfo(code, _callback) {
            var _self = this;
            wx.getSetting({
                success: function success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            lang: 'zh_CN',
                            success: function success(res) {
                                _self.$parent.globalData.userInfo = res.userInfo;
                                _self.userLogin(code, _callback);
                            },
                            fail: function fail(res) {
                                wx.hideLoading();
                                _self.$invoke('AuthAlert', 'alertShow', code, _callback);
                            }
                        });
                    } else {
                        wx.hideLoading();
                        _self.$invoke('AuthAlert', 'alertShow', code, _callback);
                    }
                },
                fail: function fail(res) {
                    wx.hideLoading();
                    _self.$invoke('AuthAlert', 'alertShow', code, _callback);
                }
            });
        }
    }, {
        key: 'userLogin',
        value: function userLogin(code, _callback) {
            var _self = this;
            var userInfo = _self.$parent.globalData.userInfo || { nickname: "cC", avatar_url: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoz6Cm1iaEZJqGOUYKXURYdAZy5sZlmAwBiaiba7dfo2s4rA7yqOxEbSp8XnkyIJuaeibav9Ws6RjRw8Q/132", gender: 1, city: "", province: "", country: "China", language: "zh_CN" };
            var timeStamp = parseInt(new Date().getTime() / 1000);
            var str = "code=" + code + "&request_ts=" + timeStamp;
            // 只有本地获取的用户，才存在时间戳
            if (!userInfo.timeStamp) {
                _config2.default.log('重置用户信息');
                userInfo.timeStamp = timeStamp;
                _Util2.default.setStorageSync('atm_userInfo', userInfo);
            }

            var params = {
                code: code,
                nickname: userInfo.nickName,
                avatar_url: userInfo.avatarUrl,
                gender: userInfo.gender,
                city: userInfo.city,
                province: userInfo.province,
                country: userInfo.country,
                language: userInfo.language,
                request_ts: timeStamp,
                sign: (0, _jsMd2.default)((0, _jsMd2.default)(str) + _config2.default.signKey),
                debug: 1
            };
            _self.wxRequest("auth/login", function (res) {
                _config2.default.log("登录");
                if (res.code == 0) {
                    _self.$parent.globalData.login = res.data.token;
                    _Util2.default.setStorageSync('atm_login', res.data.token);
                }
                _callback && _callback(res);
            }, params, 1);
        }
    }]);

    return Auth;
}(_wepy2.default.mixin);

exports.default = Auth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1dGguanMiXSwibmFtZXMiOlsiQXV0aCIsImRhdGEiLCJtaXhpbiIsIm1ldGhvZHMiLCJfc2VsZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJzaG93TG9hZGluZyIsIm1hc2siLCJ0aXRsZSIsInd4TG9naW4iLCJoaWRlTG9hZGluZyIsInJlcyIsIl9jYWxsYmFjayIsIl9yZXNldCIsIl9hdG1Mb2dpbiIsImdldFN0b3JhZ2VTeW5jIiwiX2N1clRpbWUiLCJwYXJzZUludCIsIkRhdGUiLCJnZXRUaW1lIiwibG9nIiwiZXhwaXJlZF9hdCIsImZvcm1hdFRpbWUiLCJ0b2tlbiIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibG9naW4iLCJvYmoiLCJjb2RlIiwibWVzc2FnZSIsInN1Y2Nlc3MiLCJfdXNlckluZm8iLCJ0aW1lU3RhbXAiLCJ1c2VySW5mbyIsInVzZXJMb2dpbiIsImdldFd4VXNlckluZm8iLCJmYWlsIiwiZSIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwibGFuZyIsIiRpbnZva2UiLCJuaWNrbmFtZSIsImF2YXRhcl91cmwiLCJnZW5kZXIiLCJjaXR5IiwicHJvdmluY2UiLCJjb3VudHJ5IiwibGFuZ3VhZ2UiLCJzdHIiLCJzZXRTdG9yYWdlU3luYyIsInBhcmFtcyIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwicmVxdWVzdF90cyIsInNpZ24iLCJzaWduS2V5IiwiZGVidWciLCJ3eFJlcXVlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsSSxHQUFPO0FBQ0hDLG1CQUFPO0FBREosUyxRQUdQQyxPLEdBQVUsRTs7Ozs7a0NBR0M7QUFDUCxnQkFBSUMsUUFBUSxJQUFaO0FBQ0EsbUJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0MsbUJBQUdDLFdBQUgsQ0FBZSxFQUFFQyxNQUFNLElBQVIsRUFBY0MsT0FBTyxLQUFyQixFQUFmO0FBQ0FQLHNCQUFNUSxPQUFOLENBQWMsZUFBTztBQUNqQkosdUJBQUdLLFdBQUg7QUFDQVAsNEJBQVFRLEdBQVI7QUFDSCxpQkFIRDtBQUlILGFBTk0sQ0FBUDtBQU9IOzs7Z0NBQ1FDLFMsRUFBV0MsTSxFQUFRO0FBQ3hCLGdCQUFJWixRQUFRLElBQVo7QUFDQSxnQkFBSWEsWUFBWSxlQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWhCO0FBQ0EsZ0JBQUlDLFdBQVdDLFNBQVMsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEtBQXVCLElBQWhDLENBQWY7O0FBRUEsNkJBQUdDLEdBQUgsQ0FBT0osUUFBUDtBQUNBLDZCQUFHSSxHQUFILENBQU9OLFVBQVVPLFVBQWpCO0FBQ0EsNkJBQUdELEdBQUgsQ0FBT04sVUFBVU8sVUFBVixHQUF1QkwsUUFBOUI7QUFDQSw2QkFBR0ksR0FBSCxDQUFPLGVBQUdFLFVBQUgsQ0FBY04sV0FBVyxJQUF6QixDQUFQO0FBQ0EsNkJBQUdJLEdBQUgsQ0FBTyxlQUFHRSxVQUFILENBQWNSLFVBQVVPLFVBQVYsR0FBdUIsSUFBckMsQ0FBUDtBQUNBLDZCQUFHRCxHQUFILENBQU8sTUFBUDtBQUNBLGdCQUFJTixhQUFhQSxVQUFVUyxLQUF2QixJQUFnQ1AsV0FBV0YsVUFBVU8sVUFBckQsSUFBbUVSLFVBQVUsQ0FBakYsRUFBb0Y7QUFDaEYsaUNBQUdPLEdBQUgsQ0FBTyxNQUFQO0FBQ0EsaUNBQUdBLEdBQUgsQ0FBT04sU0FBUDtBQUNBYixzQkFBTXVCLE9BQU4sQ0FBY0MsVUFBZCxDQUF5QkMsS0FBekIsR0FBaUNaLFNBQWpDO0FBQ0Esb0JBQUlhLE1BQU0sRUFBRUMsTUFBTSxDQUFSLEVBQVdDLFNBQVMsTUFBcEIsRUFBVjtBQUNBakIsNkJBQWFBLFVBQVVlLEdBQVYsQ0FBYjtBQUNILGFBTkQsTUFPSztBQUNEdEIsbUJBQUdxQixLQUFILENBQVM7QUFDTEksNkJBQVMsc0JBQU87QUFDWix5Q0FBR1YsR0FBSCxDQUFPLFVBQVVULElBQUlpQixJQUFyQjtBQUNBLDRCQUFJakIsSUFBSWlCLElBQVIsRUFBYztBQUNWLGdDQUFJRyxZQUFZLGVBQUdoQixjQUFILENBQWtCLGNBQWxCLENBQWhCO0FBQ0EsNkNBQUdLLEdBQUgsQ0FBT1csU0FBUDtBQUNBLGdDQUFJQyxZQUFZZixTQUFTLElBQUlDLElBQUosR0FBV0MsT0FBWCxLQUF1QixJQUFoQyxDQUFoQjtBQUNBLGdDQUFJWSxhQUFhQyxZQUFZZixTQUFTYyxVQUFVQyxTQUFuQixDQUFaLElBQTZDLEtBQUssS0FBbkUsRUFBMEU7QUFDdEUsaURBQUdaLEdBQUgsQ0FBT1ksWUFBWWYsU0FBU2MsVUFBVUMsU0FBbkIsQ0FBbkI7QUFDQS9CLHNDQUFNdUIsT0FBTixDQUFjQyxVQUFkLENBQXlCUSxRQUF6QixHQUFvQ0YsU0FBcEM7QUFDQTlCLHNDQUFNaUMsU0FBTixDQUFnQnZCLElBQUlpQixJQUFwQixFQUEwQmhCLFNBQTFCO0FBQ0gsNkJBSkQsTUFJTztBQUNILGlEQUFHUSxHQUFILENBQU8sSUFBUDtBQUNBbkIsc0NBQU1rQyxhQUFOLENBQW9CeEIsSUFBSWlCLElBQXhCLEVBQThCaEIsU0FBOUI7QUFDSDtBQUNKLHlCQVpELE1BYUs7QUFDRCxnQ0FBSWUsT0FBTSxFQUFFQyxNQUFNLEdBQVIsRUFBYUMsU0FBUyxNQUF0QixFQUFWO0FBQ0FqQix5Q0FBYUEsVUFBVWUsSUFBVixDQUFiO0FBQ0g7QUFDSixxQkFwQkk7QUFxQkxTLDBCQUFNLGNBQVVDLENBQVYsRUFBYTtBQUNmLDRCQUFJVixNQUFNLEVBQUVDLE1BQU0sR0FBUixFQUFhQyxTQUFTLE1BQXRCLEVBQVY7QUFDQWpCLHFDQUFhQSxVQUFVZSxHQUFWLENBQWI7QUFDSDtBQXhCSSxpQkFBVDtBQTBCSDtBQUNKOzs7c0NBQ2NDLEksRUFBTWhCLFMsRUFBVztBQUM1QixnQkFBSVgsUUFBUSxJQUFaO0FBQ0FJLGVBQUdpQyxVQUFILENBQWM7QUFDVlIseUJBQVMsaUJBQUNuQixHQUFELEVBQVM7QUFDZCx3QkFBSUEsSUFBSTRCLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDbkNsQywyQkFBR21DLFdBQUgsQ0FBZTtBQUNYQyxrQ0FBTSxPQURLO0FBRVhYLHFDQUFTLGlCQUFDbkIsR0FBRCxFQUFTO0FBQ2RWLHNDQUFNdUIsT0FBTixDQUFjQyxVQUFkLENBQXlCUSxRQUF6QixHQUFvQ3RCLElBQUlzQixRQUF4QztBQUNBaEMsc0NBQU1pQyxTQUFOLENBQWdCTixJQUFoQixFQUFzQmhCLFNBQXRCO0FBQ0gsNkJBTFU7QUFNWHdCLGtDQUFNLGNBQUN6QixHQUFELEVBQVM7QUFDWE4sbUNBQUdLLFdBQUg7QUFDQVQsc0NBQU15QyxPQUFOLENBQWMsV0FBZCxFQUEyQixXQUEzQixFQUF3Q2QsSUFBeEMsRUFBOENoQixTQUE5QztBQUNIO0FBVFUseUJBQWY7QUFXSCxxQkFaRCxNQVlPO0FBQ0hQLDJCQUFHSyxXQUFIO0FBQ0FULDhCQUFNeUMsT0FBTixDQUFjLFdBQWQsRUFBMkIsV0FBM0IsRUFBd0NkLElBQXhDLEVBQThDaEIsU0FBOUM7QUFDSDtBQUNKLGlCQWxCUztBQW1CVndCLHNCQUFNLGNBQUN6QixHQUFELEVBQVM7QUFDWE4sdUJBQUdLLFdBQUg7QUFDQVQsMEJBQU15QyxPQUFOLENBQWMsV0FBZCxFQUEyQixXQUEzQixFQUF3Q2QsSUFBeEMsRUFBOENoQixTQUE5QztBQUNIO0FBdEJTLGFBQWQ7QUF3Qkg7OztrQ0FDVWdCLEksRUFBTWhCLFMsRUFBVztBQUN4QixnQkFBSVgsUUFBUSxJQUFaO0FBQ0EsZ0JBQUlnQyxXQUFXaEMsTUFBTXVCLE9BQU4sQ0FBY0MsVUFBZCxDQUF5QlEsUUFBekIsSUFBcUMsRUFBRVUsVUFBVSxJQUFaLEVBQWtCQyxZQUFZLGlJQUE5QixFQUFpS0MsUUFBUSxDQUF6SyxFQUE0S0MsTUFBTSxFQUFsTCxFQUFzTEMsVUFBVSxFQUFoTSxFQUFvTUMsU0FBUyxPQUE3TSxFQUFzTkMsVUFBVSxPQUFoTyxFQUFwRDtBQUNBLGdCQUFJakIsWUFBWWYsU0FBUyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsS0FBdUIsSUFBaEMsQ0FBaEI7QUFDQSxnQkFBSStCLE1BQU0sVUFBVXRCLElBQVYsR0FBaUIsY0FBakIsR0FBa0NJLFNBQTVDO0FBQ0E7QUFDQSxnQkFBSSxDQUFDQyxTQUFTRCxTQUFkLEVBQXlCO0FBQ3JCLGlDQUFHWixHQUFILENBQU8sUUFBUDtBQUNBYSx5QkFBU0QsU0FBVCxHQUFxQkEsU0FBckI7QUFDQSwrQkFBR21CLGNBQUgsQ0FBa0IsY0FBbEIsRUFBa0NsQixRQUFsQztBQUNIOztBQUVELGdCQUFJbUIsU0FBUztBQUNUeEIsc0JBQU1BLElBREc7QUFFVGUsMEJBQVVWLFNBQVNvQixRQUZWO0FBR1RULDRCQUFZWCxTQUFTcUIsU0FIWjtBQUlUVCx3QkFBUVosU0FBU1ksTUFKUjtBQUtUQyxzQkFBTWIsU0FBU2EsSUFMTjtBQU1UQywwQkFBVWQsU0FBU2MsUUFOVjtBQU9UQyx5QkFBU2YsU0FBU2UsT0FQVDtBQVFUQywwQkFBVWhCLFNBQVNnQixRQVJWO0FBU1RNLDRCQUFZdkIsU0FUSDtBQVVUd0Isc0JBQU0sb0JBQUksb0JBQUlOLEdBQUosSUFBVyxpQkFBR08sT0FBbEIsQ0FWRztBQVdUQyx1QkFBTztBQVhFLGFBQWI7QUFhQXpELGtCQUFNMEQsU0FBTixDQUFnQixZQUFoQixFQUE4QixlQUFPO0FBQ2pDLGlDQUFHdkMsR0FBSCxDQUFPLElBQVA7QUFDQSxvQkFBSVQsSUFBSWlCLElBQUosSUFBWSxDQUFoQixFQUFtQjtBQUNmM0IsMEJBQU11QixPQUFOLENBQWNDLFVBQWQsQ0FBeUJDLEtBQXpCLEdBQWlDZixJQUFJYixJQUFKLENBQVN5QixLQUExQztBQUNBLG1DQUFHNEIsY0FBSCxDQUFrQixXQUFsQixFQUErQnhDLElBQUliLElBQUosQ0FBU3lCLEtBQXhDO0FBQ0g7QUFDRFgsNkJBQWFBLFVBQVVELEdBQVYsQ0FBYjtBQUNILGFBUEQsRUFPR3lDLE1BUEgsRUFPVyxDQVBYO0FBUUg7Ozs7RUE1SDZCLGVBQUtyRCxLOztrQkFBbEJGLEkiLCJmaWxlIjoiQXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBtZDUgZnJvbSAnanMtbWQ1JztcclxuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IHV0IGZyb20gJy4uL3V0aWwvVXRpbC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGggZXh0ZW5kcyB3ZXB5Lm1peGluIHtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbWl4aW46ICfnmbvlvZUnXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG5cclxuICAgIH1cclxuICAgIGlzTG9naW4gKCkge1xyXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoeyBtYXNrOiB0cnVlLCB0aXRsZTogXCLpqozor4HkuK1cIiB9KTtcclxuICAgICAgICAgICAgX3NlbGYud3hMb2dpbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB3eExvZ2luIChfY2FsbGJhY2ssIF9yZXNldCkge1xyXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IF9hdG1Mb2dpbiA9IHV0LmdldFN0b3JhZ2VTeW5jKCdhdG1fbG9naW4nKTtcclxuICAgICAgICBsZXQgX2N1clRpbWUgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG5cclxuICAgICAgICBjZi5sb2coX2N1clRpbWUpXHJcbiAgICAgICAgY2YubG9nKF9hdG1Mb2dpbi5leHBpcmVkX2F0KVxyXG4gICAgICAgIGNmLmxvZyhfYXRtTG9naW4uZXhwaXJlZF9hdCAtIF9jdXJUaW1lKVxyXG4gICAgICAgIGNmLmxvZyh1dC5mb3JtYXRUaW1lKF9jdXJUaW1lICogMTAwMCkpXHJcbiAgICAgICAgY2YubG9nKHV0LmZvcm1hdFRpbWUoX2F0bUxvZ2luLmV4cGlyZWRfYXQgKiAxMDAwKSlcclxuICAgICAgICBjZi5sb2coXCLlvIDlp4vnmbvlvZVcIik7XHJcbiAgICAgICAgaWYgKF9hdG1Mb2dpbiAmJiBfYXRtTG9naW4udG9rZW4gJiYgX2N1clRpbWUgPCBfYXRtTG9naW4uZXhwaXJlZF9hdCAmJiBfcmVzZXQgIT0gMSkge1xyXG4gICAgICAgICAgICBjZi5sb2coXCLmnKzlnLDnmbvlvZVcIik7XHJcbiAgICAgICAgICAgIGNmLmxvZyhfYXRtTG9naW4pO1xyXG4gICAgICAgICAgICBfc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEubG9naW4gPSBfYXRtTG9naW47XHJcbiAgICAgICAgICAgIGxldCBvYmogPSB7IGNvZGU6IDAsIG1lc3NhZ2U6IFwi5bey55m75b2V5LqGXCIgfTtcclxuICAgICAgICAgICAgX2NhbGxiYWNrICYmIF9jYWxsYmFjayhvYmopXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNmLmxvZyhcIkNPREUgXCIgKyByZXMuY29kZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF91c2VySW5mbyA9IHV0LmdldFN0b3JhZ2VTeW5jKCdhdG1fdXNlckluZm8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZi5sb2coX3VzZXJJbmZvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGltZVN0YW1wID0gcGFyc2VJbnQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF91c2VySW5mbyAmJiB0aW1lU3RhbXAgLSBwYXJzZUludChfdXNlckluZm8udGltZVN0YW1wKSA8PSAzMCAqIDg2NDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZi5sb2codGltZVN0YW1wIC0gcGFyc2VJbnQoX3VzZXJJbmZvLnRpbWVTdGFtcCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBfdXNlckluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi51c2VyTG9naW4ocmVzLmNvZGUsIF9jYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZi5sb2coJ+aOiOadgycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5nZXRXeFVzZXJJbmZvKHJlcy5jb2RlLCBfY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0geyBjb2RlOiA0MDQsIG1lc3NhZ2U6IFwi55m75b2V5aSx6LSlXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NhbGxiYWNrICYmIF9jYWxsYmFjayhvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHsgY29kZTogNDA0LCBtZXNzYWdlOiBcIumTvuaOpeWksei0pVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgX2NhbGxiYWNrICYmIF9jYWxsYmFjayhvYmopXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0V3hVc2VySW5mbyAoY29kZSwgX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcclxuICAgICAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogJ3poX0NOJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYudXNlckxvZ2luKGNvZGUsIF9jYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi4kaW52b2tlKCdBdXRoQWxlcnQnLCAnYWxlcnRTaG93JywgY29kZSwgX2NhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuJGludm9rZSgnQXV0aEFsZXJ0JywgJ2FsZXJ0U2hvdycsIGNvZGUsIF9jYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi4kaW52b2tlKCdBdXRoQWxlcnQnLCAnYWxlcnRTaG93JywgY29kZSwgX2NhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB1c2VyTG9naW4gKGNvZGUsIF9jYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHVzZXJJbmZvID0gX3NlbGYuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvIHx8IHsgbmlja25hbWU6IFwiY0NcIiwgYXZhdGFyX3VybDogXCJodHRwczovL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9EWUFJT2dxODNlb3o2Q20xaWFFWkpxR09VWUtYVVJZZEFaeTVzWmxtQXdCaWFpYmE3ZGZvMnM0ckE3eXFPeEViU3A4WG5reUlKdWFlaWJhdjlXczZSalJ3OFEvMTMyXCIsIGdlbmRlcjogMSwgY2l0eTogXCJcIiwgcHJvdmluY2U6IFwiXCIsIGNvdW50cnk6IFwiQ2hpbmFcIiwgbGFuZ3VhZ2U6IFwiemhfQ05cIiB9O1xyXG4gICAgICAgIGxldCB0aW1lU3RhbXAgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG4gICAgICAgIGxldCBzdHIgPSBcImNvZGU9XCIgKyBjb2RlICsgXCImcmVxdWVzdF90cz1cIiArIHRpbWVTdGFtcDtcclxuICAgICAgICAvLyDlj6rmnInmnKzlnLDojrflj5bnmoTnlKjmiLfvvIzmiY3lrZjlnKjml7bpl7TmiLNcclxuICAgICAgICBpZiAoIXVzZXJJbmZvLnRpbWVTdGFtcCkge1xyXG4gICAgICAgICAgICBjZi5sb2coJ+mHjee9rueUqOaIt+S/oeaBrycpXHJcbiAgICAgICAgICAgIHVzZXJJbmZvLnRpbWVTdGFtcCA9IHRpbWVTdGFtcFxyXG4gICAgICAgICAgICB1dC5zZXRTdG9yYWdlU3luYygnYXRtX3VzZXJJbmZvJywgdXNlckluZm8pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBjb2RlOiBjb2RlLFxyXG4gICAgICAgICAgICBuaWNrbmFtZTogdXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgIGF2YXRhcl91cmw6IHVzZXJJbmZvLmF2YXRhclVybCxcclxuICAgICAgICAgICAgZ2VuZGVyOiB1c2VySW5mby5nZW5kZXIsXHJcbiAgICAgICAgICAgIGNpdHk6IHVzZXJJbmZvLmNpdHksXHJcbiAgICAgICAgICAgIHByb3ZpbmNlOiB1c2VySW5mby5wcm92aW5jZSxcclxuICAgICAgICAgICAgY291bnRyeTogdXNlckluZm8uY291bnRyeSxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHVzZXJJbmZvLmxhbmd1YWdlLFxyXG4gICAgICAgICAgICByZXF1ZXN0X3RzOiB0aW1lU3RhbXAsXHJcbiAgICAgICAgICAgIHNpZ246IG1kNShtZDUoc3RyKSArIGNmLnNpZ25LZXkpLFxyXG4gICAgICAgICAgICBkZWJ1ZzogMVxyXG4gICAgICAgIH1cclxuICAgICAgICBfc2VsZi53eFJlcXVlc3QoXCJhdXRoL2xvZ2luXCIsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNmLmxvZyhcIueZu+W9lVwiKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgIF9zZWxmLiRwYXJlbnQuZ2xvYmFsRGF0YS5sb2dpbiA9IHJlcy5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgdXQuc2V0U3RvcmFnZVN5bmMoJ2F0bV9sb2dpbicsIHJlcy5kYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfY2FsbGJhY2sgJiYgX2NhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgfSwgcGFyYW1zLCAxKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==