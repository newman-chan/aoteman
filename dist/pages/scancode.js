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

var _CardManage = require('./../util/CardManage.js');

var _CardManage2 = _interopRequireDefault(_CardManage);

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
            inited: false,
            aniTime: 160,
            cardAnimationData: {},
            lanAnimationData: {},
            hongAnimationData: {},
            baiAnimationData: {},
            tipBackAnimationData: {},
            tipFrontAnimationData: {},
            guangAnimationData: {},
            cardTipAnimationData: {},
            arrowLeftAnimationData: {},
            arrowRightAnimationData: {},
            hideBackAnimationData: {},
            hideFrontAnimationData: {},
            showBtn: false,
            showFilter: false,
            activation: false,
            isLook: false,
            imgCard: '',
            isShowFilter: false,
            showHideCard: false,
            showHideCardWarp: false,
            showHideFilter: false,
            cardCode: '',
            hideImgCard: '',
            book: {
                id: '',
                name: '',
                prize_id: '',
                img_cover: '',
                img_background: '',
                img_border: '',
                audio: '',
                created_at: '',
                updated_at: '',
                card_num: '',
                is_card_flag: 0,
                user_card_num: 0,
                is_reward: 0
            },
            steryCard: null,
            hideCard: {
                id: '',
                book_id: '',
                name: '',
                rarity: {
                    origin: '',
                    text: ''
                },
                img_big: '',
                img_small: '',
                video: '',
                img_video: '',
                created_at: '',
                updated_at: '',
                code_num: '',
                rank: '',
                auto_card_id: '',
                is_view: 0,
                is_have: 0
            }
        }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
            AuthAlert: _AuthAlert2.default
        }, _this.methods = {
            cardLoadend: function cardLoadend() {
                _config2.default.log('开始动画');
                this.cardAni();
            },
            cardLoadErr: function cardLoadErr(e) {
                _Tips2.default.toast('卡牌路径不存在');
            },
            btnOkClick: function btnOkClick() {
                if (this.showBtn) {
                    _Util2.default.goPage('index', { cardId: this.hideCard.book_id }, 2);
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
        key: 'onShareAppMessage',
        value: function onShareAppMessage(options) {}
    }, {
        key: 'onLoad',
        value: function onLoad(_opt) {
            _config2.default.log(_opt);
            var _obj = {};
            if (_opt.q) {
                var _q = decodeURIComponent(decodeURIComponent(_opt.q));
                var _qAr = _q.split('?');
                if (_qAr.length > 1) {
                    var _params = _qAr[1].split('&');
                    for (var i = 0; i < _params.length; i++) {
                        var _fields = _params[i].split('=');
                        if (_fields.length > 1) {
                            _obj[_fields[0]] = _fields[1];
                        }
                    }
                    _config2.default.log(_obj);
                }
                this.cardCode = _obj.code || '';
            }
        }
    }, {
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var _login, _cardAr, _testId;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.isLogin();

                            case 2:
                                _login = _context.sent;
                                _cardAr = ['ba6107e06270fda104f6cbbd1da81334'];
                                _testId = _cardAr[Math.floor(Math.random() * _cardAr.length)];

                                _config2.default.log('测试卡ID' + _testId);
                                _config2.default.log('卡ID' + this.cardCode);
                                if (_login.code == 0) {
                                    this.wxRequest('card/bind', function (res) {
                                        if (res.code == 0) {
                                            _this2.isShowFilter = _CardManage2.default.showFilter(res.data.entity.card);
                                            _this2.imgCard = _config2.default.imghost + res.data.entity.card.img_big;
                                            _this2.book = res.data.entity.book;
                                            _this2.hideCard = res.data.entity.card;
                                            _this2.steryCard = res.data.entity.steryCard || null;
                                            _this2.activation = res.data.entity.hint == 1 ? false : true;
                                            _this2.isLook = false;
                                            _this2.$apply();
                                        } else if (res.code == 3002) {
                                            _this2.isLook = true;
                                            _this2.isShowFilter = _CardManage2.default.showFilter(res.data.request.card);
                                            _this2.imgCard = _config2.default.imghost + res.data.request.card.img_big;
                                            _this2.book = res.data.request.book;
                                            _this2.hideCard = res.data.request.card;
                                            _this2.steryCard = null;
                                            _this2.$apply();
                                        } else {
                                            _Tips2.default.toast(res.msg);
                                        }
                                    }, {
                                        card_code: this.cardCode ? this.cardCode : ''
                                    }, 1, 1);
                                } else {
                                    _Tips2.default.toast(_login.msg);
                                }

                            case 8:
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
    }, {
        key: 'cardAni',
        value: function cardAni() {
            var _this3 = this;

            var _animation = wx.createAnimation({
                transformOrigin: '50% 50%',
                timingFunction: 'linear',
                duration: 500
            });
            _animation.scale(1.1, 1.1).step();
            _animation.scale(1, 1).step({ duration: 200 });
            this.cardAnimationData = _animation.export();

            setTimeout(function () {
                _this3.guangAni();
                _this3.lanAni();
            }, 700);
        }
    }, {
        key: 'guangAni',
        value: function guangAni() {
            var _this4 = this;

            var _animation = wx.createAnimation({
                duration: 1000
            });
            _animation.top('771rpx').step();

            this.guangAnimationData = _animation.export();
            this.$apply();
            setTimeout(function (res) {
                _this4.showFilter = _this4.isShowFilter;
                _this4.$apply();
            }, 1000);
        }
    }, {
        key: 'lanAni',
        value: function lanAni() {
            var _this5 = this;

            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('-233rpx').top('264rpx').step();

            this.lanAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _this5.hongAni();
            }, this.aniTime);
        }
    }, {
        key: 'hongAni',
        value: function hongAni() {
            var _this6 = this;

            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('-473rpx').top('710rpx').step();

            this.hongAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _this6.baiAni();
            }, this.aniTime);
        }
    }, {
        key: 'baiAni',
        value: function baiAni() {
            var _this7 = this;

            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('-247rpx').top('755rpx').step();

            this.baiAnimationData = _animation.export();
            this.$apply();
            setTimeout(function (res) {
                if (_this7.isLook) {
                    _this7.btnShow();
                } else {
                    _this7.tipBackAni();
                    _this7.tipFrontAni();
                }
            }, this.isLook ? 2000 : this.aniTime);
        }
    }, {
        key: 'tipBackAni',
        value: function tipBackAni() {
            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('128rpx').top(this.activation ? '872rpx' : '780rpx').step();
            _animation.left('226rpx').top(this.activation ? '730rpx' : '680rpx').step({ duration: 1875 });
            this.tipBackAnimationData = _animation.export();
            this.$apply();
        }
    }, {
        key: 'tipFrontAni',
        value: function tipFrontAni() {
            var _this8 = this;

            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('157rpx').top(this.activation ? '810rpx' : '718rpx').step();
            _animation.left('226rpx').top(this.activation ? '698rpx' : '646rpx').step({ duration: 1875 });
            this.tipFrontAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                if (_this8.steryCard) {
                    _this8.hideImgCard = _this8.imghost + _this8.steryCard.img_big;
                    _this8.showHideCardWarp = true;
                    _this8.$apply();
                    setTimeout(function () {
                        _this8.arrowLeftAni();
                        _this8.arrowRightAni();
                        _this8.hideTipAni();
                    }, 300);
                    _config2.default.log('隐藏卡激活');
                } else {
                    _this8.btnShow();
                }
            }, this.showFilter ? this.$parent.globalData.cardFilterTime + 1875 : 1875);
        }
    }, {
        key: 'arrowLeftAni',
        value: function arrowLeftAni() {
            var _this9 = this;

            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('156rpx').step();
            this.arrowLeftAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _animation.left('750rpx').step();
                _this9.arrowLeftAnimationData = _animation.export();
                _this9.$apply();
            }, this.aniTime);
        }
    }, {
        key: 'arrowRightAni',
        value: function arrowRightAni() {
            var _this10 = this;

            var _animation = wx.createAnimation({
                duration: this.aniTime
            });
            _animation.left('156rpx').step();
            this.arrowRightAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _animation.left('-440rpx').step();
                _this10.arrowRightAnimationData = _animation.export();
                _this10.$apply();
            }, this.aniTime);
        }
    }, {
        key: 'hideTipAni',
        value: function hideTipAni() {
            var _this11 = this;

            var _animation = wx.createAnimation({
                duration: 500
            });
            _animation.opacity(1).step();
            this.cardTipAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _animation.opacity(0).scale(10, 10).step();
                _this11.cardTipAnimationData = _animation.export();
                _this11.$apply();
                setTimeout(function () {
                    _this11.hideCardAni();
                }, 200);
            }, 600);
        }
    }, {
        key: 'hideCardAni',
        value: function hideCardAni() {
            var _this12 = this;

            this.showHideCard = true;
            this.$apply();
            setTimeout(function () {
                _this12.hideBackAni();
            }, 300);
        }
    }, {
        key: 'hideBackAni',
        value: function hideBackAni() {
            var _this13 = this;

            var _animation = wx.createAnimation({
                duration: 500
            });
            _animation.rotateY(-90).step();
            this.hideBackAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _this13.hideFrontAni();
            }, 500);
        }
    }, {
        key: 'hideFrontAni',
        value: function hideFrontAni() {
            var _this14 = this;

            var _animation = wx.createAnimation({
                duration: 500
            });
            _animation.rotateY(0).step();
            this.hideFrontAnimationData = _animation.export();
            this.$apply();
            setTimeout(function () {
                _this14.showHideFilter = _CardManage2.default.showFilter(_this14.steryCard);

                _this14.$apply();
                setTimeout(function () {
                    _this14.btnShow();
                }, _this14.$parent.globalData.cardFilterTime);
            }, 500);
        }
    }, {
        key: 'btnShow',
        value: function btnShow() {
            this.showBtn = true;
            this.$apply();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/scancode'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjYW5jb2RlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibWl4aW5zIiwiZGF0YSIsImltZ2hvc3QiLCJpbml0ZWQiLCJhbmlUaW1lIiwiY2FyZEFuaW1hdGlvbkRhdGEiLCJsYW5BbmltYXRpb25EYXRhIiwiaG9uZ0FuaW1hdGlvbkRhdGEiLCJiYWlBbmltYXRpb25EYXRhIiwidGlwQmFja0FuaW1hdGlvbkRhdGEiLCJ0aXBGcm9udEFuaW1hdGlvbkRhdGEiLCJndWFuZ0FuaW1hdGlvbkRhdGEiLCJjYXJkVGlwQW5pbWF0aW9uRGF0YSIsImFycm93TGVmdEFuaW1hdGlvbkRhdGEiLCJhcnJvd1JpZ2h0QW5pbWF0aW9uRGF0YSIsImhpZGVCYWNrQW5pbWF0aW9uRGF0YSIsImhpZGVGcm9udEFuaW1hdGlvbkRhdGEiLCJzaG93QnRuIiwic2hvd0ZpbHRlciIsImFjdGl2YXRpb24iLCJpc0xvb2siLCJpbWdDYXJkIiwiaXNTaG93RmlsdGVyIiwic2hvd0hpZGVDYXJkIiwic2hvd0hpZGVDYXJkV2FycCIsInNob3dIaWRlRmlsdGVyIiwiY2FyZENvZGUiLCJoaWRlSW1nQ2FyZCIsImJvb2siLCJpZCIsIm5hbWUiLCJwcml6ZV9pZCIsImltZ19jb3ZlciIsImltZ19iYWNrZ3JvdW5kIiwiaW1nX2JvcmRlciIsImF1ZGlvIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJjYXJkX251bSIsImlzX2NhcmRfZmxhZyIsInVzZXJfY2FyZF9udW0iLCJpc19yZXdhcmQiLCJzdGVyeUNhcmQiLCJoaWRlQ2FyZCIsImJvb2tfaWQiLCJyYXJpdHkiLCJvcmlnaW4iLCJ0ZXh0IiwiaW1nX2JpZyIsImltZ19zbWFsbCIsInZpZGVvIiwiaW1nX3ZpZGVvIiwiY29kZV9udW0iLCJyYW5rIiwiYXV0b19jYXJkX2lkIiwiaXNfdmlldyIsImlzX2hhdmUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJBdXRoQWxlcnQiLCJtZXRob2RzIiwiY2FyZExvYWRlbmQiLCJsb2ciLCJjYXJkQW5pIiwiY2FyZExvYWRFcnIiLCJlIiwidG9hc3QiLCJidG5Pa0NsaWNrIiwiZ29QYWdlIiwiY2FyZElkIiwiYXV0aEZuIiwiX19yZXMiLCJfX2NvZGUiLCJfX2NhbGxiYWNrIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImRldGFpbCIsInVzZXJMb2dpbiIsIiRpbnZva2UiLCJvcHRpb25zIiwiX29wdCIsIl9vYmoiLCJxIiwiX3EiLCJkZWNvZGVVUklDb21wb25lbnQiLCJfcUFyIiwic3BsaXQiLCJsZW5ndGgiLCJfcGFyYW1zIiwiaSIsIl9maWVsZHMiLCJjb2RlIiwiaXNMb2dpbiIsIl9sb2dpbiIsIl9jYXJkQXIiLCJfdGVzdElkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwid3hSZXF1ZXN0IiwicmVzIiwiZW50aXR5IiwiY2FyZCIsImhpbnQiLCIkYXBwbHkiLCJyZXF1ZXN0IiwibXNnIiwiY2FyZF9jb2RlIiwiX2FuaW1hdGlvbiIsInd4IiwiY3JlYXRlQW5pbWF0aW9uIiwidHJhbnNmb3JtT3JpZ2luIiwidGltaW5nRnVuY3Rpb24iLCJkdXJhdGlvbiIsInNjYWxlIiwic3RlcCIsImV4cG9ydCIsInNldFRpbWVvdXQiLCJndWFuZ0FuaSIsImxhbkFuaSIsInRvcCIsImxlZnQiLCJob25nQW5pIiwiYmFpQW5pIiwiYnRuU2hvdyIsInRpcEJhY2tBbmkiLCJ0aXBGcm9udEFuaSIsImFycm93TGVmdEFuaSIsImFycm93UmlnaHRBbmkiLCJoaWRlVGlwQW5pIiwiY2FyZEZpbHRlclRpbWUiLCJvcGFjaXR5IiwiaGlkZUNhcmRBbmkiLCJoaWRlQmFja0FuaSIsInJvdGF0ZVkiLCJoaWRlRnJvbnRBbmkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxN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Z0csV0FBV1EsTUFBWCxFQUE3QjtBQUNBLGlCQUFLWixNQUFMO0FBQ0FhLHVCQUFXLFlBQU07QUFDYix3QkFBS2tCLFlBQUw7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7dUNBQ2U7QUFBQTs7QUFDWixnQkFBSTNCLGFBQWFDLEdBQUdDLGVBQUgsQ0FBbUI7QUFDaENHLDBCQUFVO0FBRHNCLGFBQW5CLENBQWpCO0FBR0FMLHVCQUFXMEIsT0FBWCxDQUFtQixDQUFuQixFQUFzQm5CLElBQXRCO0FBQ0EsaUJBQUt0RyxzQkFBTCxHQUE4QitGLFdBQVdRLE1BQVgsRUFBOUI7QUFDQSxpQkFBS1osTUFBTDtBQUNBYSx1QkFBVyxZQUFNO0FBQ2Isd0JBQUsvRixjQUFMLEdBQXNCLHFCQUFHUCxVQUFILENBQWMsUUFBS3dCLFNBQW5CLENBQXRCOztBQUVBLHdCQUFLaUUsTUFBTDtBQUNBYSwyQkFBVyxZQUFNO0FBQ2IsNEJBQUtPLE9BQUw7QUFDSCxpQkFGRCxFQUVHLFFBQUtuRCxPQUFMLENBQWFDLFVBQWIsQ0FBd0J3RCxjQUYzQjtBQUdILGFBUEQsRUFPRyxHQVBIO0FBUUg7OztrQ0FDVTtBQUNQLGlCQUFLcEgsT0FBTCxHQUFlLElBQWY7QUFDQSxpQkFBSzBGLE1BQUw7QUFDSDs7OztFQTFXOEIsZUFBS2dDLEk7O2tCQUFuQjVJLEsiLCJmaWxlIjoic2NhbmNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBjZiBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSAnLi4vbWl4aW5zL0h0dHBzJztcclxuaW1wb3J0IGF1dGggZnJvbSAnLi4vbWl4aW5zL0F1dGgnO1xyXG5pbXBvcnQgdXQgZnJvbSAnLi4vdXRpbC9VdGlsJztcclxuaW1wb3J0IFRpcHMgZnJvbSAnLi4vdXRpbC9UaXBzJztcclxuaW1wb3J0IGNtIGZyb20gJy4uL3V0aWwvQ2FyZE1hbmFnZSc7XHJcbmltcG9ydCBBdXRoQWxlcnQgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRoQWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgbWl4aW5zID0gW2h0dHBzLCBhdXRoXTtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaW1naG9zdDogY2YuaW1naG9zdCxcclxuICAgICAgICBpbml0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIGFuaVRpbWU6IDE2MCxcclxuICAgICAgICBjYXJkQW5pbWF0aW9uRGF0YToge30sXHJcbiAgICAgICAgbGFuQW5pbWF0aW9uRGF0YToge30sXHJcbiAgICAgICAgaG9uZ0FuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIGJhaUFuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIHRpcEJhY2tBbmltYXRpb25EYXRhOiB7fSxcclxuICAgICAgICB0aXBGcm9udEFuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIGd1YW5nQW5pbWF0aW9uRGF0YToge30sXHJcbiAgICAgICAgY2FyZFRpcEFuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIGFycm93TGVmdEFuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIGFycm93UmlnaHRBbmltYXRpb25EYXRhOiB7fSxcclxuICAgICAgICBoaWRlQmFja0FuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIGhpZGVGcm9udEFuaW1hdGlvbkRhdGE6IHt9LFxyXG4gICAgICAgIHNob3dCdG46IGZhbHNlLFxyXG4gICAgICAgIHNob3dGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgIGFjdGl2YXRpb246IGZhbHNlLFxyXG4gICAgICAgIGlzTG9vazogZmFsc2UsXHJcbiAgICAgICAgaW1nQ2FyZDogJycsXHJcbiAgICAgICAgaXNTaG93RmlsdGVyOiBmYWxzZSxcclxuICAgICAgICBzaG93SGlkZUNhcmQ6IGZhbHNlLFxyXG4gICAgICAgIHNob3dIaWRlQ2FyZFdhcnA6IGZhbHNlLFxyXG4gICAgICAgIHNob3dIaWRlRmlsdGVyOiBmYWxzZSxcclxuICAgICAgICBjYXJkQ29kZTogJycsXHJcbiAgICAgICAgaGlkZUltZ0NhcmQ6ICcnLFxyXG4gICAgICAgIGJvb2s6IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgcHJpemVfaWQ6ICcnLFxyXG4gICAgICAgICAgICBpbWdfY292ZXI6ICcnLFxyXG4gICAgICAgICAgICBpbWdfYmFja2dyb3VuZDogJycsXHJcbiAgICAgICAgICAgIGltZ19ib3JkZXI6ICcnLFxyXG4gICAgICAgICAgICBhdWRpbzogJycsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRfYXQ6ICcnLFxyXG4gICAgICAgICAgICB1cGRhdGVkX2F0OiAnJyxcclxuICAgICAgICAgICAgY2FyZF9udW06ICcnLFxyXG4gICAgICAgICAgICBpc19jYXJkX2ZsYWc6IDAsXHJcbiAgICAgICAgICAgIHVzZXJfY2FyZF9udW06IDAsXHJcbiAgICAgICAgICAgIGlzX3Jld2FyZDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RlcnlDYXJkOiBudWxsLFxyXG4gICAgICAgIGhpZGVDYXJkOiB7XHJcbiAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgYm9va19pZDogJycsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICByYXJpdHk6IHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbjogJycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWdfYmlnOiAnJyxcclxuICAgICAgICAgICAgaW1nX3NtYWxsOiAnJyxcclxuICAgICAgICAgICAgdmlkZW86ICcnLFxyXG4gICAgICAgICAgICBpbWdfdmlkZW86ICcnLFxyXG4gICAgICAgICAgICBjcmVhdGVkX2F0OiAnJyxcclxuICAgICAgICAgICAgdXBkYXRlZF9hdDogJycsXHJcbiAgICAgICAgICAgIGNvZGVfbnVtOiAnJyxcclxuICAgICAgICAgICAgcmFuazogJycsXHJcbiAgICAgICAgICAgIGF1dG9fY2FyZF9pZDogJycsXHJcbiAgICAgICAgICAgIGlzX3ZpZXc6IDAsXHJcbiAgICAgICAgICAgIGlzX2hhdmU6IDBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkF1dGhBbGVydFwiOntcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ2LW9uOmNoaWxkRm5cIjpcImF1dGhGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEF1dGhBbGVydDogQXV0aEFsZXJ0XHJcbiAgICB9O1xyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjYXJkTG9hZGVuZCAoKSB7XHJcbiAgICAgICAgICAgIGNmLmxvZygn5byA5aeL5Yqo55S7Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZEFuaSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZExvYWRFcnIgKGUpIHtcclxuICAgICAgICAgICAgVGlwcy50b2FzdCgn5Y2h54mM6Lev5b6E5LiN5a2Y5ZyoJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5Pa0NsaWNrICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0J0bikge1xyXG4gICAgICAgICAgICAgICAgdXQuZ29QYWdlKCdpbmRleCcsIHsgY2FyZElkOiB0aGlzLmhpZGVDYXJkLmJvb2tfaWQgfSwgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dGhGbiAoX19yZXMsIF9fY29kZSwgX19jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IF9fcmVzLmRldGFpbC51c2VySW5mbztcclxuICAgICAgICAgICAgdGhpcy51c2VyTG9naW4oX19jb2RlLCBfX2NhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXV0aEFsZXJ0U2hvdyAoX19jb2RlLCBfX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCdBdXRoQWxlcnQnLCAnYWxlcnRTaG93JywgX19jb2RlLCBfX2NhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlIChvcHRpb25zKSB7IH1cclxuICAgIG9uTG9hZCAoX29wdCkge1xyXG4gICAgICAgIGNmLmxvZyhfb3B0KTtcclxuICAgICAgICBsZXQgX29iaiA9IHt9O1xyXG4gICAgICAgIGlmIChfb3B0LnEpIHtcclxuICAgICAgICAgICAgbGV0IF9xID0gZGVjb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudChfb3B0LnEpKTtcclxuICAgICAgICAgICAgbGV0IF9xQXIgPSBfcS5zcGxpdCgnPycpO1xyXG4gICAgICAgICAgICBpZiAoX3FBci5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3BhcmFtcyA9IF9xQXJbMV0uc3BsaXQoJyYnKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3BhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZmllbGRzID0gX3BhcmFtc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfZmllbGRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX29ialtfZmllbGRzWzBdXSA9IF9maWVsZHNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2YubG9nKF9vYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZENvZGUgPSBfb2JqLmNvZGUgfHwgJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25TaG93ICgpIHtcclxuICAgICAgICBsZXQgX2xvZ2luID0gYXdhaXQgdGhpcy5pc0xvZ2luKCk7XHJcbiAgICAgICAgbGV0IF9jYXJkQXIgPSBbJ2JhNjEwN2UwNjI3MGZkYTEwNGY2Y2JiZDFkYTgxMzM0J107XHJcbiAgICAgICAgbGV0IF90ZXN0SWQgPSBfY2FyZEFyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIF9jYXJkQXIubGVuZ3RoKV07XHJcbiAgICAgICAgY2YubG9nKCfmtYvor5XljaFJRCcgKyBfdGVzdElkKTtcclxuICAgICAgICBjZi5sb2coJ+WNoUlEJyArIHRoaXMuY2FyZENvZGUpO1xyXG4gICAgICAgIGlmIChfbG9naW4uY29kZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3hSZXF1ZXN0KFxyXG4gICAgICAgICAgICAgICAgJ2NhcmQvYmluZCcsXHJcbiAgICAgICAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93RmlsdGVyID0gY20uc2hvd0ZpbHRlcihyZXMuZGF0YS5lbnRpdHkuY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW1nQ2FyZCA9IGNmLmltZ2hvc3QgKyByZXMuZGF0YS5lbnRpdHkuY2FyZC5pbWdfYmlnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvb2sgPSByZXMuZGF0YS5lbnRpdHkuYm9vaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQ2FyZCA9IHJlcy5kYXRhLmVudGl0eS5jYXJkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXJ5Q2FyZCA9IHJlcy5kYXRhLmVudGl0eS5zdGVyeUNhcmQgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0aW9uID0gcmVzLmRhdGEuZW50aXR5LmhpbnQgPT0gMSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvb2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jb2RlID09IDMwMDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2hvd0ZpbHRlciA9IGNtLnNob3dGaWx0ZXIocmVzLmRhdGEucmVxdWVzdC5jYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWdDYXJkID0gY2YuaW1naG9zdCArIHJlcy5kYXRhLnJlcXVlc3QuY2FyZC5pbWdfYmlnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvb2sgPSByZXMuZGF0YS5yZXF1ZXN0LmJvb2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUNhcmQgPSByZXMuZGF0YS5yZXF1ZXN0LmNhcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcnlDYXJkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaXBzLnRvYXN0KHJlcy5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZF9jb2RlOiB0aGlzLmNhcmRDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jYXJkQ29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUaXBzLnRvYXN0KF9sb2dpbi5tc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhcmRBbmkgKCkge1xyXG4gICAgICAgIGxldCBfYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNTAlIDUwJScsXHJcbiAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnbGluZWFyJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF9hbmltYXRpb24uc2NhbGUoMS4xLCAxLjEpLnN0ZXAoKTtcclxuICAgICAgICBfYW5pbWF0aW9uLnNjYWxlKDEsIDEpLnN0ZXAoeyBkdXJhdGlvbjogMjAwIH0pO1xyXG4gICAgICAgIHRoaXMuY2FyZEFuaW1hdGlvbkRhdGEgPSBfYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ndWFuZ0FuaSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxhbkFuaSgpO1xyXG4gICAgICAgIH0sIDcwMCk7XHJcbiAgICB9XHJcbiAgICBndWFuZ0FuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF9hbmltYXRpb24udG9wKCc3NzFycHgnKS5zdGVwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3VhbmdBbmltYXRpb25EYXRhID0gX2FuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmlsdGVyID0gdGhpcy5pc1Nob3dGaWx0ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFuQW5pICgpIHtcclxuICAgICAgICBsZXQgX2FuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLmFuaVRpbWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBfYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIC5sZWZ0KCctMjMzcnB4JylcclxuICAgICAgICAgICAgLnRvcCgnMjY0cnB4JylcclxuICAgICAgICAgICAgLnN0ZXAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5BbmltYXRpb25EYXRhID0gX2FuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvbmdBbmkoKTtcclxuICAgICAgICB9LCB0aGlzLmFuaVRpbWUpO1xyXG4gICAgfVxyXG4gICAgaG9uZ0FuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5hbmlUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvblxyXG4gICAgICAgICAgICAubGVmdCgnLTQ3M3JweCcpXHJcbiAgICAgICAgICAgIC50b3AoJzcxMHJweCcpXHJcbiAgICAgICAgICAgIC5zdGVwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaG9uZ0FuaW1hdGlvbkRhdGEgPSBfYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFpQW5pKCk7XHJcbiAgICAgICAgfSwgdGhpcy5hbmlUaW1lKTtcclxuICAgIH1cclxuICAgIGJhaUFuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5hbmlUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvblxyXG4gICAgICAgICAgICAubGVmdCgnLTI0N3JweCcpXHJcbiAgICAgICAgICAgIC50b3AoJzc1NXJweCcpXHJcbiAgICAgICAgICAgIC5zdGVwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFpQW5pbWF0aW9uRGF0YSA9IF9hbmltYXRpb24uZXhwb3J0KCk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9vaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5TaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcEJhY2tBbmkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwRnJvbnRBbmkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuaXNMb29rID8gMjAwMCA6IHRoaXMuYW5pVGltZSk7XHJcbiAgICB9XHJcbiAgICB0aXBCYWNrQW5pICgpIHtcclxuICAgICAgICBsZXQgX2FuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLmFuaVRpbWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBfYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIC5sZWZ0KCcxMjhycHgnKVxyXG4gICAgICAgICAgICAudG9wKHRoaXMuYWN0aXZhdGlvbiA/ICc4NzJycHgnIDogJzc4MHJweCcpXHJcbiAgICAgICAgICAgIC5zdGVwKCk7XHJcbiAgICAgICAgX2FuaW1hdGlvblxyXG4gICAgICAgICAgICAubGVmdCgnMjI2cnB4JylcclxuICAgICAgICAgICAgLnRvcCh0aGlzLmFjdGl2YXRpb24gPyAnNzMwcnB4JyA6ICc2ODBycHgnKVxyXG4gICAgICAgICAgICAuc3RlcCh7IGR1cmF0aW9uOiAxODc1IH0pO1xyXG4gICAgICAgIHRoaXMudGlwQmFja0FuaW1hdGlvbkRhdGEgPSBfYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICB0aXBGcm9udEFuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5hbmlUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvblxyXG4gICAgICAgICAgICAubGVmdCgnMTU3cnB4JylcclxuICAgICAgICAgICAgLnRvcCh0aGlzLmFjdGl2YXRpb24gPyAnODEwcnB4JyA6ICc3MThycHgnKVxyXG4gICAgICAgICAgICAuc3RlcCgpO1xyXG4gICAgICAgIF9hbmltYXRpb25cclxuICAgICAgICAgICAgLmxlZnQoJzIyNnJweCcpXHJcbiAgICAgICAgICAgIC50b3AodGhpcy5hY3RpdmF0aW9uID8gJzY5OHJweCcgOiAnNjQ2cnB4JylcclxuICAgICAgICAgICAgLnN0ZXAoeyBkdXJhdGlvbjogMTg3NSB9KTtcclxuICAgICAgICB0aGlzLnRpcEZyb250QW5pbWF0aW9uRGF0YSA9IF9hbmltYXRpb24uZXhwb3J0KCk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcnlDYXJkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVJbWdDYXJkID0gdGhpcy5pbWdob3N0ICsgdGhpcy5zdGVyeUNhcmQuaW1nX2JpZztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hpZGVDYXJkV2FycCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJvd0xlZnRBbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycm93UmlnaHRBbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVUaXBBbmkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjZi5sb2coJ+makOiXj+WNoea/gOa0uycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNob3dGaWx0ZXIgPyB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jYXJkRmlsdGVyVGltZSArIDE4NzUgOiAxODc1KTtcclxuICAgIH1cclxuICAgIGFycm93TGVmdEFuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5hbmlUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvbi5sZWZ0KCcxNTZycHgnKS5zdGVwKCk7XHJcbiAgICAgICAgdGhpcy5hcnJvd0xlZnRBbmltYXRpb25EYXRhID0gX2FuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBfYW5pbWF0aW9uLmxlZnQoJzc1MHJweCcpLnN0ZXAoKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJvd0xlZnRBbmltYXRpb25EYXRhID0gX2FuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LCB0aGlzLmFuaVRpbWUpO1xyXG4gICAgfVxyXG4gICAgYXJyb3dSaWdodEFuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5hbmlUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvbi5sZWZ0KCcxNTZycHgnKS5zdGVwKCk7XHJcbiAgICAgICAgdGhpcy5hcnJvd1JpZ2h0QW5pbWF0aW9uRGF0YSA9IF9hbmltYXRpb24uZXhwb3J0KCk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgX2FuaW1hdGlvbi5sZWZ0KCctNDQwcnB4Jykuc3RlcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFycm93UmlnaHRBbmltYXRpb25EYXRhID0gX2FuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LCB0aGlzLmFuaVRpbWUpO1xyXG4gICAgfVxyXG4gICAgaGlkZVRpcEFuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvbi5vcGFjaXR5KDEpLnN0ZXAoKTtcclxuICAgICAgICB0aGlzLmNhcmRUaXBBbmltYXRpb25EYXRhID0gX2FuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBfYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICAub3BhY2l0eSgwKVxyXG4gICAgICAgICAgICAgICAgLnNjYWxlKDEwLCAxMClcclxuICAgICAgICAgICAgICAgIC5zdGVwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZFRpcEFuaW1hdGlvbkRhdGEgPSBfYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUNhcmRBbmkoKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9LCA2MDApO1xyXG4gICAgfVxyXG4gICAgaGlkZUNhcmRBbmkgKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0hpZGVDYXJkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVCYWNrQW5pKCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuICAgIGhpZGVCYWNrQW5pICgpIHtcclxuICAgICAgICBsZXQgX2FuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1MDBcclxuICAgICAgICB9KTtcclxuICAgICAgICBfYW5pbWF0aW9uLnJvdGF0ZVkoLTkwKS5zdGVwKCk7XHJcbiAgICAgICAgdGhpcy5oaWRlQmFja0FuaW1hdGlvbkRhdGEgPSBfYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUZyb250QW5pKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuICAgIGhpZGVGcm9udEFuaSAoKSB7XHJcbiAgICAgICAgbGV0IF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogNTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX2FuaW1hdGlvbi5yb3RhdGVZKDApLnN0ZXAoKTtcclxuICAgICAgICB0aGlzLmhpZGVGcm9udEFuaW1hdGlvbkRhdGEgPSBfYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGVGaWx0ZXIgPSBjbS5zaG93RmlsdGVyKHRoaXMuc3RlcnlDYXJkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5TaG93KCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNhcmRGaWx0ZXJUaW1lKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gICAgYnRuU2hvdyAoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93QnRuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==