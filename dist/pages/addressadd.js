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
      navigationBarTitleText: ''
    }, _this.mixins = [_Https2.default, _Auth2.default], _this.data = {
      isEdit: 0,
      multiTxt: '',
      multiArray: [[], [], []],
      multiIndex: [0, 0, 0],
      entity: {
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
      bindinput: function bindinput(_field, _event) {
        this.entity[_field] = _event.detail.value;
      },
      clickConfirm: function clickConfirm() {
        var self = this;
        _config2.default.log(self.entity);
        if (!_Util2.default.strTrim(self.entity.name)) {
          _Tips2.default.toast('收货人不能为空');
        } else if (!_Util2.default.checkMobile(self.entity.mobile)) {
          _Tips2.default.toast('联系方式格式不对');
        } else if (!_Util2.default.strTrim(self.entity.province_name)) {
          _Tips2.default.toast('地区不能为空');
        } else if (!_Util2.default.strTrim(self.entity.address)) {
          _Tips2.default.toast('地址不能为空');
        } else {
          self.wxRequests(1, self.isEdit == 1 ? '/address/add' : 'address/edit', function (res) {
            _config2.default.log(res);
            if (res.code == 0) {
              _Tips2.default.toast(self.isEdit == 1 ? '添加成功' : '编辑成功', function () {
                _Util2.default.setStorageSync('addressadd', self.entity);
                _Util2.default.goPageBack(-1);
              });
            } else {
              _Tips2.default.toast(res.msg);
            }
          }, self.entity, 1);
        }
      },

      bindMultiPickerChange: function bindMultiPickerChange(e) {
        var _multiIndexAr = e.detail.value;
        var _provinceAr = this.multiArray[0];
        var _cityAr = this.multiArray[1];
        var _areaAr = this.multiArray[2];

        this.entity.province_id = _provinceAr.length ? _provinceAr[_multiIndexAr[0]].id : '';
        this.entity.province_name = _provinceAr.length ? _provinceAr[_multiIndexAr[0]].name : '';
        this.entity.city_id = _cityAr.length ? _cityAr[_multiIndexAr[1]].id : '';
        this.entity.city_name = _cityAr.length ? _cityAr[_multiIndexAr[1]].name : '';
        this.entity.area_id = _areaAr.length ? _areaAr[_multiIndexAr[2]].id : '';
        this.entity.area_name = _areaAr.length ? _areaAr[_multiIndexAr[2]].name : '';
      },
      bindMultiPickerColumnChange: function bindMultiPickerColumnChange(e) {
        this.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
          case 0:
            //省
            this.getCity(this.multiArray[e.detail.column][e.detail.value].id);
            break;
          case 1:
            //市
            this.getArea(this.multiArray[e.detail.column][e.detail.value].id);
            break;
          case 2:
            //区
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
    key: 'getProvince',
    value: function getProvince() {
      var _this2 = this;

      this.wxRequest('region/getList', function (res) {
        if (res.code == 0) {
          _this2.multiArray[0] = res.data;
          _this2.multiIndex[0] = 0;
          _this2.multiArray[1] = [];
          _this2.multiIndex[1] = 0;
          _this2.multiArray[2] = [];
          _this2.multiIndex[2] = 0;
          if (res.data.length > 0) {
            _this2.getCity(_this2.multiArray[0][0].id);
          } else {
            _this2.$apply();
          }
        }
      }, { parent_id: 0 }, 1);
    }
  }, {
    key: 'getCity',
    value: function getCity(_id) {
      var _this3 = this;

      this.wxRequest('region/getList', function (res) {
        if (res.code == 0) {
          _this3.multiArray[1] = res.data;
          _this3.multiIndex[1] = 0;
          _this3.multiArray[2] = [];
          _this3.multiIndex[2] = 0;
          if (res.data.length > 0) {
            _this3.getArea(_this3.multiArray[1][0].id);
          } else {
            _this3.$apply();
          }
        }
      }, { parent_id: _id }, 1);
    }
  }, {
    key: 'getArea',
    value: function getArea(_id) {
      var _this4 = this;

      this.wxRequest('region/getList', function (res) {
        if (res.code == 0) {
          _this4.multiArray[2] = res.data;
          _this4.multiIndex[2] = 0;
          _this4.$apply();
        }
      }, { parent_id: _id }, 1);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(_opt) {
      this.isEdit = _opt.isEdit;
      _config2.default.log('isEdit' + this.isEdit);
      wx.setNavigationBarTitle({
        title: this.isEdit == 1 ? '新增地址' : this.isEdit == 2 ? '编辑地址' : '地址详情'
      });
      var _entity = _Util2.default.getStorageSync('addressadd');
      _config2.default.log('地址');
      _config2.default.log(_entity);
      if (_entity) {
        this.entity = _entity;
      }
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.isEdit) {
        this.getProvince();
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/addressadd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3NhZGQuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiZGF0YSIsImlzRWRpdCIsIm11bHRpVHh0IiwibXVsdGlBcnJheSIsIm11bHRpSW5kZXgiLCJlbnRpdHkiLCJpZCIsInVzZXJfaWQiLCJpc19kZWZhdWx0IiwibmFtZSIsIm1vYmlsZSIsInByb3ZpbmNlX2lkIiwiY2l0eV9pZCIsImFyZWFfaWQiLCJhZGRyZXNzIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJwcm92aW5jZV9uYW1lIiwiY2l0eV9uYW1lIiwiYXJlYV9uYW1lIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQXV0aEFsZXJ0IiwibWV0aG9kcyIsImJpbmRpbnB1dCIsIl9maWVsZCIsIl9ldmVudCIsImRldGFpbCIsInZhbHVlIiwiY2xpY2tDb25maXJtIiwic2VsZiIsImxvZyIsInN0clRyaW0iLCJ0b2FzdCIsImNoZWNrTW9iaWxlIiwid3hSZXF1ZXN0cyIsInJlcyIsImNvZGUiLCJzZXRTdG9yYWdlU3luYyIsImdvUGFnZUJhY2siLCJtc2ciLCJiaW5kTXVsdGlQaWNrZXJDaGFuZ2UiLCJlIiwiX211bHRpSW5kZXhBciIsIl9wcm92aW5jZUFyIiwiX2NpdHlBciIsIl9hcmVhQXIiLCJsZW5ndGgiLCJiaW5kTXVsdGlQaWNrZXJDb2x1bW5DaGFuZ2UiLCJjb2x1bW4iLCJnZXRDaXR5IiwiZ2V0QXJlYSIsImF1dGhGbiIsIl9fcmVzIiwiX19jb2RlIiwiX19jYWxsYmFjayIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2VyTG9naW4iLCIkaW52b2tlIiwid3hSZXF1ZXN0IiwiJGFwcGx5IiwicGFyZW50X2lkIiwiX2lkIiwiX29wdCIsInd4Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwidGl0bGUiLCJfZW50aXR5IiwiZ2V0U3RvcmFnZVN5bmMi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SUFBWSxDQUFoQixFQUFtQjtBQUNqQixpQkFBS3BDLFVBQUwsQ0FBZ0IsQ0FBaEIsSUFBcUJtQyxJQUFJdEMsSUFBekI7QUFDQSxpQkFBS0ksVUFBTCxDQUFnQixDQUFoQixJQUFxQixDQUFyQjtBQUNBLGlCQUFLNEQsTUFBTDtBQUNEO0FBQ0YsT0FSSCxFQVNFLEVBQUVDLFdBQVdDLEdBQWIsRUFURixFQVVFLENBVkY7QUFZRDs7OzJCQUNNQyxJLEVBQU07QUFDWCxXQUFLbEUsTUFBTCxHQUFja0UsS0FBS2xFLE1BQW5CO0FBQ0EsdUJBQUdnQyxHQUFILENBQU8sV0FBVyxLQUFLaEMsTUFBdkI7QUFDQW1FLFNBQUdDLHFCQUFILENBQXlCO0FBQ3ZCQyxlQUNFLEtBQUtyRSxNQUFMLElBQWUsQ0FBZixHQUNJLE1BREosR0FFSSxLQUFLQSxNQUFMLElBQWUsQ0FBZixHQUFtQixNQUFuQixHQUE0QjtBQUpYLE9BQXpCO0FBTUEsVUFBSXNFLFVBQVUsZUFBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFkO0FBQ0EsdUJBQUd2QyxHQUFILENBQU8sSUFBUDtBQUNBLHVCQUFHQSxHQUFILENBQU9zQyxPQUFQO0FBQ0EsVUFBSUEsT0FBSixFQUFhO0FBQ1gsYUFBS2xFLE1BQUwsR0FBY2tFLE9BQWQ7QUFDRDtBQUNGOzs7NkJBQ1E7QUFDUCxVQUFJLEtBQUt0RSxNQUFULEVBQWlCO0FBQ2YsYUFBS3dFLFdBQUw7QUFDRDtBQUNGOzs7O0VBOUxnQyxlQUFLQyxJOztrQkFBbkI5RSxLIiwiZmlsZSI6ImFkZHJlc3NhZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBjZiBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSAnLi4vbWl4aW5zL0h0dHBzJztcclxuaW1wb3J0IGF1dGggZnJvbSAnLi4vbWl4aW5zL0F1dGgnO1xyXG5pbXBvcnQgdXQgZnJvbSAnLi4vdXRpbC9VdGlsJztcclxuaW1wb3J0IFRpcHMgZnJvbSAnLi4vdXRpbC9UaXBzJztcclxuaW1wb3J0IEF1dGhBbGVydCBmcm9tICcuLi9jb21wb25lbnRzL0F1dGhBbGVydCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJydcclxuICB9O1xyXG4gIG1peGlucyA9IFtodHRwcywgYXV0aF07XHJcbiAgZGF0YSA9IHtcclxuICAgIGlzRWRpdDogMCxcclxuICAgIG11bHRpVHh0OiAnJyxcclxuICAgIG11bHRpQXJyYXk6IFtbXSwgW10sIFtdXSxcclxuICAgIG11bHRpSW5kZXg6IFswLCAwLCAwXSxcclxuICAgIGVudGl0eToge1xyXG4gICAgICBpZDogJycsXHJcbiAgICAgIHVzZXJfaWQ6ICcnLFxyXG4gICAgICBpc19kZWZhdWx0OiAwLFxyXG4gICAgICBuYW1lOiAnJyxcclxuICAgICAgbW9iaWxlOiAnJyxcclxuICAgICAgcHJvdmluY2VfaWQ6ICcnLFxyXG4gICAgICBjaXR5X2lkOiAnJyxcclxuICAgICAgYXJlYV9pZDogJycsXHJcbiAgICAgIGFkZHJlc3M6ICcnLFxyXG4gICAgICBjcmVhdGVkX2F0OiAnJyxcclxuICAgICAgdXBkYXRlZF9hdDogJycsXHJcbiAgICAgIHByb3ZpbmNlX25hbWU6ICcnLFxyXG4gICAgICBjaXR5X25hbWU6ICcnLFxyXG4gICAgICBhcmVhX25hbWU6ICcnXHJcbiAgICB9XHJcbiAgfTtcclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJBdXRoQWxlcnRcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wiQXV0aEFsZXJ0XCI6e1widi1vbjpjaGlsZEZuXCI6XCJhdXRoRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBBdXRoQWxlcnQ6IEF1dGhBbGVydFxyXG4gICAgfTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgYmluZGlucHV0KF9maWVsZCwgX2V2ZW50KSB7XHJcbiAgICAgIHRoaXMuZW50aXR5W19maWVsZF0gPSBfZXZlbnQuZGV0YWlsLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIGNsaWNrQ29uZmlybSgpIHtcclxuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICBjZi5sb2coc2VsZi5lbnRpdHkpO1xyXG4gICAgICBpZiAoIXV0LnN0clRyaW0oc2VsZi5lbnRpdHkubmFtZSkpIHtcclxuICAgICAgICBUaXBzLnRvYXN0KCfmlLbotKfkurrkuI3og73kuLrnqbonKTtcclxuICAgICAgfSBlbHNlIGlmICghdXQuY2hlY2tNb2JpbGUoc2VsZi5lbnRpdHkubW9iaWxlKSkge1xyXG4gICAgICAgIFRpcHMudG9hc3QoJ+iBlOezu+aWueW8j+agvOW8j+S4jeWvuScpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF1dC5zdHJUcmltKHNlbGYuZW50aXR5LnByb3ZpbmNlX25hbWUpKSB7XHJcbiAgICAgICAgVGlwcy50b2FzdCgn5Zyw5Yy65LiN6IO95Li656m6Jyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXV0LnN0clRyaW0oc2VsZi5lbnRpdHkuYWRkcmVzcykpIHtcclxuICAgICAgICBUaXBzLnRvYXN0KCflnLDlnYDkuI3og73kuLrnqbonKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLnd4UmVxdWVzdHMoXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgc2VsZi5pc0VkaXQgPT0gMSA/ICcvYWRkcmVzcy9hZGQnIDogJ2FkZHJlc3MvZWRpdCcsXHJcbiAgICAgICAgICByZXMgPT4ge1xyXG4gICAgICAgICAgICBjZi5sb2cocmVzKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgICAgICBUaXBzLnRvYXN0KHNlbGYuaXNFZGl0ID09IDEgPyAn5re75Yqg5oiQ5YqfJyA6ICfnvJbovpHmiJDlip8nLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB1dC5zZXRTdG9yYWdlU3luYygnYWRkcmVzc2FkZCcsIHNlbGYuZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIHV0LmdvUGFnZUJhY2soLTEpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgVGlwcy50b2FzdChyZXMubXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNlbGYuZW50aXR5LFxyXG4gICAgICAgICAgMVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBiaW5kTXVsdGlQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgbGV0IF9tdWx0aUluZGV4QXIgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgbGV0IF9wcm92aW5jZUFyID0gdGhpcy5tdWx0aUFycmF5WzBdO1xyXG4gICAgICBsZXQgX2NpdHlBciA9IHRoaXMubXVsdGlBcnJheVsxXTtcclxuICAgICAgbGV0IF9hcmVhQXIgPSB0aGlzLm11bHRpQXJyYXlbMl07XHJcblxyXG4gICAgICB0aGlzLmVudGl0eS5wcm92aW5jZV9pZCA9IF9wcm92aW5jZUFyLmxlbmd0aFxyXG4gICAgICAgID8gX3Byb3ZpbmNlQXJbX211bHRpSW5kZXhBclswXV0uaWRcclxuICAgICAgICA6ICcnO1xyXG4gICAgICB0aGlzLmVudGl0eS5wcm92aW5jZV9uYW1lID0gX3Byb3ZpbmNlQXIubGVuZ3RoXHJcbiAgICAgICAgPyBfcHJvdmluY2VBcltfbXVsdGlJbmRleEFyWzBdXS5uYW1lXHJcbiAgICAgICAgOiAnJztcclxuICAgICAgdGhpcy5lbnRpdHkuY2l0eV9pZCA9IF9jaXR5QXIubGVuZ3RoID8gX2NpdHlBcltfbXVsdGlJbmRleEFyWzFdXS5pZCA6ICcnO1xyXG4gICAgICB0aGlzLmVudGl0eS5jaXR5X25hbWUgPSBfY2l0eUFyLmxlbmd0aFxyXG4gICAgICAgID8gX2NpdHlBcltfbXVsdGlJbmRleEFyWzFdXS5uYW1lXHJcbiAgICAgICAgOiAnJztcclxuICAgICAgdGhpcy5lbnRpdHkuYXJlYV9pZCA9IF9hcmVhQXIubGVuZ3RoID8gX2FyZWFBcltfbXVsdGlJbmRleEFyWzJdXS5pZCA6ICcnO1xyXG4gICAgICB0aGlzLmVudGl0eS5hcmVhX25hbWUgPSBfYXJlYUFyLmxlbmd0aFxyXG4gICAgICAgID8gX2FyZWFBcltfbXVsdGlJbmRleEFyWzJdXS5uYW1lXHJcbiAgICAgICAgOiAnJztcclxuICAgIH0sXHJcbiAgICBiaW5kTXVsdGlQaWNrZXJDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdGhpcy5tdWx0aUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgc3dpdGNoIChlLmRldGFpbC5jb2x1bW4pIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAvL+ecgVxyXG4gICAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMubXVsdGlBcnJheVtlLmRldGFpbC5jb2x1bW5dW2UuZGV0YWlsLnZhbHVlXS5pZCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAvL+W4glxyXG4gICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMubXVsdGlBcnJheVtlLmRldGFpbC5jb2x1bW5dW2UuZGV0YWlsLnZhbHVlXS5pZCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAvL+WMulxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgICAgYXV0aEZuIChfX3JlcywgX19jb2RlLCBfX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gX19yZXMuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJMb2dpbihfX2NvZGUsIF9fY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhdXRoQWxlcnRTaG93IChfX2NvZGUsIF9fY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ0F1dGhBbGVydCcsICdhbGVydFNob3cnLCBfX2NvZGUsIF9fY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIGdldFByb3ZpbmNlKCkge1xyXG4gICAgdGhpcy53eFJlcXVlc3QoXHJcbiAgICAgICdyZWdpb24vZ2V0TGlzdCcsXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVswXSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzBdID0gMDtcclxuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVsxXSA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzFdID0gMDtcclxuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVsyXSA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzJdID0gMDtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLm11bHRpQXJyYXlbMF1bMF0uaWQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHsgcGFyZW50X2lkOiAwIH0sXHJcbiAgICAgIDFcclxuICAgICk7XHJcbiAgfVxyXG4gIGdldENpdHkoX2lkKSB7XHJcbiAgICB0aGlzLnd4UmVxdWVzdChcclxuICAgICAgJ3JlZ2lvbi9nZXRMaXN0JyxcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5tdWx0aUFycmF5WzFdID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICB0aGlzLm11bHRpSW5kZXhbMV0gPSAwO1xyXG4gICAgICAgICAgdGhpcy5tdWx0aUFycmF5WzJdID0gW107XHJcbiAgICAgICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSAwO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMubXVsdGlBcnJheVsxXVswXS5pZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgeyBwYXJlbnRfaWQ6IF9pZCB9LFxyXG4gICAgICAxXHJcbiAgICApO1xyXG4gIH1cclxuICBnZXRBcmVhKF9pZCkge1xyXG4gICAgdGhpcy53eFJlcXVlc3QoXHJcbiAgICAgICdyZWdpb24vZ2V0TGlzdCcsXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcclxuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVsyXSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzJdID0gMDtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB7IHBhcmVudF9pZDogX2lkIH0sXHJcbiAgICAgIDFcclxuICAgICk7XHJcbiAgfVxyXG4gIG9uTG9hZChfb3B0KSB7XHJcbiAgICB0aGlzLmlzRWRpdCA9IF9vcHQuaXNFZGl0O1xyXG4gICAgY2YubG9nKCdpc0VkaXQnICsgdGhpcy5pc0VkaXQpO1xyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgdGl0bGU6XHJcbiAgICAgICAgdGhpcy5pc0VkaXQgPT0gMVxyXG4gICAgICAgICAgPyAn5paw5aKe5Zyw5Z2AJ1xyXG4gICAgICAgICAgOiB0aGlzLmlzRWRpdCA9PSAyID8gJ+e8lui+keWcsOWdgCcgOiAn5Zyw5Z2A6K+m5oOFJ1xyXG4gICAgfSk7XHJcbiAgICBsZXQgX2VudGl0eSA9IHV0LmdldFN0b3JhZ2VTeW5jKCdhZGRyZXNzYWRkJyk7XHJcbiAgICBjZi5sb2coJ+WcsOWdgCcpO1xyXG4gICAgY2YubG9nKF9lbnRpdHkpO1xyXG4gICAgaWYgKF9lbnRpdHkpIHtcclxuICAgICAgdGhpcy5lbnRpdHkgPSBfZW50aXR5O1xyXG4gICAgfVxyXG4gIH1cclxuICBvblNob3coKSB7XHJcbiAgICBpZiAodGhpcy5pc0VkaXQpIHtcclxuICAgICAgdGhpcy5nZXRQcm92aW5jZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=