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
      navigationBarTitleText: '领取奖励'
    }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
      bookId: '',
      prizeId: ''
    }, _this.methods = {
      clickLqjl: function clickLqjl() {
        if (this.bookId && this.prizeId) {
          _Util2.default.goPage('confirmaddress', { bookId: this.bookId, prizeId: this.prizeId });
        } else {
          _Tips2.default.toast('奖励不存在');
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(_opt) {
      this.bookId = _opt.bookId || '';
      this.prizeId = _opt.prizeId || '';
    }
  }, {
    key: 'onReady',
    value: function onReady() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      /*this.wxRequest(
        'card/detail',
        res => {
          if (res.code == 0) {
            ut.setStorageSync('confirmaddress', res.data.entity);
            this.showBtn = true;
            this.$apply();
          } else {
            Tips.toast(res.msg);
          }
        },
        { id: this.prizeId },
        1
      );*/
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/reward'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJld2FyZC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJkYXRhIiwiYm9va0lkIiwicHJpemVJZCIsIm1ldGhvZHMiLCJjbGlja0xxamwiLCJnb1BhZ2UiLCJ0b2FzdCIsIl9vcHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsTSxHQUFTLGlDLFFBQ1RDLEksR0FBTztBQUNMQyxjQUFPLEVBREY7QUFFTEMsZUFBUztBQUZKLEssUUFLUEMsTyxHQUFVO0FBQ1JDLGVBRFEsdUJBQ0k7QUFDVixZQUFJLEtBQUtILE1BQUwsSUFBZSxLQUFLQyxPQUF4QixFQUFpQztBQUMvQix5QkFBR0csTUFBSCxDQUFVLGdCQUFWLEVBQTRCLEVBQUNKLFFBQU8sS0FBS0EsTUFBYixFQUFxQkMsU0FBUyxLQUFLQSxPQUFuQyxFQUE1QjtBQUNELFNBRkQsTUFFTztBQUNMLHlCQUFLSSxLQUFMLENBQVcsT0FBWDtBQUNEO0FBQ0Y7QUFQTyxLOzs7OzsyQkFTSEMsSSxFQUFNO0FBQ1gsV0FBS04sTUFBTCxHQUFjTSxLQUFLTixNQUFMLElBQWUsRUFBN0I7QUFDQSxXQUFLQyxPQUFMLEdBQWVLLEtBQUtMLE9BQUwsSUFBZ0IsRUFBL0I7QUFDRDs7OzhCQUNTLENBQUU7Ozs2QkFDSDtBQUNQOzs7Ozs7Ozs7Ozs7OztBQWNEOzs7O0VBdkNnQyxlQUFLTSxJOztrQkFBbkJaLEsiLCJmaWxlIjoicmV3YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY2YgZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IGh0dHBzIGZyb20gJy4uL21peGlucy9IdHRwcyc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcclxuaW1wb3J0IHV0IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcbmltcG9ydCBUaXBzIGZyb20gJy4uL3V0aWwvVGlwcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihuWPluWlluWKsSdcclxuICB9O1xyXG4gIG1peGlucyA9IFtodHRwcywgYXV0aF07XHJcbiAgZGF0YSA9IHtcclxuICAgIGJvb2tJZDonJyxcclxuICAgIHByaXplSWQ6ICcnXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsaWNrTHFqbCgpIHtcclxuICAgICAgaWYgKHRoaXMuYm9va0lkICYmIHRoaXMucHJpemVJZCkge1xyXG4gICAgICAgIHV0LmdvUGFnZSgnY29uZmlybWFkZHJlc3MnLCB7Ym9va0lkOnRoaXMuYm9va0lkLCBwcml6ZUlkOiB0aGlzLnByaXplSWQgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgVGlwcy50b2FzdCgn5aWW5Yqx5LiN5a2Y5ZyoJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIG9uTG9hZChfb3B0KSB7XHJcbiAgICB0aGlzLmJvb2tJZCA9IF9vcHQuYm9va0lkIHx8ICcnO1xyXG4gICAgdGhpcy5wcml6ZUlkID0gX29wdC5wcml6ZUlkIHx8ICcnO1xyXG4gIH1cclxuICBvblJlYWR5KCkge31cclxuICBvblNob3coKSB7XHJcbiAgICAvKnRoaXMud3hSZXF1ZXN0KFxyXG4gICAgICAnY2FyZC9kZXRhaWwnLFxyXG4gICAgICByZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XHJcbiAgICAgICAgICB1dC5zZXRTdG9yYWdlU3luYygnY29uZmlybWFkZHJlc3MnLCByZXMuZGF0YS5lbnRpdHkpO1xyXG4gICAgICAgICAgdGhpcy5zaG93QnRuID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIFRpcHMudG9hc3QocmVzLm1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7IGlkOiB0aGlzLnByaXplSWQgfSxcclxuICAgICAgMVxyXG4gICAgKTsqL1xyXG4gIH1cclxufVxyXG4iXX0=