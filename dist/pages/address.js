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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '收货信息'
        }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
            isEdit: 0,
            isSel: 0
        }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
            AuthAlert: _AuthAlert2.default
        }, _this.methods = {
            clickDefault: function clickDefault(_index) {
                this.list = this.list.map(function (_el, _idx) {
                    return _extends({}, _el, {
                        is_default: _index == _idx ? 1 : 0
                    });
                });
                this.wxRequest('address/setDefault', function (res) {
                    if (res.code == 0) {} else {
                        _Tips2.default.toast(res.msg);
                    }
                }, { id: this.list[_index].id }, 1);
            },
            clickDel: function clickDel(_index) {
                var _this2 = this;

                var _id = this.list[_index].id;
                _Tips2.default.confirm('是否删除该地址', function (res) {
                    _this2.list.splice(_index, 1);
                    _this2.$apply();
                    _this2.wxRequest('address/del', function (res) {
                        if (res.code == 0) {}
                    }, { id: _id }, 1);
                });
            },
            clickDetail: function clickDetail(_index) {
                _Util2.default.setStorageSync('addressadd', this.list[_index]);
                if (this.isSel) {
                    _Util2.default.goPageBack(1);
                } else {
                    _Util2.default.goPage('addressadd', { isEdit: 0 });
                }
            },
            clickEdit: function clickEdit(_index) {
                _Util2.default.setStorageSync('addressadd', this.list[_index]);
                _Util2.default.goPage('addressadd', { isEdit: 2 });
            },
            clickConfirm: function clickConfirm(_index) {
                _Util2.default.setStorageSync('addressadd', '');
                _Util2.default.goPage('addressadd', { isEdit: 1 });
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
        key: 'onLoad',
        value: function onLoad(_opt) {
            this.isEdit = _opt.isEdit || 0;
            this.isSel = _opt.isSel || 0;
        }
    }, {
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this3 = this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.wxRequests(1, '/address/getList', function (res) {
                                    _config2.default.log(res);
                                    if (res.code == 0) {
                                        _this3.list = res.data.entities;
                                        _this3.$apply();
                                    } else {
                                        _Tips2.default.toast(res.msg);
                                    }
                                }, {}, 1, 1);

                            case 1:
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiZGF0YSIsImlzRWRpdCIsImlzU2VsIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQXV0aEFsZXJ0IiwibWV0aG9kcyIsImNsaWNrRGVmYXVsdCIsIl9pbmRleCIsImxpc3QiLCJtYXAiLCJfZWwiLCJfaWR4IiwiaXNfZGVmYXVsdCIsInd4UmVxdWVzdCIsInJlcyIsImNvZGUiLCJ0b2FzdCIsIm1zZyIsImlkIiwiY2xpY2tEZWwiLCJfaWQiLCJjb25maXJtIiwic3BsaWNlIiwiJGFwcGx5IiwiY2xpY2tEZXRhaWwiLCJzZXRTdG9yYWdlU3luYyIsImdvUGFnZUJhY2siLCJnb1BhZ2UiLCJjbGlja0VkaXQiLCJjbGlja0NvbmZpcm0iLCJhdXRoRm4iLCJfX3JlcyIsIl9fY29kZSIsIl9fY2FsbGJhY2siLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiZGV0YWlsIiwidXNlckxvZ2luIiwiJGludm9rZSIsIl9vcHQiLCJ3eFJlcXVlc3RzIiwibG9nIiwiZW50aXRpZXMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsTSxHQUFTLGlDLFFBQ1RDLEksR0FBTztBQUNIQyxvQkFBUSxDQURMO0FBRUhDLG1CQUFPO0FBRkosUyxRQUlSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsY0FBYSxFQUFkLEVBQWIsRSxRQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsUUFBaEIsRUFBYixFLFFBQ1RDLFUsR0FBYTtB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RUFHSSxlQUFPO0FBQ0gscURBQUdDLEdBQUgsQ0FBTzVCLEdBQVA7QUFDQSx3Q0FBSUEsSUFBSUMsSUFBSixJQUFZLENBQWhCLEVBQW1CO0FBQ2YsK0NBQUtQLElBQUwsR0FBWU0sSUFBSWpCLElBQUosQ0FBUzhDLFFBQXJCO0FBQ0EsK0NBQUtwQixNQUFMO0FBQ0gscUNBSEQsTUFJSztBQUNELHVEQUFLUCxLQUFMLENBQVdGLElBQUlHLEdBQWY7QUFDSDtBQUNKLGlDQVpMLEVBYUksRUFiSixFQWNJLENBZEosRUFjTyxDQWRQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaEYyQixlQUFLMkIsSTs7a0JBQW5CbkQsSyIsImZpbGUiOiJhZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY2YgZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IGh0dHBzIGZyb20gJy4uL21peGlucy9IdHRwcyc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcclxuaW1wb3J0IHV0IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcbmltcG9ydCBUaXBzIGZyb20gJy4uL3V0aWwvVGlwcyc7XHJcbmltcG9ydCBBdXRoQWxlcnQgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRoQWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKfkv6Hmga8nXHJcbiAgICB9O1xyXG4gICAgbWl4aW5zID0gW2h0dHBzLCBhdXRoXTtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaXNFZGl0OiAwLFxyXG4gICAgICAgIGlzU2VsOiAwXHJcbiAgICB9O1xyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkF1dGhBbGVydFwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImF1dGhGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEF1dGhBbGVydDogQXV0aEFsZXJ0XHJcbiAgICB9O1xyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjbGlja0RlZmF1bHQgKF9pbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QubWFwKChfZWwsIF9pZHgpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5fZWwsXHJcbiAgICAgICAgICAgICAgICBpc19kZWZhdWx0OiBfaW5kZXggPT0gX2lkeCA/IDEgOiAwXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy53eFJlcXVlc3QoXHJcbiAgICAgICAgICAgICAgICAnYWRkcmVzcy9zZXREZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpcHMudG9hc3QocmVzLm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IHRoaXMubGlzdFtfaW5kZXhdLmlkIH0sXHJcbiAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGlja0RlbCAoX2luZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBfaWQgPSB0aGlzLmxpc3RbX2luZGV4XS5pZDtcclxuICAgICAgICAgICAgVGlwcy5jb25maXJtKCfmmK/lkKbliKDpmaTor6XlnLDlnYAnLCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShfaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud3hSZXF1ZXN0KFxyXG4gICAgICAgICAgICAgICAgICAgICdhZGRyZXNzL2RlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogX2lkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGlja0RldGFpbCAoX2luZGV4KSB7XHJcbiAgICAgICAgICAgIHV0LnNldFN0b3JhZ2VTeW5jKCdhZGRyZXNzYWRkJywgdGhpcy5saXN0W19pbmRleF0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NlbCkge1xyXG4gICAgICAgICAgICAgICAgdXQuZ29QYWdlQmFjaygxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0LmdvUGFnZSgnYWRkcmVzc2FkZCcsIHsgaXNFZGl0OiAwIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGlja0VkaXQgKF9pbmRleCkge1xyXG4gICAgICAgICAgICB1dC5zZXRTdG9yYWdlU3luYygnYWRkcmVzc2FkZCcsIHRoaXMubGlzdFtfaW5kZXhdKTtcclxuICAgICAgICAgICAgdXQuZ29QYWdlKCdhZGRyZXNzYWRkJywgeyBpc0VkaXQ6IDIgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGlja0NvbmZpcm0gKF9pbmRleCkge1xyXG4gICAgICAgICAgICB1dC5zZXRTdG9yYWdlU3luYygnYWRkcmVzc2FkZCcsICcnKTtcclxuICAgICAgICAgICAgdXQuZ29QYWdlKCdhZGRyZXNzYWRkJywgeyBpc0VkaXQ6IDEgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRoRm4gKF9fcmVzLCBfX2NvZGUsIF9fY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBfX3Jlcy5kZXRhaWwudXNlckluZm87XHJcbiAgICAgICAgICAgIHRoaXMudXNlckxvZ2luKF9fY29kZSwgX19jYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGF1dGhBbGVydFNob3cgKF9fY29kZSwgX19jYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgnQXV0aEFsZXJ0JywgJ2FsZXJ0U2hvdycsIF9fY29kZSwgX19jYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBvbkxvYWQgKF9vcHQpIHtcclxuICAgICAgICB0aGlzLmlzRWRpdCA9IF9vcHQuaXNFZGl0IHx8IDA7XHJcbiAgICAgICAgdGhpcy5pc1NlbCA9IF9vcHQuaXNTZWwgfHwgMDtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgdGhpcy53eFJlcXVlc3RzKFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAnL2FkZHJlc3MvZ2V0TGlzdCcsXHJcbiAgICAgICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjZi5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEuZW50aXRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFRpcHMudG9hc3QocmVzLm1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICAxLCAxXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iXX0=