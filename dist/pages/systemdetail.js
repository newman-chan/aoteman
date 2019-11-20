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

var _Https = require('./../mixins/Https.js');

var _Https2 = _interopRequireDefault(_Https);

var _Auth = require('./../mixins/Auth.js');

var _Auth2 = _interopRequireDefault(_Auth);

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
            navigationBarTitleText: ''
        }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
            showBtn: false,
            msgId: '',
            entity: {}
        }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
            AuthAlert: _AuthAlert2.default
        }, _this.methods = {
            clickLook: function clickLook() {
                //1.扫码获得卡牌 2.领取卡册奖励 3.卡册奖励寄出 4.提醒收取卡册奖励 5.卡册上新
                switch (this.entity.scene) {
                    case 1:
                        var _q = this.entity.scene_value;
                        var _qAr = _q.split('?');
                        var _obj = {};

                        var _params = _qAr.length > 1 ? _qAr[1].split('&') : _qAr[0].split('&');
                        for (var i = 0; i < _params.length; i++) {
                            var _fields = _params[i].split('=');
                            if (_fields.length > 1) {
                                _obj[_fields[0]] = _fields[1];
                            }
                        }
                        _config2.default.log(_obj);
                        _Util2.default.goPage('cardlist', _obj);
                        break;
                    case 4:
                        _Util2.default.goPage('index');
                        break;
                    default:
                        break;
                }
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
            this.msgId = _opt.id;
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this2 = this;

            this.wxRequest('msg/detail', function (res) {
                _config2.default.log(res);
                if (res.code == 0) {
                    _this2.entity = res.data.entity;
                    wx.setNavigationBarTitle({
                        title: _this2.entity.title
                    });
                    _this2.showBtn = _this2.entity.scene == 1 || _this2.entity.scene == 4 ? true : false;
                    _this2.entity.created_at = _Util2.default.formatTime(_this2.entity.created_at ? _this2.entity.created_at * 1000 : 0, '/', 1);
                    _this2.$apply();
                } else {
                    _Tips2.default.toast(res.msg);
                }
            }, { id: this.msgId }, 1, 1);
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/systemdetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbWRldGFpbC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJkYXRhIiwic2hvd0J0biIsIm1zZ0lkIiwiZW50aXR5IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQXV0aEFsZXJ0IiwibWV0aG9kcyIsImNsaWNrTG9vayIsInNjZW5lIiwiX3EiLCJzY2VuZV92YWx1ZSIsIl9xQXIiLCJzcGxpdCIsIl9vYmoiLCJfcGFyYW1zIiwibGVuZ3RoIiwiaSIsIl9maWVsZHMiLCJsb2ciLCJnb1BhZ2UiLCJhdXRoRm4iLCJfX3JlcyIsIl9fY29kZSIsIl9fY2FsbGJhY2siLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiZGV0YWlsIiwidXNlckxvZ2luIiwiJGludm9rZSIsIl9vcHQiLCJpZCIsInd4UmVxdWVzdCIsInJlcyIsImNvZGUiLCJ3eCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwiY3JlYXRlZF9hdCIsImZvcm1hdFRpbWUiLCIkYXBwbHkiLCJ0b2FzdCIsIm1zZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLE0sR0FBUyxpQyxRQUNUQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxtQkFBTyxFQUZKO0FBR0hDLG9CQUFRO0FBSEwsUyxRQUtSQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsY0FBYSxFQUFkLEVBQWIsRSxRQUNUQyxPLEdBQVUsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsUUFBaEIsRUFBYixFLFFBQ1RDLFUsR0FBYTtBQUNOQztBQURNLFMsUUFHVkMsTyxHQUFVO0FBQ05DLHFCQURNLHVCQUNPO0FBQ1Q7QUFDQSx3QkFBUSxLQUFLUCxNQUFMLENBQVlRLEtBQXBCO0FBQ0kseUJBQUssQ0FBTDtBQUNJLDRCQUFJQyxLQUFLLEtBQUtULE1BQUwsQ0FBWVUsV0FBckI7QUFDQSw0QkFBSUMsT0FBT0YsR0FBR0csS0FBSCxDQUFTLEdBQVQsQ0FBWDtBQUNBLDRCQUFJQyxPQUFPLEVBQVg7O0FBRUEsNEJBQUlDLFVBQ0FILEtBQUtJLE1BQUwsR0FBYyxDQUFkLEdBQWtCSixLQUFLLENBQUwsRUFBUUMsS0FBUixDQUFjLEdBQWQsQ0FBbEIsR0FBdUNELEtBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsR0FBZCxDQUQzQztBQUVBLDZCQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsUUFBUUMsTUFBNUIsRUFBb0NDLEdBQXBDLEVBQXlDO0FBQ3JDLGdDQUFJQyxVQUFVSCxRQUFRRSxDQUFSLEVBQVdKLEtBQVgsQ0FBaUIsR0FBakIsQ0FBZDtBQUNBLGdDQUFJSyxRQUFRRixNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3BCRixxQ0FBS0ksUUFBUSxDQUFSLENBQUwsSUFBbUJBLFFBQVEsQ0FBUixDQUFuQjtBQUNIO0FBQ0o7QUFDRCx5Q0FBR0MsR0FBSCxDQUFPTCxJQUFQO0FBQ0EsdUNBQUdNLE1BQUgsQ0FBVSxVQUFWLEVBQXNCTixJQUF0QjtBQUNBO0FBQ0oseUJBQUssQ0FBTDtBQUNJLHVDQUFHTSxNQUFILENBQVUsT0FBVjtBQUNBO0FBQ0o7QUFDSTtBQXJCUjtBQXVCSCxhQTFCSztBQTJCTkMsa0JBM0JNLGtCQTJCRUMsS0EzQkYsRUEyQlNDLE1BM0JULEVBMkJpQkMsVUEzQmpCLEVBMkI2QjtBQUMvQixxQkFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxRQUF4QixHQUFtQ0wsTUFBTU0sTUFBTixDQUFhRCxRQUFoRDtBQUNBLHFCQUFLRSxTQUFMLENBQWVOLE1BQWYsRUFBdUJDLFVBQXZCO0FBQ0g7QUE5QkssUzs7Ozs7c0NBZ0NLRCxNLEVBQVFDLFUsRUFBWTtBQUMvQixpQkFBS00sT0FBTCxDQUFhLFdBQWIsRUFBMEIsV0FBMUIsRUFBdUNQLE1BQXZDLEVBQStDQyxVQUEvQztBQUNIOzs7K0JBQ09PLEksRUFBTTtBQUNWLGlCQUFLL0IsS0FBTCxHQUFhK0IsS0FBS0MsRUFBbEI7QUFDSDs7O2lDQUNTO0FBQUE7O0FBQ04saUJBQUtDLFNBQUwsQ0FDSSxZQURKLEVBRUksZUFBTztBQUNILGlDQUFHZCxHQUFILENBQU9lLEdBQVA7QUFDQSxvQkFBSUEsSUFBSUMsSUFBSixJQUFZLENBQWhCLEVBQW1CO0FBQ2YsMkJBQUtsQyxNQUFMLEdBQWNpQyxJQUFJcEMsSUFBSixDQUFTRyxNQUF2QjtBQUNBbUMsdUJBQUdDLHFCQUFILENBQXlCO0FBQ3JCQywrQkFBTyxPQUFLckMsTUFBTCxDQUFZcUM7QUFERSxxQkFBekI7QUFHQSwyQkFBS3ZDLE9BQUwsR0FDSSxPQUFLRSxNQUFMLENBQVlRLEtBQVosSUFBcUIsQ0FBckIsSUFBMEIsT0FBS1IsTUFBTCxDQUFZUSxLQUFaLElBQXFCLENBQS9DLEdBQW1ELElBQW5ELEdBQTBELEtBRDlEO0FBRUEsMkJBQUtSLE1BQUwsQ0FBWXNDLFVBQVosR0FBeUIsZUFBR0MsVUFBSCxDQUNyQixPQUFLdkMsTUFBTCxDQUFZc0MsVUFBWixHQUF5QixPQUFLdEMsTUFBTCxDQUFZc0MsVUFBWixHQUF5QixJQUFsRCxHQUF5RCxDQURwQyxFQUVyQixHQUZxQixFQUdyQixDQUhxQixDQUF6QjtBQUtBLDJCQUFLRSxNQUFMO0FBQ0gsaUJBYkQsTUFjSztBQUNELG1DQUFLQyxLQUFMLENBQVdSLElBQUlTLEdBQWY7QUFDSDtBQUNKLGFBckJMLEVBc0JJLEVBQUVYLElBQUksS0FBS2hDLEtBQVgsRUF0QkosRUF1QkksQ0F2QkosRUF3QkksQ0F4Qko7QUEwQkg7Ozs7RUFqRjhCLGVBQUs0QyxJOztrQkFBbkJsRCxLIiwiZmlsZSI6InN5c3RlbWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCB1dCBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSAnLi4vbWl4aW5zL0h0dHBzJztcclxuaW1wb3J0IGF1dGggZnJvbSAnLi4vbWl4aW5zL0F1dGgnO1xyXG5pbXBvcnQgVGlwcyBmcm9tICcuLi91dGlsL1RpcHMnO1xyXG5pbXBvcnQgQXV0aEFsZXJ0IGZyb20gJy4uL2NvbXBvbmVudHMvQXV0aEFsZXJ0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnJ1xyXG4gICAgfTtcclxuICAgIG1peGlucyA9IFtodHRwcywgYXV0aF07XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHNob3dCdG46IGZhbHNlLFxyXG4gICAgICAgIG1zZ0lkOiAnJyxcclxuICAgICAgICBlbnRpdHk6IHt9XHJcbiAgICB9O1xyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkF1dGhBbGVydFwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImF1dGhGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEF1dGhBbGVydDogQXV0aEFsZXJ0XHJcbiAgICB9O1xyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjbGlja0xvb2sgKCkge1xyXG4gICAgICAgICAgICAvLzEu5omr56CB6I635b6X5Y2h54mMIDIu6aKG5Y+W5Y2h5YaM5aWW5YqxIDMu5Y2h5YaM5aWW5Yqx5a+E5Ye6IDQu5o+Q6YaS5pS25Y+W5Y2h5YaM5aWW5YqxIDUu5Y2h5YaM5LiK5pawXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lbnRpdHkuc2NlbmUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX3EgPSB0aGlzLmVudGl0eS5zY2VuZV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX3FBciA9IF9xLnNwbGl0KCc/Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9vYmogPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9wYXJhbXMgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcUFyLmxlbmd0aCA+IDEgPyBfcUFyWzFdLnNwbGl0KCcmJykgOiBfcUFyWzBdLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZmllbGRzID0gX3BhcmFtc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2ZpZWxkcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb2JqW19maWVsZHNbMF1dID0gX2ZpZWxkc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjZi5sb2coX29iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXQuZ29QYWdlKCdjYXJkbGlzdCcsIF9vYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHV0LmdvUGFnZSgnaW5kZXgnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dGhGbiAoX19yZXMsIF9fY29kZSwgX19jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IF9fcmVzLmRldGFpbC51c2VySW5mbztcclxuICAgICAgICAgICAgdGhpcy51c2VyTG9naW4oX19jb2RlLCBfX2NhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXV0aEFsZXJ0U2hvdyAoX19jb2RlLCBfX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCdBdXRoQWxlcnQnLCAnYWxlcnRTaG93JywgX19jb2RlLCBfX2NhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIG9uTG9hZCAoX29wdCkge1xyXG4gICAgICAgIHRoaXMubXNnSWQgPSBfb3B0LmlkO1xyXG4gICAgfVxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB0aGlzLnd4UmVxdWVzdChcclxuICAgICAgICAgICAgJ21zZy9kZXRhaWwnLFxyXG4gICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2YubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gcmVzLmRhdGEuZW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmVudGl0eS50aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J0biA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LnNjZW5lID09IDEgfHwgdGhpcy5lbnRpdHkuc2NlbmUgPT0gNCA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jcmVhdGVkX2F0ID0gdXQuZm9ybWF0VGltZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY3JlYXRlZF9hdCA/IHRoaXMuZW50aXR5LmNyZWF0ZWRfYXQgKiAxMDAwIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGlwcy50b2FzdChyZXMubXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyBpZDogdGhpcy5tc2dJZCB9LFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iXX0=