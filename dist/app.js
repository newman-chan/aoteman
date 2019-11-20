'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/scancode', 'pages/login', 'pages/address', 'pages/addressadd', 'pages/system', 'pages/user', 'pages/reward', 'pages/confirmaddress', 'pages/success', 'pages/cardlist', 'pages/systemdetail'],
      window: {
        backgroundColor: '#f1f1f1',
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#1B3A68',
        navigationBarTitleText: '奥特之魂',
        navigationBarTextStyle: 'white'
      }
    };
    _this.globalData = {
      cardFilterTime: 3000,
      isLogin: false,
      login: {},
      userInfo: null,
      bgSound: {
        isPlay: false,
        manager: null,
        currentTime: 0
      }
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var _this2 = this;

      this.globalData.bgSound.manager = wx.getBackgroundAudioManager();

      this.globalData.bgSound.manager.onPlay(function () {
        _config2.default.log('声音播放');
        _this2.globalData.bgSound.isPlay = true;
      });
      this.globalData.bgSound.manager.onPause(function () {
        _config2.default.log('声音暂停');
        _this2.globalData.bgSound.currentTime = _this2.globalData.bgSound.manager.currentTime;
        _this2.globalData.bgSound.isPlay = false;
      });
      this.globalData.bgSound.manager.onStop(function () {
        _config2.default.log('声音停止');
        _this2.globalData.bgSound.currentTime = 0;
        _this2.globalData.bgSound.isPlay = false;
      });
      this.globalData.bgSound.manager.onEnded(function () {
        _config2.default.log('声音播放结束');
        _this2.globalData.bgSound.currentTime = 0;
        _this2.globalData.bgSound.isPlay = false;
        _this2.bgSoundPlay();
      });
      this.globalData.bgSound.manager.onError(function (res) {
        _this2.globalData.bgSound.currentTime = 0;
        _this2.globalData.bgSound.isPlay = false;
        _config2.default.log('声音错误');
        _config2.default.log(res);
      });
      /*this.globalData.bgSound.manager.onTimeUpdate(() => {
        cf.log(this.globalData.bgSound.manager.currentTime +'>>>>>'+ this.globalData.bgSound.manager.duration);
      });*/
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.bgSoundPlay();
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.globalData.bgSound.manager.stop();
    }
  }, {
    key: 'onUnlaunch',
    value: function onUnlaunch() {
      this.globalData.bgSound.manager.stop();
    }
  }, {
    key: 'onError',
    value: function onError(_msg) {
      _config2.default.log('页面报错');
      _config2.default.log(_msg);
    }
  }, {
    key: 'onPageNotFound',
    value: function onPageNotFound() {
      _config2.default.log('页面不存在');
    }
  }, {
    key: 'bgSoundPlay',
    value: function bgSoundPlay() {
      if (!this.globalData.bgSound.isPlay) {
        this.globalData.bgSound.isPlay = true;
        _config2.default.log('声音');
        _config2.default.log(this.globalData.bgSound);
        if (this.globalData.bgSound.currentTime == 0) {
          _config2.default.log('声音---播放');
          this.globalData.bgSound.manager.title = "奥特之魂";
          this.globalData.bgSound.manager.src = _config2.default.bgSound;
          //this.globalData.bgSound.manager.startTime = 270
        } else {
          _config2.default.log('声音---续放' + this.globalData.bgSound.manager.paused);
          this.globalData.bgSound.manager.play();
        }
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiY2FyZEZpbHRlclRpbWUiLCJpc0xvZ2luIiwibG9naW4iLCJ1c2VySW5mbyIsImJnU291bmQiLCJpc1BsYXkiLCJtYW5hZ2VyIiwiY3VycmVudFRpbWUiLCJ1c2UiLCJ3eCIsImdldEJhY2tncm91bmRBdWRpb01hbmFnZXIiLCJvblBsYXkiLCJsb2ciLCJvblBhdXNlIiwib25TdG9wIiwib25FbmRlZCIsImJnU291bmRQbGF5Iiwib25FcnJvciIsInJlcyIsInN0b3AiLCJfbXNnIiwidGl0bGUiLCJzcmMiLCJwYXVzZWQiLCJwbGF5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUF1Q0Usc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQXBDZEEsTUFvQ2MsR0FwQ0w7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxnQkFGSyxFQUdMLGFBSEssRUFJTCxlQUpLLEVBS0wsa0JBTEssRUFNTCxjQU5LLEVBT0wsWUFQSyxFQVFMLGNBUkssRUFTTCxzQkFUSyxFQVVMLGVBVkssRUFXTCxnQkFYSyxFQVlMLG9CQVpLLENBREE7QUFlUEMsY0FBUTtBQUNOQyx5QkFBaUIsU0FEWDtBQUVOQyw2QkFBcUIsT0FGZjtBQUdOQyxzQ0FBOEIsU0FIeEI7QUFJTkMsZ0NBQXdCLE1BSmxCO0FBS05DLGdDQUF3QjtBQUxsQjtBQWZELEtBb0NLO0FBQUEsVUFaZEMsVUFZYyxHQVpEO0FBQ1hDLHNCQUFnQixJQURMO0FBRVhDLGVBQVMsS0FGRTtBQUdYQyxhQUFPLEVBSEk7QUFJWEMsZ0JBQVUsSUFK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Q0FBZ0JLLE9BQWhCLENBQXdCRyxXQUF4QixJQUF1QyxDQUEzQyxFQUE4QztBQUM1QywyQkFBR0ssR0FBSCxDQUFPLFNBQVA7QUFDQSxlQUFLYixVQUFMLENBQWdCSyxPQUFoQixDQUF3QkUsT0FBeEIsQ0FBZ0NlLEtBQWhDLEdBQXdDLE1BQXhDO0FBQ0EsZUFBS3RCLFVBQUwsQ0FBZ0JLLE9BQWhCLENBQXdCRSxPQUF4QixDQUFnQ2dCLEdBQWhDLEdBQXNDLGlCQUFHbEIsT0FBekM7QUFDQTtBQUNELFNBTEQsTUFLTztBQUNMLDJCQUFHUSxHQUFILENBQU8sWUFBWSxLQUFLYixVQUFMLENBQWdCSyxPQUFoQixDQUF3QkUsT0FBeEIsQ0FBZ0NpQixNQUFuRDtBQUNBLGVBQUt4QixVQUFMLENBQWdCSyxPQUFoQixDQUF3QkUsT0FBeEIsQ0FBZ0NrQixJQUFoQztBQUNEO0FBQ0Y7QUFDRjs7OztFQTFHMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcbmltcG9ydCBjZiBmcm9tICcuL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvc2NhbmNvZGUnLFxuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzJyxcbiAgICAgICdwYWdlcy9hZGRyZXNzYWRkJyxcbiAgICAgICdwYWdlcy9zeXN0ZW0nLFxuICAgICAgJ3BhZ2VzL3VzZXInLFxuICAgICAgJ3BhZ2VzL3Jld2FyZCcsXG4gICAgICAncGFnZXMvY29uZmlybWFkZHJlc3MnLFxuICAgICAgJ3BhZ2VzL3N1Y2Nlc3MnLFxuICAgICAgJ3BhZ2VzL2NhcmRsaXN0JyxcbiAgICAgICdwYWdlcy9zeXN0ZW1kZXRhaWwnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMWYxZjEnLFxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMUIzQTY4JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpaXnibnkuYvprYInLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH1cbiAgfTtcblxuICBnbG9iYWxEYXRhID0ge1xuICAgIGNhcmRGaWx0ZXJUaW1lOiAzMDAwLFxuICAgIGlzTG9naW46IGZhbHNlLFxuICAgIGxvZ2luOiB7fSxcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBiZ1NvdW5kOiB7XG4gICAgICBpc1BsYXk6IGZhbHNlLFxuICAgICAgbWFuYWdlcjogbnVsbCxcbiAgICAgIGN1cnJlbnRUaW1lOiAwXG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKTtcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLm1hbmFnZXIgPSB3eC5nZXRCYWNrZ3JvdW5kQXVkaW9NYW5hZ2VyKCk7XG5cbiAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLm9uUGxheSgoKSA9PiB7XG4gICAgICBjZi5sb2coJ+WjsOmfs+aSreaUvicpO1xuICAgICAgdGhpcy5nbG9iYWxEYXRhLmJnU291bmQuaXNQbGF5ID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLm9uUGF1c2UoKCkgPT4ge1xuICAgICAgY2YubG9nKCflo7Dpn7PmmoLlgZwnKTtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLmN1cnJlbnRUaW1lID0gdGhpcy5nbG9iYWxEYXRhLmJnU291bmQubWFuYWdlci5jdXJyZW50VGltZTtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLmlzUGxheSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLm1hbmFnZXIub25TdG9wKCgpID0+IHtcbiAgICAgIGNmLmxvZygn5aOw6Z+z5YGc5q2iJyk7XG4gICAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5pc1BsYXkgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLm9uRW5kZWQoKCkgPT4ge1xuICAgICAgY2YubG9nKCflo7Dpn7Pmkq3mlL7nu5PmnZ8nKTtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLmlzUGxheSA9IGZhbHNlO1xuICAgICAgdGhpcy5iZ1NvdW5kUGxheSgpO1xuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLm1hbmFnZXIub25FcnJvcihyZXMgPT4ge1xuICAgICAgdGhpcy5nbG9iYWxEYXRhLmJnU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgdGhpcy5nbG9iYWxEYXRhLmJnU291bmQuaXNQbGF5ID0gZmFsc2U7XG4gICAgICBjZi5sb2coJ+WjsOmfs+mUmeivrycpO1xuICAgICAgY2YubG9nKHJlcyk7XG4gICAgfSk7XG4gICAgLyp0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLm9uVGltZVVwZGF0ZSgoKSA9PiB7XG4gICAgICBjZi5sb2codGhpcy5nbG9iYWxEYXRhLmJnU291bmQubWFuYWdlci5jdXJyZW50VGltZSArJz4+Pj4+JysgdGhpcy5nbG9iYWxEYXRhLmJnU291bmQubWFuYWdlci5kdXJhdGlvbik7XG4gICAgfSk7Ki9cbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5iZ1NvdW5kUGxheSgpO1xuICB9XG4gIG9uSGlkZSgpIHtcbiAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLnN0b3AoKTtcbiAgfVxuICBvblVubGF1bmNoKCkge1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLm1hbmFnZXIuc3RvcCgpO1xuICB9XG4gIG9uRXJyb3IoX21zZyl7XG4gICAgY2YubG9nKCfpobXpnaLmiqXplJknKTtcbiAgICBjZi5sb2coX21zZyk7XG4gIH1cbiAgb25QYWdlTm90Rm91bmQoKXtcbiAgICBjZi5sb2coJ+mhtemdouS4jeWtmOWcqCcpO1xuICB9XG4gIGJnU291bmRQbGF5KCkge1xuICAgIGlmICghdGhpcy5nbG9iYWxEYXRhLmJnU291bmQuaXNQbGF5KSB7XG4gICAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5pc1BsYXkgPSB0cnVlO1xuICAgICAgY2YubG9nKCflo7Dpn7MnKTtcbiAgICAgIGNmLmxvZyh0aGlzLmdsb2JhbERhdGEuYmdTb3VuZCk7XG4gICAgICBpZiAodGhpcy5nbG9iYWxEYXRhLmJnU291bmQuY3VycmVudFRpbWUgPT0gMCkge1xuICAgICAgICBjZi5sb2coJ+WjsOmfsy0tLeaSreaUvicpO1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLnRpdGxlID0gXCLlpaXnibnkuYvprYJcIlxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuYmdTb3VuZC5tYW5hZ2VyLnNyYyA9IGNmLmJnU291bmQ7XG4gICAgICAgIC8vdGhpcy5nbG9iYWxEYXRhLmJnU291bmQubWFuYWdlci5zdGFydFRpbWUgPSAyNzBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNmLmxvZygn5aOw6Z+zLS0t57ut5pS+JyArIHRoaXMuZ2xvYmFsRGF0YS5iZ1NvdW5kLm1hbmFnZXIucGF1c2VkKTtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmJnU291bmQubWFuYWdlci5wbGF5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=