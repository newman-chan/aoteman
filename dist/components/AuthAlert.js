'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _MixinEvent = require('./../mixins/MixinEvent.js');

var _MixinEvent2 = _interopRequireDefault(_MixinEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$component) {
    _inherits(Index, _wepy$component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            hasUserInfo: false,
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
            code: null,
            callback: null,
            isShow: false
        }, _this.mixins = [_MixinEvent2.default], _this.methods = {
            clickEvt: function clickEvt() {
                this.isShow = false;
            },
            getUserInfo: function getUserInfo(e) {
                if (e.detail.errMsg == "getUserInfo:ok") {
                    this.isShow = false;
                    this.hasUserInfo = false;
                    this.$emit('childFn', e, this.code, this.callback);
                } else {
                    this.isShow = true;
                    this.hasUserInfo = true;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'alertShow',
        value: function alertShow(__code, __callback) {
            this.code = __code;
            this.callback = __callback;
            this.hasUserInfo = true;
            this.isShow = true;
            this.$apply();
        }
    }]);

    return Index;
}(_wepy2.default.component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1dGhBbGVydC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImRhdGEiLCJoYXNVc2VySW5mbyIsImNhbklVc2UiLCJ3eCIsImNvZGUiLCJjYWxsYmFjayIsImlzU2hvdyIsIm1peGlucyIsIm1ldGhvZHMiLCJjbGlja0V2dCIsImdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsImVyck1zZyIsIiRlbWl0IiwiX19jb2RlIiwiX19jYWxsYmFjayIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTztBQUNIQyx5QkFBYSxLQURWO0FBRUhDLHFCQUFTQyxHQUFHRCxPQUFILENBQVcsOEJBQVgsQ0FGTjtBQUdIRSxrQkFBSyxJQUhGO0FBSUhDLHNCQUFTLElBSk47QUFLSEMsb0JBQU87QUFMSixTLFFBT1BDLE0sR0FBUyxzQixRQUNUQyxPLEdBQVU7QUFDTkMsb0JBRE0sc0JBQ0k7QUFDTixxQkFBS0gsTUFBTCxHQUFjLEtBQWQ7QUFDSCxhQUhLO0FBSU5JLHVCQUpNLHVCQUlPQyxDQUpQLEVBSVU7QUFDWixvQkFBSUEsRUFBRUMsTUFBRixDQUFTQyxNQUFULElBQW1CLGdCQUF2QixFQUF5QztBQUNyQyx5QkFBS1AsTUFBTCxHQUFjLEtBQWQ7QUFDQSx5QkFBS0wsV0FBTCxHQUFtQixLQUFuQjtBQUNBLHlCQUFLYSxLQUFMLENBQVcsU0FBWCxFQUFzQkgsQ0FBdEIsRUFBd0IsS0FBS1AsSUFBN0IsRUFBa0MsS0FBS0MsUUFBdkM7QUFDSCxpQkFKRCxNQUlPO0FBQ0gseUJBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EseUJBQUtMLFdBQUwsR0FBbUIsSUFBbkI7QUFDSDtBQUNKO0FBYkssUzs7Ozs7a0NBZUNjLE0sRUFBT0MsVSxFQUFZO0FBQzFCLGlCQUFLWixJQUFMLEdBQVlXLE1BQVo7QUFDQSxpQkFBS1YsUUFBTCxHQUFnQlcsVUFBaEI7QUFDQSxpQkFBS2YsV0FBTCxHQUFtQixJQUFuQjtBQUNBLGlCQUFLSyxNQUFMLEdBQWMsSUFBZDtBQUNBLGlCQUFLVyxNQUFMO0FBQ0g7Ozs7RUE5QjhCLGVBQUtDLFM7O2tCQUFuQm5CLEsiLCJmaWxlIjoiQXV0aEFsZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBtaXhpbkV2ZW50IGZyb20gJy4uL21peGlucy9NaXhpbkV2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgICAgIGNvZGU6bnVsbCxcbiAgICAgICAgY2FsbGJhY2s6bnVsbCxcbiAgICAgICAgaXNTaG93OmZhbHNlXG4gICAgfTtcbiAgICBtaXhpbnMgPSBbbWl4aW5FdmVudF07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY2xpY2tFdnQoKXtcbiAgICAgICAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFVzZXJJbmZvIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09IFwiZ2V0VXNlckluZm86b2tcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoaWxkRm4nLCBlLHRoaXMuY29kZSx0aGlzLmNhbGxiYWNrKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGFsZXJ0U2hvdyAoX19jb2RlLF9fY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jb2RlID0gX19jb2RlO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gX19jYWxsYmFjaztcbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG59XG4iXX0=