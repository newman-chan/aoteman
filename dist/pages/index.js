'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _AuthAlert = require('./../components/AuthAlert.js');

var _AuthAlert2 = _interopRequireDefault(_AuthAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
            imghost: _config2.default.imghost,
            unreadNum: 0,
            cardId: '',
            isTop: false,
            inited: false
        }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
            AuthAlert: _AuthAlert2.default
        }, _this.methods = {
            clickLqjl: function clickLqjl(_bookId, _prizeId) {
                _Util2.default.goPage('reward', { bookId: _bookId, prizeId: _prizeId });
            },
            clickMsg: function clickMsg() {
                _Util2.default.goPage('system');
            },
            clickUser: function clickUser() {
                _Util2.default.goPage('user');
            },
            clickBook: function clickBook(_id) {
                _Util2.default.goPage('cardlist', { bookId: _id });
            },
            bgLoadEnd: function bgLoadEnd() {
                this.inited = true;
            },
            authFn: function authFn(__res, __code, __callback) {
                this.$parent.globalData.userInfo = __res.detail.userInfo;
                this.userLogin(__code, __callback);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'authAlertShow',
        value: function authAlertShow(__code, __callback) {
            this.$invoke('AuthAlert', 'alertShow', __code, __callback);
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage(options) {}
    }, {
        key: 'onLoad',
        value: function onLoad(opt) {
            this.cardId = opt.cardId || '';
            if (this.cardId) {
                this.isTop = true;
            }
        }
    }, {
        key: 'getList',
        value: function getList(_init) {
            var _this2 = this;

            this.wxRequests(_init, '/cardbook/getList', function (res) {
                if (res.code == 0) {
                    var _list = [];
                    if (res.data.top.hasOwnProperty('id')) {
                        _list.push(res.data.top);
                    }
                    _list = _list.concat(res.data.entities).map(function (el) {
                        return _extends({}, el, {
                            img_border: _config2.default.imghost + el.img_border,
                            img_cover: _config2.default.imghost + el.img_cover
                        });
                    });
                    _this2.list = _this2.list.concat(_list);
                    _this2.$apply();
                    if (_this2.cardId) {
                        setTimeout(function () {
                            _this2.isTop = false;
                            _this2.$apply();
                        }, 1000);
                    }
                } else {
                    _Tips2.default.toast(res.msg);
                }
            }, {
                top: this.cardId
            }, 1, 1);
        }
    }, {
        key: 'bindscrolltolower',
        value: function bindscrolltolower() {
            if (this.inited) {
                _config2.default.log("底部刷新");
                this.getList(0);
            }
        }
    }, {
        key: 'onReady',
        value: function onReady() {
            _config2.default.log("首页");
        }
    }, {
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this3 = this;

                var _login;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _config2.default.log("首页请求");
                                _context.next = 3;
                                return this.isLogin();

                            case 3:
                                _login = _context.sent;

                                if (_login.code == 0) {
                                    this.getList(1);
                                    this.wxRequest('msg/unread', function (res) {
                                        if (res.code == 0) {
                                            _this3.unreadNum = res.data;
                                            _this3.$apply();
                                        }
                                    }, {}, 1);
                                } else {
                                    _Tips2.default.toast(_login.msg);
                                }

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onShow() {
                return _ref2.apply(this, arguments);
            }

            return onShow;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibWl4aW5zIiwiZGF0YSIsImltZ2hvc3QiLCJ1bnJlYWROdW0iLCJjYXJkSWQiLCJpc1RvcCIsImluaXRlZCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkF1dGhBbGVydCIsIm1ldGhvZHMiLCJjbGlja0xxamwiLCJfYm9va0lkIiwiX3ByaXplSWQiLCJnb1BhZ2UiLCJib29rSWQiLCJwcml6ZUlkIiwiY2xpY2tNc2ciLCJjbGlja1VzZXIiLCJjbGlja0Jvb2siLCJfaWQiLCJiZ0xvYWRFbmQiLCJhdXRoRm4iLCJfX3JlcyIsIl9fY29kZSIsIl9fY2FsbGJhY2siLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiZGV0YWlsIiwidXNlckxvZ2luIiwiJGludm9rZSIsIm9wdGlvbnMiLCJvcHQiLCJfaW5pdCIsInd4UmVxdWVzdHMiLCJyZXMiLCJjb2RlIiwiX2xpc3QiLCJ0b3AiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJjb25jYXQiLCJlbnRpdGllcyIsIm1hcCIsImVsIiwiaW1nX2JvcmRlciIsImltZ19jb3ZlciIsImxpc3QiLCIkYXBwbHkiLCJzZXRUaW1lb3V0IiwidG9hc3QiLCJtc2ciLCJsb2ciLCJnZXRMaXN0IiwiaXNMb2dpbiIsIl9sb2dpbiIsInd4UmVxdWVzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUyxpQyxRQUNUQyxJLEdBQU87QUFDSEMscUJBQVMsaUJBQUdBLE9BRFQ7QUFFSEMsdUJBQVcsQ0FGUjtBQUdIQyxvQkFBUSxFQUhMO0FBSUhDLG1CQUFPLEtBSko7QUFLSEMsb0JBQVE7QUFMTCxTLFFBT1JDLE8sR0FBVSxFLFFBQ2JDLE0s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TyxNQUFQO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYSxDQUFiO0FBQ0g7QUFDSjs7O2tDQUNVO0FBQ1AsNkJBQUdELEdBQUgsQ0FBTyxJQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUFFRyxpREFBR0EsR0FBSCxDQUFPLE1BQVA7O3VDQUNtQixLQUFLRSxPQUFMLEU7OztBQUFmQyxzQzs7QUFDSixvQ0FBSUEsT0FBT25CLElBQVAsSUFBZSxDQUFuQixFQUFzQjtBQUNsQix5Q0FBS2lCLE9BQUwsQ0FBYSxDQUFiO0FBQ0EseUNBQUtHLFNBQUwsQ0FDSSxZQURKLEVBRUksZUFBTztBQUNILDRDQUFJckIsSUFBSUMsSUFBSixJQUFZLENBQWhCLEVBQW1CO0FBQ2YsbURBQUtwQyxTQUFMLEdBQWlCbUMsSUFBSXJDLElBQXJCO0FBQ0EsbURBQUtrRCxNQUFMO0FBQ0g7QUFDSixxQ0FQTCxFQVFJLEVBUkosRUFTSSxDQVRKO0FBV0gsaUNBYkQsTUFhTztBQUNILG1EQUFLRSxLQUFMLENBQVdLLE9BQU9KLEdBQWxCO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1RzBCLGVBQUtNLEk7O2tCQUFuQjdELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgaHR0cHMgZnJvbSAnLi4vbWl4aW5zL0h0dHBzJztcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcbmltcG9ydCB1dCBmcm9tICcuLi91dGlsL1V0aWwnO1xuaW1wb3J0IFRpcHMgZnJvbSAnLi4vdXRpbC9UaXBzJztcbmltcG9ydCBBdXRoQWxlcnQgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRoQWxlcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgbWl4aW5zID0gW2h0dHBzLCBhdXRoXTtcbiAgICBkYXRhID0ge1xuICAgICAgICBpbWdob3N0OiBjZi5pbWdob3N0LFxuICAgICAgICB1bnJlYWROdW06IDAsXG4gICAgICAgIGNhcmRJZDogJycsXG4gICAgICAgIGlzVG9wOiBmYWxzZSxcbiAgICAgICAgaW5pdGVkOiBmYWxzZVxuICAgIH07XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkF1dGhBbGVydFwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImF1dGhGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBBdXRoQWxlcnQ6IEF1dGhBbGVydFxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY2xpY2tMcWpsIChfYm9va0lkLCBfcHJpemVJZCkge1xuICAgICAgICAgICAgdXQuZ29QYWdlKCdyZXdhcmQnLCB7IGJvb2tJZDogX2Jvb2tJZCwgcHJpemVJZDogX3ByaXplSWQgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrTXNnICgpIHtcbiAgICAgICAgICAgIHV0LmdvUGFnZSgnc3lzdGVtJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrVXNlciAoKSB7XG4gICAgICAgICAgICB1dC5nb1BhZ2UoJ3VzZXInKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2tCb29rIChfaWQpIHtcbiAgICAgICAgICAgIHV0LmdvUGFnZSgnY2FyZGxpc3QnLCB7IGJvb2tJZDogX2lkIH0pO1xuICAgICAgICB9LFxuICAgICAgICBiZ0xvYWRFbmQgKCkge1xuICAgICAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBhdXRoRm4gKF9fcmVzLCBfX2NvZGUsIF9fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gX19yZXMuZGV0YWlsLnVzZXJJbmZvO1xuICAgICAgICAgICAgdGhpcy51c2VyTG9naW4oX19jb2RlLCBfX2NhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYXV0aEFsZXJ0U2hvdyAoX19jb2RlLCBfX2NhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuJGludm9rZSgnQXV0aEFsZXJ0JywgJ2FsZXJ0U2hvdycsIF9fY29kZSwgX19jYWxsYmFjayk7XG4gICAgfVxuICAgIG9uU2hhcmVBcHBNZXNzYWdlIChvcHRpb25zKSB7IH1cbiAgICBvbkxvYWQgKG9wdCkge1xuICAgICAgICB0aGlzLmNhcmRJZCA9IG9wdC5jYXJkSWQgfHwgJyc7XG4gICAgICAgIGlmICh0aGlzLmNhcmRJZCkge1xuICAgICAgICAgICAgdGhpcy5pc1RvcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0TGlzdCAoX2luaXQpIHtcbiAgICAgICAgdGhpcy53eFJlcXVlc3RzKFxuICAgICAgICAgICAgX2luaXQsXG4gICAgICAgICAgICAnL2NhcmRib29rL2dldExpc3QnLFxuICAgICAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgX2xpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnRvcC5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2xpc3QucHVzaChyZXMuZGF0YS50b3ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9saXN0ID0gX2xpc3QuY29uY2F0KHJlcy5kYXRhLmVudGl0aWVzKS5tYXAoZWwgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nX2JvcmRlcjogY2YuaW1naG9zdCArIGVsLmltZ19ib3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWdfY292ZXI6IGNmLmltZ2hvc3QgKyBlbC5pbWdfY292ZXJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuY29uY2F0KF9saXN0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FyZElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVG9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBUaXBzLnRvYXN0KHJlcy5tc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLmNhcmRJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgfVxuICAgIGJpbmRzY3JvbGx0b2xvd2VyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICBjZi5sb2coXCLlupXpg6jliLfmlrBcIilcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdCgwKVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uUmVhZHkgKCkge1xuICAgICAgICBjZi5sb2coXCLpppbpobVcIilcbiAgICB9XG4gICAgYXN5bmMgb25TaG93ICgpIHtcbiAgICAgICAgY2YubG9nKFwi6aaW6aG16K+35rGCXCIpXG4gICAgICAgIGxldCBfbG9naW4gPSBhd2FpdCB0aGlzLmlzTG9naW4oKTtcbiAgICAgICAgaWYgKF9sb2dpbi5jb2RlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdCgxKTtcbiAgICAgICAgICAgIHRoaXMud3hSZXF1ZXN0KFxuICAgICAgICAgICAgICAgICdtc2cvdW5yZWFkJyxcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnJlYWROdW0gPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUaXBzLnRvYXN0KF9sb2dpbi5tc2cpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19