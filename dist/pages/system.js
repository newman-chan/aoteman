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

var _AuthAlert = require('./../components/AuthAlert.js');

var _AuthAlert2 = _interopRequireDefault(_AuthAlert);

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
            navigationBarTitleText: '系统信息'
        }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
            inited: false
        }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
            AuthAlert: _AuthAlert2.default
        }, _this.methods = {
            clickMsg: function clickMsg(_index) {
                _Util2.default.goPage('systemdetail', { id: this.list[_index].id });
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
        key: 'getList',
        value: function getList(_init) {
            var _this2 = this;

            this.wxRequests(_init, '/msg/getList', function (res) {
                _config2.default.log(res);
                if (res.code == 0) {
                    _this2.inited = true;
                    _this2.list = res.data.entities;
                    _this2.$apply();
                } else {
                    _Tips2.default.toast(res.msg);
                }
            }, {}, 1, 1);
        }
    }, {
        key: 'onLoad',
        value: function onLoad(opt) {}
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
        value: function onReady() {}
    }, {
        key: 'onShow',
        value: function onShow() {
            this.getList(30);
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/system'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJkYXRhIiwiaW5pdGVkIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQXV0aEFsZXJ0IiwibWV0aG9kcyIsImNsaWNrTXNnIiwiX2luZGV4IiwiZ29QYWdlIiwiaWQiLCJsaXN0IiwiYXV0aEZuIiwiX19yZXMiLCJfX2NvZGUiLCJfX2NhbGxiYWNrIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImRldGFpbCIsInVzZXJMb2dpbiIsIiRpbnZva2UiLCJfaW5pdCIsInd4UmVxdWVzdHMiLCJsb2ciLCJyZXMiLCJjb2RlIiwiZW50aXRpZXMiLCIkYXBwbHkiLCJ0b2FzdCIsIm1zZyIsIm9wdCIsImdldExpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxNLEdBQVMsaUMsUUFDVEMsSSxHQUFPO0FBQ0hDLG9CQUFRO0FBREwsUyxRQUdSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsY0FBYSxFQUFkLEVBQWIsRSxRQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsUUFBaEIsRUFBYixFLFFBQ1RDLFUsR0FBYTtBQUNOQztBQURNLFMsUUFHVkMsTyxHQUFVO0FBQ05DLG9CQURNLG9CQUNJQyxNQURKLEVBQ1k7QUFDZCwrQkFBR0MsTUFBSCxDQUFVLGNBQVYsRUFBMEIsRUFBRUMsSUFBSSxLQUFLQyxJQUFMLENBQVVILE1BQVYsRUFBa0JFLEVBQXhCLEVBQTFCO0FBQ0gsYUFISztBQUlORSxrQkFKTSxrQkFJRUMsS0FKRixFQUlTQyxNQUpULEVBSWlCQyxVQUpqQixFQUk2QjtBQUMvQixxQkFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QixHQUFtQ0wsTUFBTU0sTUFBTixDQUFhRCxRQUFoRDtBQUNBLHFCQUFLRSxTQUFMLENBQWVOLE1BQWYsRUFBdUJDLFVBQXZCO0FBQ0g7QUFQSyxTOzs7OztzQ0FTS0QsTSxFQUFRQyxVLEVBQVk7QUFDL0IsaUJBQUtNLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLFdBQTFCLEVBQXVDUCxNQUF2QyxFQUErQ0MsVUFBL0M7QUFDSDs7O2dDQUNRTyxLLEVBQU87QUFBQTs7QUFDWixpQkFBS0MsVUFBTCxDQUNJRCxLQURKLEVBRUksY0FGSixFQUdJLGVBQU87QUFDSCxpQ0FBR0UsR0FBSCxDQUFPQyxHQUFQO0FBQ0Esb0JBQUlBLElBQUlDLElBQUosSUFBWSxDQUFoQixFQUFtQjtBQUNmLDJCQUFLMUIsTUFBTCxHQUFjLElBQWQ7QUFDQSwyQkFBS1csSUFBTCxHQUFZYyxJQUFJMUIsSUFBSixDQUFTNEIsUUFBckI7QUFDQSwyQkFBS0MsTUFBTDtBQUNILGlCQUpELE1BS0s7QUFDRCxtQ0FBS0MsS0FBTCxDQUFXSixJQUFJSyxHQUFmO0FBQ0g7QUFDSixhQWJMLEVBY0ksRUFkSixFQWVJLENBZkosRUFnQkksQ0FoQko7QUFrQkg7OzsrQkFDT0MsRyxFQUFLLENBQUc7Ozs0Q0FDSztBQUNqQixnQkFBSSxLQUFLL0IsTUFBVCxFQUFpQjtBQUNiLGlDQUFHd0IsR0FBSCxDQUFPLE1BQVA7QUFDQSxxQkFBS1EsT0FBTCxDQUFhLENBQWI7QUFDSDtBQUNKOzs7a0NBQ1UsQ0FFVjs7O2lDQUNTO0FBQ04saUJBQUtBLE9BQUwsQ0FBYSxFQUFiO0FBQ0g7Ozs7RUExRDhCLGVBQUtDLEk7O2tCQUFuQnRDLEsiLCJmaWxlIjoic3lzdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY2YgZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IGh0dHBzIGZyb20gJy4uL21peGlucy9IdHRwcyc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcclxuaW1wb3J0IHV0IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcbmltcG9ydCBUaXBzIGZyb20gJy4uL3V0aWwvVGlwcyc7XHJcbmltcG9ydCBBdXRoQWxlcnQgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRoQWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfns7vnu5/kv6Hmga8nXHJcbiAgICB9O1xyXG4gICAgbWl4aW5zID0gW2h0dHBzLCBhdXRoXTtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaW5pdGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wiQXV0aEFsZXJ0XCI6e1widi1vbjpjaGlsZEZuXCI6XCJhdXRoRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBBdXRoQWxlcnQ6IEF1dGhBbGVydFxyXG4gICAgfTtcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgY2xpY2tNc2cgKF9pbmRleCkge1xyXG4gICAgICAgICAgICB1dC5nb1BhZ2UoJ3N5c3RlbWRldGFpbCcsIHsgaWQ6IHRoaXMubGlzdFtfaW5kZXhdLmlkIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0aEZuIChfX3JlcywgX19jb2RlLCBfX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gX19yZXMuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMb2dpbihfX2NvZGUsIF9fY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhdXRoQWxlcnRTaG93IChfX2NvZGUsIF9fY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ0F1dGhBbGVydCcsICdhbGVydFNob3cnLCBfX2NvZGUsIF9fY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgZ2V0TGlzdCAoX2luaXQpIHtcclxuICAgICAgICB0aGlzLnd4UmVxdWVzdHMoXHJcbiAgICAgICAgICAgIF9pbml0LFxyXG4gICAgICAgICAgICAnL21zZy9nZXRMaXN0JyxcclxuICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNmLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEuZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpcHMudG9hc3QocmVzLm1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIG9uTG9hZCAob3B0KSB7IH1cclxuICAgIGJpbmRzY3JvbGx0b2xvd2VyICgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbml0ZWQpIHtcclxuICAgICAgICAgICAgY2YubG9nKFwi5bqV6YOo5Yi35pawXCIpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdCgwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUmVhZHkgKCkge1xyXG5cclxuICAgIH1cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0KDMwKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==