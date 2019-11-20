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

var _MixinEvent = require('./../mixins/MixinEvent.js');

var _MixinEvent2 = _interopRequireDefault(_MixinEvent);

var _Auth = require('./../mixins/Auth.js');

var _Auth2 = _interopRequireDefault(_Auth);

var _Tips = require('./../util/Tips.js');

var _Tips2 = _interopRequireDefault(_Tips);

var _CardManage = require('./../util/CardManage.js');

var _CardManage2 = _interopRequireDefault(_CardManage);

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

    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: ''
    }, _this.mixins = [_Https2.default, _Auth2.default, _MixinEvent2.default], _this.data = {
      inited: false,
      imghost: _config2.default.imghost,
      isSwiperAniEnd: true,
      swiperIndex: -1,
      swiperPages: [],
      videoBtn: false,
      showvideo: false,
      showCard: false,
      showFilter: false,
      bookId: '',
      cardId: '',
      imgBg: '',
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
        card_num: 0,
        is_card_flag: 0,
        user_card_num: 0,
        is_reward: 0
      },
      prevCard: {
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
        rank: 0,
        auto_card_id: '',
        is_view: 0,
        is_have: 0,
        _mask: false,
        _activation: false
      },
      quitTime: 0,
      quitTimer: null
    }, _this.$repeat = {}, _this.$props = { "AuthAlert": { "xmlns:v-on": "" } }, _this.$events = { "AuthAlert": { "v-on:childFn": "authFn" } }, _this.components = {
      AuthAlert: _AuthAlert2.default
    }, _this.methods = {
      clickLeft: function clickLeft() {
        if (this.swiperIndex > 0 && this.isSwiperAniEnd) {
          this.isSwiperAniEnd = false;
          this.swiperIndex--;
        }
      },
      clickRight: function clickRight() {
        if (this.swiperIndex < this.swiperPages.length - 1 && this.isSwiperAniEnd) {
          this.isSwiperAniEnd = false;
          this.swiperIndex++;
        }
      },
      swiperAniEnd: function swiperAniEnd(e) {
        this.isSwiperAniEnd = true;
      },
      swiperChange: function swiperChange(e) {
        this.swiperIndex = e.detail.current;
        for (var m = 0; m < this.swiperPages.length; m++) {
          for (var n = 0; n < this.swiperPages[m].length; n++) {
            if (m <= this.swiperIndex + 1 && !this.swiperPages[m][n]._active) {
              this.swiperPages[m][n]._active = true;
            }
          }
        }
      },
      closeCard: function closeCard() {
        this.showCard = false;
      },
      clickCard: function clickCard(_pIndex, _cardIndex) {
        this.selPrevCard(this.swiperPages[_pIndex][_cardIndex], false);
      },
      clickPlay: function clickPlay() {
        if (this.prevCard._activation && this.prevCard._mask) {
          this.showvideo = true;
        }
      },
      videoEnd: function videoEnd() {
        this.showvideo = false;
        this.$parent.bgSoundPlay();
      },
      videoError: function videoError() {
        var _this2 = this;

        _Tips2.default.toast('视频无法播放', function (res) {
          _this2.showvideo = false;
          _this2.$parent.bgSoundPlay();
          _this2.$apply();
        });
      },
      cardLoadend: function cardLoadend() {
        this.showFilter = this.prevCard._filter;
      },
      clickQuit: function clickQuit() {
        var _this3 = this;

        _config2.default.log(this.quitTimer);
        var _t = new Date().getTime();
        _config2.default.log(_t - this.quitTime);
        if (this.quitTimer) {
          if (_t - this.quitTime <= 1500) {
            clearTimeout(this.quitTimer);
            this.quitTimer = null;
            this.showvideo = false;
            this.$parent.bgSoundPlay();
          } else {
            this.quitTime = _t;
          }
        } else {
          this.quitTime = _t;
          this.quitTimer = setTimeout(function () {
            clearTimeout(_this3.quitTimer);
            _this3.quitTimer = null;
            _this3.$apply();
          }, 1500);
        }
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
    key: 'selPrevCard',
    value: function selPrevCard(_prevCard, _formActive) {
      this.prevCard = _prevCard;
      this.prevCard._mask = _CardManage2.default.showMask(this.prevCard);
      this.prevCard._filter = _CardManage2.default.showFilter(this.prevCard);
      this.prevCard._pic = _CardManage2.default.isHideCard(this.prevCard) && !this.prevCard.is_have ? '../images/hidecard.png' : this.prevCard.img_big;
      this.prevCard._showCardNum = _CardManage2.default.isHideCard(this.prevCard) ? this.prevCard.is_have : true;
      this.prevCard._activation = _CardManage2.default.isHideCard(this.prevCard) ? true : this.prevCard.is_have;
      this.prevCard.is_view = 1;
      _config2.default.log(this.prevCard);
      this.showCard = true;
      if (!_formActive) {
        this.wxRequest('card/detail', function (res) {
          if (res.code == 0) {} else {}
        }, { id: this.prevCard.id }, 1);
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(_opt) {
      this.swiperIndex = 0;
      this.bookId = _opt.bookId || '';
      this.cardId = _opt.cardId || '';
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.showvideo = false;
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this4 = this;

      if (this.cardId) {
        this.wxRequest('card/detail', function (res) {
          if (res.code == 0) {
            var _entity = res.data.entity;
            _entity.img_small = _this4.imghost + _entity.img_small;
            _entity.img_big = _this4.imghost + _entity.img_big;
            _entity.img_video = _this4.imghost + _entity.img_video;
            _this4.selPrevCard(_entity, true);
            _this4.$apply();
          }
        }, { id: this.cardId }, 1);
      }

      this.getList(200);
    }
  }, {
    key: 'getList',
    value: function getList(_init) {
      var _this5 = this;

      this.wxRequests(_init, '/cardbook/detail', function (res) {
        if (res.code == 0) {
          _this5.book = res.data.entity.book;
          wx.setNavigationBarTitle({
            title: _this5.book.name
          });
          _this5.imgBg = _this5.book.img_background;

          _this5.swiperPages = [];
          var _total = res.data.entity.cards.entities.length;
          var _entities = res.data.entity.cards.entities;
          for (var m = 0; m < Math.ceil(_total / 6); m++) {
            _this5.swiperPages[m] = [];
            var _len = m * 6 + 6 >= _total ? _total : m * 6 + 6;
            for (var n = m * 6; n < _len; n++) {
              var _entity = _entities[n];
              _entity._active = m <= _this5.swiperIndex + 1 ? true : false;
              _entity.img_small = _this5.imghost + _entity.img_small;
              _entity.img_big = _this5.imghost + _entity.img_big;
              _entity.img_video = _this5.imghost + _entity.img_video;
              _this5.swiperPages[m].push(_entity);
            }
          }
          _this5.$apply();
        } else {
          _Tips2.default.toast(res.msg);
        }
      }, {
        id: this.bookId
      }, 1, 1);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/cardlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRsaXN0LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsImRhdGEiLCJpbml0ZWQiLCJpbWdob3N0IiwiaXNTd2lwZXJBbmlFbmQiLCJzd2lwZXJJbmRleCIsInN3aXBlclBhZ2VzIiwidmlkZW9CdG4iLCJzaG93dmlkZW8iLCJzaG93Q2FyZCIsInNob3dGaWx0ZXIiLCJib29rSWQiLCJjYXJkSWQiLCJpbWdCZyIsImJvb2siLCJpZCIsIm5hbWUiLCJwcml6ZV9pZCIsImltZ19jb3ZlciIsImltZ19iYWNrZ3JvdW5kIiwiaW1nX2JvcmRlciIsImF1ZGlvIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJjYXJkX251bSIsImlzX2NhcmRfZmxhZyIsInVzZXJfY2FyZF9udW0iLCJpc19yZXdhcmQiLCJwcmV2Q2FyZCIsImJvb2tfaWQiLCJyYXJpdHkiLCJvcmlnaW4iLCJ0ZXh0IiwiaW1nX2JpZyIsImltZ19zbWFsbCIsInZpZGVvIiwiaW1nX3ZpZGVvIiwiY29kZV9udW0iLCJyYW5rIiwiYXV0b19jYXJkX2lkIiwiaXNfdmlldyIsImlzX2hhdmUiLCJfbWFzayIsIl9hY3RpdmF0aW9uIiwicXVpdFRpbWUiLCJxdWl0VGltZXIiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJBdXRoQWxlcnQiLCJtZXRob2RzIiwiY2xpY2tMZWZ0IiwiY2xpY2tSaWdodCIsImxlbmd0aCIsInN3aXBlckFuaUVuZCIsImUiLCJzd2lwZXJDaGFuZ2UiLCJkZXRhaWwiLCJjdXJyZW50IiwibSIsIm4iLCJfYWN0aXZlIiwiY2xvc2VDYXJkIiwiY2xpY2tDYXJkIiwiX3BJbmRleCIsIl9jYXJkSW5kZXgiLCJzZWxQcmV2Q2FyZCIsImNsaWNrUGxheSIsInZpZGVvRW5kIiwiJHBhcmVudCIsImJnU291bmRQbGF5IiwidmlkZW9FcnJvciIsInRvYXN0IiwiJGFwcGx5IiwiY2FyZExvYWRlbmQiLCJfZmlsdGVyIiwiY2xpY2tRdWl0IiwibG9nIiwiX3QiLCJEYXRlIiwiZ2V0VGltZSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJiZ0xvYWRFbmQiLCJhdXRoRm4iLCJfX3JlcyIsIl9fY29kZSIsIl9fY2FsbGJhY2siLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2VyTG9naW4iLCIkaW52b2tlIiwiX3ByZXZDYXJkIiwiX2Zvcm1BY3RpdmUiLCJzaG93TWFzayIsIl9waWMiLCJpc0hpZGVDYXJkIiwiX3Nob3dDYXJkTnVtIiwid3hSZXF1ZXN0IiwicmVzIiwiY29kZSIsIl9vcHQiLCJfZW50aXR5IiwiZW50aXR5IiwiZ2V0TGlzdCIsIl9pbml0Iiwid3hSZXF1ZXN0cyIsInd4Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwidGl0bGUiLCJfdG90YWwiLCJjYXJkcyIsImVudGl0aWVzIiwiX2VudGl0aWVzIiwiTWF0aCIsImNlaWwiLCJfbGVuIiwicHVzaCIsIm1zZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsTSxHQUFTLHVELFFBQ1RDLEksR0FBTztBQUNMQyxjQUFRLEtBREg7QUFFTEMsZUFBUyxpQkFBR0EsT0FGUDtBQUdMQyxzQkFBZ0IsSUFIWDtBQUlMQyxtQkFBYSxDQUFDLENBSlQ7QUFLTEMsbUJBQWEsRUFMUjtBQU1MQyxnQkFBVSxLQU5MO0FBT0xDLGlCQUFXLEtBUE47QUFRTEMsZ0JBQVUsS0FSTDtBQVNMQyxrQkFBWSxLQVRQO0FBVUxDLGNBQVEsRUFWSDtBQVdMQyxjQUFRLEVBWEg7QUFZTEMsYUFBTyxFQVpGO0FBYUxDLFlBQU07QUFDSkMsWUFBSSxFQURBO0FBRUpDLGNBQU0sRUFGRjtBQUdKQyxr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RCxJQUFJLENBQWpCLEVBQW9CQyxJQUFJd0QsSUFBeEIsRUFBOEJ4RCxHQUE5QixFQUFtQztBQUNqQyxrQkFBSTBDLFVBQVVXLFVBQVVyRCxDQUFWLENBQWQ7QUFDQTBDLHNCQUFRekMsT0FBUixHQUFrQkYsS0FBSyxPQUFLdkQsV0FBTCxHQUFtQixDQUF4QixHQUE0QixJQUE1QixHQUFtQyxLQUFyRDtBQUNBa0csc0JBQVFyRSxTQUFSLEdBQW9CLE9BQUsvQixPQUFMLEdBQWVvRyxRQUFRckUsU0FBM0M7QUFDQXFFLHNCQUFRdEUsT0FBUixHQUFrQixPQUFLOUIsT0FBTCxHQUFlb0csUUFBUXRFLE9BQXpDO0FBQ0FzRSxzQkFBUW5FLFNBQVIsR0FBb0IsT0FBS2pDLE9BQUwsR0FBZW9HLFFBQVFuRSxTQUEzQztBQUNBLHFCQUFLOUIsV0FBTCxDQUFpQnNELENBQWpCLEVBQW9CMEQsSUFBcEIsQ0FBeUJmLE9BQXpCO0FBQ0Q7QUFDRjtBQUNELGlCQUFLN0IsTUFBTDtBQUNELFNBdkJELE1BdUJPO0FBQ0wseUJBQUtELEtBQUwsQ0FBVzJCLElBQUltQixHQUFmO0FBQ0Q7QUFDRixPQTlCSCxFQStCRTtBQUNFeEcsWUFBSSxLQUFLSjtBQURYLE9BL0JGLEVBa0NFLENBbENGLEVBbUNFLENBbkNGO0FBcUNEOzs7O0VBelBnQyxlQUFLNkcsSTs7a0JBQW5CM0gsSyIsImZpbGUiOiJjYXJkbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGNmIGZyb20gJy4uL2NvbmZpZyc7XHJcbmltcG9ydCBodHRwcyBmcm9tICcuLi9taXhpbnMvSHR0cHMnO1xyXG5pbXBvcnQgbWl4aW5FdmVudCBmcm9tICcuLi9taXhpbnMvTWl4aW5FdmVudCc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4uL21peGlucy9BdXRoJztcclxuaW1wb3J0IFRpcHMgZnJvbSAnLi4vdXRpbC9UaXBzJztcclxuaW1wb3J0IGNtIGZyb20gJy4uL3V0aWwvQ2FyZE1hbmFnZSc7XHJcbmltcG9ydCBBdXRoQWxlcnQgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRoQWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnXHJcbiAgfTtcclxuICBtaXhpbnMgPSBbaHR0cHMsIGF1dGgsIG1peGluRXZlbnRdO1xyXG4gIGRhdGEgPSB7XHJcbiAgICBpbml0ZWQ6IGZhbHNlLFxyXG4gICAgaW1naG9zdDogY2YuaW1naG9zdCxcclxuICAgIGlzU3dpcGVyQW5pRW5kOiB0cnVlLFxyXG4gICAgc3dpcGVySW5kZXg6IC0xLFxyXG4gICAgc3dpcGVyUGFnZXM6IFtdLFxyXG4gICAgdmlkZW9CdG46IGZhbHNlLFxyXG4gICAgc2hvd3ZpZGVvOiBmYWxzZSxcclxuICAgIHNob3dDYXJkOiBmYWxzZSxcclxuICAgIHNob3dGaWx0ZXI6IGZhbHNlLFxyXG4gICAgYm9va0lkOiAnJyxcclxuICAgIGNhcmRJZDogJycsXHJcbiAgICBpbWdCZzogJycsXHJcbiAgICBib29rOiB7XHJcbiAgICAgIGlkOiAnJyxcclxuICAgICAgbmFtZTogJycsXHJcbiAgICAgIHByaXplX2lkOiAnJyxcclxuICAgICAgaW1nX2NvdmVyOiAnJyxcclxuICAgICAgaW1nX2JhY2tncm91bmQ6ICcnLFxyXG4gICAgICBpbWdfYm9yZGVyOiAnJyxcclxuICAgICAgYXVkaW86ICcnLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnJyxcclxuICAgICAgdXBkYXRlZF9hdDogJycsXHJcbiAgICAgIGNhcmRfbnVtOiAwLFxyXG4gICAgICBpc19jYXJkX2ZsYWc6IDAsXHJcbiAgICAgIHVzZXJfY2FyZF9udW06IDAsXHJcbiAgICAgIGlzX3Jld2FyZDogMFxyXG4gICAgfSxcclxuICAgIHByZXZDYXJkOiB7XHJcbiAgICAgIGlkOiAnJyxcclxuICAgICAgYm9va19pZDogJycsXHJcbiAgICAgIG5hbWU6ICcnLFxyXG4gICAgICByYXJpdHk6IHtcclxuICAgICAgICBvcmlnaW46ICcnLFxyXG4gICAgICAgIHRleHQ6ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIGltZ19iaWc6ICcnLFxyXG4gICAgICBpbWdfc21hbGw6ICcnLFxyXG4gICAgICB2aWRlbzogJycsXHJcbiAgICAgIGltZ192aWRlbzogJycsXHJcbiAgICAgIGNyZWF0ZWRfYXQ6ICcnLFxyXG4gICAgICB1cGRhdGVkX2F0OiAnJyxcclxuICAgICAgY29kZV9udW06ICcnLFxyXG4gICAgICByYW5rOiAwLFxyXG4gICAgICBhdXRvX2NhcmRfaWQ6ICcnLFxyXG4gICAgICBpc192aWV3OiAwLFxyXG4gICAgICBpc19oYXZlOiAwLFxyXG4gICAgICBfbWFzazogZmFsc2UsXHJcbiAgICAgIF9hY3RpdmF0aW9uOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHF1aXRUaW1lOiAwLFxyXG4gICAgcXVpdFRpbWVyOiBudWxsXHJcbiAgfTtcciRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQXV0aEFsZXJ0XCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcIkF1dGhBbGVydFwiOntcInYtb246Y2hpbGRGblwiOlwiYXV0aEZuXCJ9fTtcclxuXG5jb21wb25lbnRzID0ge1xyXG4gICAgICAgIEF1dGhBbGVydDogQXV0aEFsZXJ0XHJcbiAgICB9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbGlja0xlZnQoKSB7XHJcbiAgICAgIGlmICh0aGlzLnN3aXBlckluZGV4ID4gMCAmJiB0aGlzLmlzU3dpcGVyQW5pRW5kKSB7XHJcbiAgICAgICAgdGhpcy5pc1N3aXBlckFuaUVuZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3dpcGVySW5kZXgtLTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsaWNrUmlnaHQoKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnN3aXBlckluZGV4IDwgdGhpcy5zd2lwZXJQYWdlcy5sZW5ndGggLSAxICYmXHJcbiAgICAgICAgdGhpcy5pc1N3aXBlckFuaUVuZFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmlzU3dpcGVyQW5pRW5kID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zd2lwZXJJbmRleCsrO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3dpcGVyQW5pRW5kKGUpIHtcclxuICAgICAgdGhpcy5pc1N3aXBlckFuaUVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgc3dpcGVyQ2hhbmdlKGUpIHtcclxuICAgICAgdGhpcy5zd2lwZXJJbmRleCA9IGUuZGV0YWlsLmN1cnJlbnQ7XHJcbiAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgdGhpcy5zd2lwZXJQYWdlcy5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5zd2lwZXJQYWdlc1ttXS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgaWYgKG0gPD0gdGhpcy5zd2lwZXJJbmRleCArIDEgJiYgIXRoaXMuc3dpcGVyUGFnZXNbbV1bbl0uX2FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXBlclBhZ2VzW21dW25dLl9hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsb3NlQ2FyZCgpIHtcclxuICAgICAgdGhpcy5zaG93Q2FyZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGNsaWNrQ2FyZChfcEluZGV4LCBfY2FyZEluZGV4KSB7XHJcbiAgICAgIHRoaXMuc2VsUHJldkNhcmQodGhpcy5zd2lwZXJQYWdlc1tfcEluZGV4XVtfY2FyZEluZGV4XSwgZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrUGxheSgpIHtcclxuICAgICAgaWYgKHRoaXMucHJldkNhcmQuX2FjdGl2YXRpb24gJiYgdGhpcy5wcmV2Q2FyZC5fbWFzaykge1xyXG4gICAgICAgIHRoaXMuc2hvd3ZpZGVvID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHZpZGVvRW5kKCkge1xyXG4gICAgICB0aGlzLnNob3d2aWRlbyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLiRwYXJlbnQuYmdTb3VuZFBsYXkoKTtcclxuICAgIH0sXHJcbiAgICB2aWRlb0Vycm9yKCkge1xyXG4gICAgICBUaXBzLnRvYXN0KCfop4bpopHml6Dms5Xmkq3mlL4nLCByZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd3ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kcGFyZW50LmJnU291bmRQbGF5KCk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY2FyZExvYWRlbmQoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0ZpbHRlciA9IHRoaXMucHJldkNhcmQuX2ZpbHRlcjtcclxuICAgIH0sXHJcbiAgICBjbGlja1F1aXQoKSB7XHJcbiAgICAgIGNmLmxvZyh0aGlzLnF1aXRUaW1lcik7XHJcbiAgICAgIGxldCBfdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICBjZi5sb2coX3QgLSB0aGlzLnF1aXRUaW1lKTtcclxuICAgICAgaWYgKHRoaXMucXVpdFRpbWVyKSB7XHJcbiAgICAgICAgaWYgKF90IC0gdGhpcy5xdWl0VGltZSA8PSAxNTAwKSB7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5xdWl0VGltZXIpO1xyXG4gICAgICAgICAgdGhpcy5xdWl0VGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5zaG93dmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuJHBhcmVudC5iZ1NvdW5kUGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnF1aXRUaW1lID0gX3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucXVpdFRpbWUgPSBfdDtcclxuICAgICAgICB0aGlzLnF1aXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucXVpdFRpbWVyKTtcclxuICAgICAgICAgIHRoaXMucXVpdFRpbWVyID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiZ0xvYWRFbmQoKSB7XHJcbiAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAgICAgYXV0aEZuIChfX3JlcywgX19jb2RlLCBfX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gX19yZXMuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMb2dpbihfX2NvZGUsIF9fY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhdXRoQWxlcnRTaG93IChfX2NvZGUsIF9fY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ0F1dGhBbGVydCcsICdhbGVydFNob3cnLCBfX2NvZGUsIF9fY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIHNlbFByZXZDYXJkKF9wcmV2Q2FyZCwgX2Zvcm1BY3RpdmUpIHtcclxuICAgIHRoaXMucHJldkNhcmQgPSBfcHJldkNhcmQ7XHJcbiAgICB0aGlzLnByZXZDYXJkLl9tYXNrID0gY20uc2hvd01hc2sodGhpcy5wcmV2Q2FyZCk7XHJcbiAgICB0aGlzLnByZXZDYXJkLl9maWx0ZXIgPSBjbS5zaG93RmlsdGVyKHRoaXMucHJldkNhcmQpO1xyXG4gICAgdGhpcy5wcmV2Q2FyZC5fcGljID1cclxuICAgICAgY20uaXNIaWRlQ2FyZCh0aGlzLnByZXZDYXJkKSAmJiAhdGhpcy5wcmV2Q2FyZC5pc19oYXZlXHJcbiAgICAgICAgPyAnLi4vaW1hZ2VzL2hpZGVjYXJkLnBuZydcclxuICAgICAgICA6IHRoaXMucHJldkNhcmQuaW1nX2JpZztcclxuICAgIHRoaXMucHJldkNhcmQuX3Nob3dDYXJkTnVtID0gY20uaXNIaWRlQ2FyZCh0aGlzLnByZXZDYXJkKVxyXG4gICAgICA/IHRoaXMucHJldkNhcmQuaXNfaGF2ZVxyXG4gICAgICA6IHRydWU7XHJcbiAgICB0aGlzLnByZXZDYXJkLl9hY3RpdmF0aW9uID0gY20uaXNIaWRlQ2FyZCh0aGlzLnByZXZDYXJkKVxyXG4gICAgICA/IHRydWVcclxuICAgICAgOiB0aGlzLnByZXZDYXJkLmlzX2hhdmU7XHJcbiAgICB0aGlzLnByZXZDYXJkLmlzX3ZpZXcgPSAxO1xyXG4gICAgY2YubG9nKHRoaXMucHJldkNhcmQpO1xyXG4gICAgdGhpcy5zaG93Q2FyZCA9IHRydWU7XHJcbiAgICBpZiAoIV9mb3JtQWN0aXZlKSB7XHJcbiAgICAgIHRoaXMud3hSZXF1ZXN0KFxyXG4gICAgICAgICdjYXJkL2RldGFpbCcsXHJcbiAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBpZDogdGhpcy5wcmV2Q2FyZC5pZCB9LFxyXG4gICAgICAgIDFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKF9vcHQpIHtcclxuICAgIHRoaXMuc3dpcGVySW5kZXggPSAwO1xyXG4gICAgdGhpcy5ib29rSWQgPSBfb3B0LmJvb2tJZCB8fCAnJztcclxuICAgIHRoaXMuY2FyZElkID0gX29wdC5jYXJkSWQgfHwgJyc7XHJcbiAgfVxyXG4gIG9uSGlkZSgpIHtcclxuICAgIHRoaXMuc2hvd3ZpZGVvID0gZmFsc2U7XHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIGlmICh0aGlzLmNhcmRJZCkge1xyXG4gICAgICB0aGlzLnd4UmVxdWVzdChcclxuICAgICAgICAnY2FyZC9kZXRhaWwnLFxyXG4gICAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgX2VudGl0eSA9IHJlcy5kYXRhLmVudGl0eTtcclxuICAgICAgICAgICAgX2VudGl0eS5pbWdfc21hbGwgPSB0aGlzLmltZ2hvc3QgKyBfZW50aXR5LmltZ19zbWFsbDtcclxuICAgICAgICAgICAgX2VudGl0eS5pbWdfYmlnID0gdGhpcy5pbWdob3N0ICsgX2VudGl0eS5pbWdfYmlnO1xyXG4gICAgICAgICAgICBfZW50aXR5LmltZ192aWRlbyA9IHRoaXMuaW1naG9zdCArIF9lbnRpdHkuaW1nX3ZpZGVvO1xyXG4gICAgICAgICAgICB0aGlzLnNlbFByZXZDYXJkKF9lbnRpdHksIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBpZDogdGhpcy5jYXJkSWQgfSxcclxuICAgICAgICAxXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRMaXN0KDIwMCk7XHJcbiAgfVxyXG4gIGdldExpc3QoX2luaXQpIHtcclxuICAgIHRoaXMud3hSZXF1ZXN0cyhcclxuICAgICAgX2luaXQsXHJcbiAgICAgICcvY2FyZGJvb2svZGV0YWlsJyxcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5ib29rID0gcmVzLmRhdGEuZW50aXR5LmJvb2s7XHJcbiAgICAgICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5ib29rLm5hbWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5pbWdCZyA9IHRoaXMuYm9vay5pbWdfYmFja2dyb3VuZDtcclxuXHJcbiAgICAgICAgICB0aGlzLnN3aXBlclBhZ2VzID0gW107XHJcbiAgICAgICAgICBsZXQgX3RvdGFsID0gcmVzLmRhdGEuZW50aXR5LmNhcmRzLmVudGl0aWVzLmxlbmd0aDtcclxuICAgICAgICAgIGxldCBfZW50aXRpZXMgPSByZXMuZGF0YS5lbnRpdHkuY2FyZHMuZW50aXRpZXM7XHJcbiAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IE1hdGguY2VpbChfdG90YWwgLyA2KTsgbSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyUGFnZXNbbV0gPSBbXTtcclxuICAgICAgICAgICAgbGV0IF9sZW4gPSBtICogNiArIDYgPj0gX3RvdGFsID8gX3RvdGFsIDogbSAqIDYgKyA2O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuID0gbSAqIDY7IG4gPCBfbGVuOyBuKyspIHtcclxuICAgICAgICAgICAgICBsZXQgX2VudGl0eSA9IF9lbnRpdGllc1tuXTtcclxuICAgICAgICAgICAgICBfZW50aXR5Ll9hY3RpdmUgPSBtIDw9IHRoaXMuc3dpcGVySW5kZXggKyAxID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgIF9lbnRpdHkuaW1nX3NtYWxsID0gdGhpcy5pbWdob3N0ICsgX2VudGl0eS5pbWdfc21hbGw7XHJcbiAgICAgICAgICAgICAgX2VudGl0eS5pbWdfYmlnID0gdGhpcy5pbWdob3N0ICsgX2VudGl0eS5pbWdfYmlnO1xyXG4gICAgICAgICAgICAgIF9lbnRpdHkuaW1nX3ZpZGVvID0gdGhpcy5pbWdob3N0ICsgX2VudGl0eS5pbWdfdmlkZW87XHJcbiAgICAgICAgICAgICAgdGhpcy5zd2lwZXJQYWdlc1ttXS5wdXNoKF9lbnRpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBUaXBzLnRvYXN0KHJlcy5tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiB0aGlzLmJvb2tJZFxyXG4gICAgICB9LFxyXG4gICAgICAxLFxyXG4gICAgICAxXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=