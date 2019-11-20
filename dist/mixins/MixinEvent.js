'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MixinEvent = function (_wepy$mixin) {
    _inherits(MixinEvent, _wepy$mixin);

    function MixinEvent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MixinEvent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MixinEvent.__proto__ || Object.getPrototypeOf(MixinEvent)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            mixin: '公用事件'
        }, _this.methods = {
            catchtouchmove: function catchtouchmove(e) {
                return true;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return MixinEvent;
}(_wepy2.default.mixin);

exports.default = MixinEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1peGluRXZlbnQuanMiXSwibmFtZXMiOlsiTWl4aW5FdmVudCIsImRhdGEiLCJtaXhpbiIsIm1ldGhvZHMiLCJjYXRjaHRvdWNobW92ZSIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7OztrTUFDakJDLEksR0FBTztBQUNIQyxtQkFBTztBQURKLFMsUUFHUEMsTyxHQUFVO0FBQ05DLDBCQURNLDBCQUNTQyxDQURULEVBQ1c7QUFDYix1QkFBTyxJQUFQO0FBQ0g7QUFISyxTOzs7O0VBSjBCLGVBQUtILEs7O2tCQUF4QkYsVSIsImZpbGUiOiJNaXhpbkV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1peGluRXZlbnQgZXh0ZW5kcyB3ZXB5Lm1peGluIHtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbWl4aW46ICflhaznlKjkuovku7YnXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNhdGNodG91Y2htb3ZlKGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19