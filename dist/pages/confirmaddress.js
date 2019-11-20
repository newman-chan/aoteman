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
            navigationBarTitleText: '确认地址'
        }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
            bookId: '',
            prizeId: '',
            address: {
                id: '',
                user_id: '',
                is_default: 0,
                name: '',
                mobile: '',
                province_id: '',
                city_id: '',
                area_id: '',
                address: '',
                created_at: '',
                updated_at: '',
                province_name: '',
                city_name: '',
                area_name: ''
            }
        }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
            AuthAlert: _AuthAlert2.default
        }, _this.methods = {
            clickConfirm: function clickConfirm() {
                if (!_Util2.default.strTrim(this.address.name)) {
                    _Tips2.default.toast('请选择一个地址');
                } else if (!this.bookId) {
                    _Tips2.default.toast('卡册在上架中');
                } else if (!this.prizeId) {
                    _Tips2.default.toast('奖励在上架中');
                } else {
                    this.wxRequest('order/add', function (res) {
                        if (res.code == 0) {
                            _Util2.default.goPage('success');
                        } else {
                            _Tips2.default.toast(res.msg);
                        }
                    }, {
                        name: this.address.name,
                        mobile: this.address.mobile,
                        address: this.address.province_name + this.address.city_name + this.address.area_name + this.address.address,
                        book_id: this.bookId,
                        prize_id: this.prizeId
                    }, 1);
                }
            },
            clickQtdz: function clickQtdz() {
                _Util2.default.goPage('address', { isSel: 1 });
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
            _Util2.default.setStorageSync('addressadd', '');
            this.bookId = _opt.bookId || '';
            this.prizeId = _opt.prizeId || '';
            _config2.default.log(this.bookId + ">>>" + this.prizeId);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this2 = this;

            var _address = _Util2.default.getStorageSync('addressadd');
            if (_address) {
                this.address = _address;
                this.$apply();
            } else {
                this.wxRequest('address/getDefault', function (res) {
                    if (res.code == 0) {
                        if (res.data.entity.hasOwnProperty('id')) {
                            _this2.address = res.data.entity;
                            _this2.$apply();
                        } else {
                            _Util2.default.goPage('addressadd', { isEdit: 1 });
                        }
                    } else {
                        _Util2.default.goPage('addressadd', { isEdit: 1 });
                    }
                }, {}, 1, 1);
            }
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/confirmaddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpcm1hZGRyZXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsImRhdGEiLCJib29rSWQiLCJwcml6ZUlkIiwiYWRkcmVzcyIsImlkIiwidXNlcl9pZCIsImlzX2RlZmF1bHQiLCJuYW1lIiwibW9iaWxlIiwicHJvdmluY2VfaWQiLCJjaXR5X2lkIiwiYXJlYV9pZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwicHJvdmluY2VfbmFtZSIsImNpdHlfbmFtZSIsImFyZWFfbmFtZSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkF1dGhBbGVydCIsIm1ldGhvZHMiLCJjbGlja0NvbmZpcm0iLCJzdHJUcmltIiwidG9hc3QiLCJ3eFJlcXVlc3QiLCJyZXMiLCJjb2RlIiwiZ29QYWdlIiwibXNnIiwiYm9va19pZCIsInByaXplX2lkIiwiY2xpY2tRdGR6IiwiaXNTZWwiLCJhdXRoRm4iLCJfX3JlcyIsIl9fY29kZSIsIl9fY2FsbGJhY2siLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiZGV0YWlsIiwidXNlckxvZ2luIiwiJGludm9rZSIsIl9vcHQiLCJzZXRTdG9yYWdlU3luYyIsImxvZyIsIl9hZGRyZXNzIiwiZ2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJlbnRpdHkiLCJoYXNPd25Qcm9wZXJ0eSIsImlzRWRpdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLE0sR0FBUyxpQyxRQUNUQyxJLEdBQU87QUFDSEMsb0JBQVEsRUFETDtBQUVIQyxxQkFBUyxFQUZOO0FBR0hDLHFCQUFTO0FBQ0xD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N0MsT0FBTCxHQUFlNkMsUUFBZjtBQUNBLHFCQUFLRSxNQUFMO0FBQ0gsYUFIRCxNQUdPO0FBQ0gscUJBQUt4QixTQUFMLENBQ0ksb0JBREosRUFFSSxlQUFPO0FBQ0gsd0JBQUlDLElBQUlDLElBQUosSUFBWSxDQUFoQixFQUFtQjtBQUNmLDRCQUFJRCxJQUFJM0IsSUFBSixDQUFTbUQsTUFBVCxDQUFnQkMsY0FBaEIsQ0FBK0IsSUFBL0IsQ0FBSixFQUEwQztBQUN0QyxtQ0FBS2pELE9BQUwsR0FBZXdCLElBQUkzQixJQUFKLENBQVNtRCxNQUF4QjtBQUNBLG1DQUFLRCxNQUFMO0FBQ0gseUJBSEQsTUFHTztBQUNILDJDQUFHckIsTUFBSCxDQUFVLFlBQVYsRUFBd0IsRUFBRXdCLFFBQVEsQ0FBVixFQUF4QjtBQUNIO0FBQ0oscUJBUEQsTUFPTztBQUNILHVDQUFHeEIsTUFBSCxDQUFVLFlBQVYsRUFBd0IsRUFBRXdCLFFBQVEsQ0FBVixFQUF4QjtBQUNIO0FBQ0osaUJBYkwsRUFjSSxFQWRKLEVBZUksQ0FmSixFQWdCSSxDQWhCSjtBQWtCSDtBQUNKOzs7O0VBMUc4QixlQUFLQyxJOztrQkFBbkIxRCxLIiwiZmlsZSI6ImNvbmZpcm1hZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY2YgZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IGh0dHBzIGZyb20gJy4uL21peGlucy9IdHRwcyc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcclxuaW1wb3J0IHV0IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcbmltcG9ydCBUaXBzIGZyb20gJy4uL3V0aWwvVGlwcyc7XHJcbmltcG9ydCBBdXRoQWxlcnQgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRoQWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTlnLDlnYAnXHJcbiAgICB9O1xyXG4gICAgbWl4aW5zID0gW2h0dHBzLCBhdXRoXTtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgYm9va0lkOiAnJyxcclxuICAgICAgICBwcml6ZUlkOiAnJyxcclxuICAgICAgICBhZGRyZXNzOiB7XHJcbiAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgdXNlcl9pZDogJycsXHJcbiAgICAgICAgICAgIGlzX2RlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBtb2JpbGU6ICcnLFxyXG4gICAgICAgICAgICBwcm92aW5jZV9pZDogJycsXHJcbiAgICAgICAgICAgIGNpdHlfaWQ6ICcnLFxyXG4gICAgICAgICAgICBhcmVhX2lkOiAnJyxcclxuICAgICAgICAgICAgYWRkcmVzczogJycsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcnLFxyXG4gICAgICAgICAgICB1cGRhdGVkX2F0OiAnJyxcclxuICAgICAgICAgICAgcHJvdmluY2VfbmFtZTogJycsXHJcbiAgICAgICAgICAgIGNpdHlfbmFtZTogJycsXHJcbiAgICAgICAgICAgIGFyZWFfbmFtZTogJydcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkF1dGhBbGVydFwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImF1dGhGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEF1dGhBbGVydDogQXV0aEFsZXJ0XHJcbiAgICB9O1xyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjbGlja0NvbmZpcm0gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXV0LnN0clRyaW0odGhpcy5hZGRyZXNzLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBUaXBzLnRvYXN0KCfor7fpgInmi6nkuIDkuKrlnLDlnYAnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5ib29rSWQpIHtcclxuICAgICAgICAgICAgICAgIFRpcHMudG9hc3QoJ+WNoeWGjOWcqOS4iuaetuS4rScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnByaXplSWQpIHtcclxuICAgICAgICAgICAgICAgIFRpcHMudG9hc3QoJ+WlluWKseWcqOS4iuaetuS4rScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53eFJlcXVlc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgJ29yZGVyL2FkZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0LmdvUGFnZSgnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGlwcy50b2FzdChyZXMubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmFkZHJlc3MubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9iaWxlOiB0aGlzLmFkZHJlc3MubW9iaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzLnByb3ZpbmNlX25hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzLmNpdHlfbmFtZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3MuYXJlYV9uYW1lICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzcy5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29rX2lkOiB0aGlzLmJvb2tJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpemVfaWQ6IHRoaXMucHJpemVJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xpY2tRdGR6ICgpIHtcclxuICAgICAgICAgICAgdXQuZ29QYWdlKCdhZGRyZXNzJywgeyBpc1NlbDogMSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dGhGbiAoX19yZXMsIF9fY29kZSwgX19jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IF9fcmVzLmRldGFpbC51c2VySW5mbztcclxuICAgICAgICAgICAgdGhpcy51c2VyTG9naW4oX19jb2RlLCBfX2NhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXV0aEFsZXJ0U2hvdyAoX19jb2RlLCBfX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCdBdXRoQWxlcnQnLCAnYWxlcnRTaG93JywgX19jb2RlLCBfX2NhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIG9uTG9hZCAoX29wdCkge1xyXG4gICAgICAgIHV0LnNldFN0b3JhZ2VTeW5jKCdhZGRyZXNzYWRkJywgJycpO1xyXG4gICAgICAgIHRoaXMuYm9va0lkID0gX29wdC5ib29rSWQgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5wcml6ZUlkID0gX29wdC5wcml6ZUlkIHx8ICcnO1xyXG4gICAgICAgIGNmLmxvZyh0aGlzLmJvb2tJZCArIFwiPj4+XCIgKyB0aGlzLnByaXplSWQpO1xyXG4gICAgfVxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICBsZXQgX2FkZHJlc3MgPSB1dC5nZXRTdG9yYWdlU3luYygnYWRkcmVzc2FkZCcpO1xyXG4gICAgICAgIGlmIChfYWRkcmVzcykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3MgPSBfYWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnd4UmVxdWVzdChcclxuICAgICAgICAgICAgICAgICdhZGRyZXNzL2dldERlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZW50aXR5Lmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3MgPSByZXMuZGF0YS5lbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXQuZ29QYWdlKCdhZGRyZXNzYWRkJywgeyBpc0VkaXQ6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dC5nb1BhZ2UoJ2FkZHJlc3NhZGQnLCB7IGlzRWRpdDogMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=