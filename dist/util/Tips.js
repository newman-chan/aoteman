"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 提示与加载工具类
 */

var Tips = function () {
  function Tips() {
    _classCallCheck(this, Tips);

    this.isLoading = false;
  }
  /**
   * 弹出提示框
   */

  _createClass(Tips, null, [{
    key: "success",
    value: function success(title) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      setTimeout(function () {
        wx.showToast({
          title: title,
          icon: "success",
          mask: true,
          duration: duration
        });
      }, 300);
      if (duration > 0) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve();
          }, duration);
        });
      }
    }

    /**
     * 弹出确认窗口
     */

  }, {
    key: "confirm",
    value: function confirm(text, fn) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "提示";

      return new Promise(function (resolve, reject) {
        wx.showModal({
          title: title,
          content: text,
          showCancel: true,
          success: function success(res) {
            if (res.confirm) {
              fn();
            } else if (res.cancel) {}
          },
          fail: function fail(res) {}
        });
      });
    }
  }, {
    key: "toast",
    value: function toast(title, onHide) {
      var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "none";

      title = Object.prototype.toString.call(title) == '[object Array]' ? title.toString() : title;
      setTimeout(function () {
        wx.showToast({
          title: title,
          icon: icon,
          mask: true,
          duration: 2000
        });
      }, 300);

      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
     * 警告框
     */

  }, {
    key: "alert",
    value: function alert(title) {
      wx.showToast({
        title: title,
        image: "../images/alert.png",
        mask: true,
        duration: 1500
      });
    }

    /**
     * 错误框
     */

  }, {
    key: "error",
    value: function error(title, onHide) {
      wx.showToast({
        title: title,
        image: "../images/error.png",
        mask: true,
        duration: 500
      });
      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
     * 弹出加载提示
     */

  }, {
    key: "loading",
    value: function loading() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";

      if (Tips.isLoading) {
        return;
      }
      Tips.isLoading = true;
      wx.showLoading({
        title: title,
        mask: true
      });
    }

    /**
     * 加载完毕
     */

  }, {
    key: "loaded",
    value: function loaded() {
      if (Tips.isLoading) {
        Tips.isLoading = false;
        wx.hideLoading();
      }
    }
  }, {
    key: "share",
    value: function share(title, url, desc) {
      return {
        title: title,
        path: url,
        desc: desc,
        success: function success(res) {
          Tips.toast("分享成功");
        }
      };
    }
  }]);

  return Tips;
}();

/**
 * 静态变量，是否加载中
 */


exports.default = Tips;
Tips.isLoading = false;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpcHMuanMiXSwibmFtZXMiOlsiVGlwcyIsImlzTG9hZGluZyIsInRpdGxlIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0Iiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidGV4dCIsImZuIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhbmNlbCIsImZhaWwiLCJvbkhpZGUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpbWFnZSIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJ1cmwiLCJkZXNjIiwicGF0aCIsInRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLEk7QUFDbkIsa0JBQWM7QUFBQTs7QUFDWixTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7QUFDRDs7Ozs7OzRCQUllQyxLLEVBQXVCO0FBQUEsVUFBaEJDLFFBQWdCLHVFQUFMLEdBQUs7O0FBQ3BDQyxpQkFBVyxZQUFNO0FBQ2ZDLFdBQUdDLFNBQUgsQ0FBYTtBQUNYSixpQkFBT0EsS0FESTtBQUVYSyxnQkFBTSxTQUZLO0FBR1hDLGdCQUFNLElBSEs7QUFJWEwsb0JBQVVBO0FBSkMsU0FBYjtBQU1ELE9BUEQsRUFPRyxHQVBIO0FBUUEsVUFBSUEsV0FBVyxDQUFmLEVBQWtCO0FBQ2hCLGVBQU8sSUFBSU0sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q1AscUJBQVcsWUFBTTtBQUNmTTtBQUNELFdBRkQsRUFFR1AsUUFGSDtBQUdELFNBSk0sQ0FBUDtBQUtEO0FBQ0Y7O0FBRUQ7Ozs7Ozs0QkFHZVMsSSxFQUFNQyxFLEVBQWtCO0FBQUEsVUFBZFgsS0FBYyx1RUFBTixJQUFNOztBQUNyQyxhQUFPLElBQUlPLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENOLFdBQUdTLFNBQUgsQ0FBYTtBQUNYWixpQkFBT0EsS0FESTtBQUVYYSxtQkFBU0gsSUFGRTtBQUdYSSxzQkFBWSxJQUhEO0FBSVhDLG1CQUFTLHNCQUFPO0FBQ2QsZ0JBQUlDLElBQUlDLE9BQVIsRUFBaUI7QUFDZk47QUFDRCxhQUZELE1BRU8sSUFBSUssSUFBSUUsTUFBUixFQUFnQixDQUV0QjtBQUNGLFdBVlU7QUFXWEMsZ0JBQU0sbUJBQU8sQ0FFWjtBQWJVLFNBQWI7QUFlRCxPQWhCTSxDQUFQO0FBaUJEOzs7MEJBRVluQixLLEVBQU9vQixNLEVBQXVCO0FBQUEsVUFBZmYsSUFBZSx1RUFBUixNQUFROztBQUN6Q0wsY0FBUXFCLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQnhCLEtBQS9CLEtBQXVDLGdCQUF2QyxHQUEwREEsTUFBTXVCLFFBQU4sRUFBMUQsR0FBNkV2QixLQUFyRjtBQUNBRSxpQkFBVyxZQUFNO0FBQ2ZDLFdBQUdDLFNBQUgsQ0FBYTtBQUNYSixpQkFBT0EsS0FESTtBQUVYSyxnQkFBTUEsSUFGSztBQUdYQyxnQkFBTSxJQUhLO0FBSVhMLG9CQUFVO0FBSkMsU0FBYjtBQU1ELE9BUEQsRUFPRyxHQVBIOztBQVNBO0FBQ0EsVUFBSW1CLE1BQUosRUFBWTtBQUNWbEIsbUJBQVcsWUFBTTtBQUNma0I7QUFDRCxTQUZELEVBRUcsR0FGSDtBQUdEO0FBQ0Y7O0FBRUQ7Ozs7OzswQkFHYXBCLEssRUFBTztBQUNsQkcsU0FBR0MsU0FBSCxDQUFhO0FBQ1hKLGVBQU9BLEtBREk7QUFFWHlCLGVBQU8scUJBRkk7QUFHWG5CLGNBQU0sSUFISztBQUlYTCxrQkFBVTtBQUpDLE9BQWI7QUFNRDs7QUFFRDs7Ozs7OzBCQUlhRCxLLEVBQU9vQixNLEVBQVE7QUFDMUJqQixTQUFHQyxTQUFILENBQWE7QUFDWEosZUFBT0EsS0FESTtBQUVYeUIsZUFBTyxxQkFGSTtBQUdYbkIsY0FBTSxJQUhLO0FBSVhMLGtCQUFVO0FBSkMsT0FBYjtBQU1BO0FBQ0EsVUFBSW1CLE1BQUosRUFBWTtBQUNWbEIsbUJBQVcsWUFBTTtBQUNma0I7QUFDRCxTQUZELEVBRUcsR0FGSDtBQUdEO0FBQ0Y7O0FBRUQ7Ozs7Ozs4QkFHOEI7QUFBQSxVQUFmcEIsS0FBZSx1RUFBUCxLQUFPOztBQUM1QixVQUFJRixLQUFLQyxTQUFULEVBQW9CO0FBQ2xCO0FBQ0Q7QUFDREQsV0FBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBSSxTQUFHdUIsV0FBSCxDQUFlO0FBQ2IxQixlQUFPQSxLQURNO0FBRWJNLGNBQU07QUFGTyxPQUFmO0FBSUQ7O0FBRUQ7Ozs7Ozs2QkFHZ0I7QUFDZCxVQUFJUixLQUFLQyxTQUFULEVBQW9CO0FBQ2xCRCxhQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0FJLFdBQUd3QixXQUFIO0FBQ0Q7QUFDRjs7OzBCQUVZM0IsSyxFQUFPNEIsRyxFQUFLQyxJLEVBQU07QUFDN0IsYUFBTztBQUNMN0IsZUFBT0EsS0FERjtBQUVMOEIsY0FBTUYsR0FGRDtBQUdMQyxjQUFNQSxJQUhEO0FBSUxkLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJsQixlQUFLaUMsS0FBTCxDQUFXLE1BQVg7QUFDRDtBQU5JLE9BQVA7QUFRRDs7Ozs7O0FBR0g7Ozs7O2tCQXZJcUJqQyxJO0FBMElyQkEsS0FBS0MsU0FBTCxHQUFpQixLQUFqQiIsImZpbGUiOiJUaXBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaPkOekuuS4juWKoOi9veW3peWFt+exu1xyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpcHMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5by55Ye65o+Q56S65qGGXHJcbiAgICovXHJcblxyXG4gIHN0YXRpYyBzdWNjZXNzKHRpdGxlLCBkdXJhdGlvbiA9IDUwMCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIGljb246IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMzAwKTtcclxuICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5by55Ye656Gu6K6k56qX5Y+jXHJcbiAgICovXHJcbiAgc3RhdGljIGNvbmZpcm0odGV4dCwgZm4sIHRpdGxlID0gXCLmj5DnpLpcIikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgY29udGVudDogdGV4dCxcclxuICAgICAgICBzaG93Q2FuY2VsOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgZm4oKVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbDogcmVzID0+IHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRvYXN0KHRpdGxlLCBvbkhpZGUsIGljb24gPSBcIm5vbmVcIikge1xyXG4gICAgdGl0bGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGl0bGUpPT0nW29iamVjdCBBcnJheV0nID8gdGl0bGUudG9TdHJpbmcoKSA6IHRpdGxlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIGljb246IGljb24sXHJcbiAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICB9KTtcclxuICAgIH0sIDMwMCk7XHJcblxyXG4gICAgLy8g6ZqQ6JeP57uT5p2f5Zue6LCDXHJcbiAgICBpZiAob25IaWRlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG9uSGlkZSgpO1xyXG4gICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K2m5ZGK5qGGXHJcbiAgICovXHJcbiAgc3RhdGljIGFsZXJ0KHRpdGxlKSB7XHJcbiAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIGltYWdlOiBcIi4uL2ltYWdlcy9hbGVydC5wbmdcIixcclxuICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6ZSZ6K+v5qGGXHJcbiAgICovXHJcblxyXG4gIHN0YXRpYyBlcnJvcih0aXRsZSwgb25IaWRlKSB7XHJcbiAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIGltYWdlOiBcIi4uL2ltYWdlcy9lcnJvci5wbmdcIixcclxuICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgfSk7XHJcbiAgICAvLyDpmpDol4/nu5PmnZ/lm57osINcclxuICAgIGlmIChvbkhpZGUpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgb25IaWRlKCk7XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlvLnlh7rliqDovb3mj5DnpLpcclxuICAgKi9cclxuICBzdGF0aWMgbG9hZGluZyh0aXRsZSA9IFwi5Yqg6L295LitXCIpIHtcclxuICAgIGlmIChUaXBzLmlzTG9hZGluZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBUaXBzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgbWFzazogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliqDovb3lrozmr5VcclxuICAgKi9cclxuICBzdGF0aWMgbG9hZGVkKCkge1xyXG4gICAgaWYgKFRpcHMuaXNMb2FkaW5nKSB7XHJcbiAgICAgIFRpcHMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2hhcmUodGl0bGUsIHVybCwgZGVzYykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICBwYXRoOiB1cmwsXHJcbiAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIFRpcHMudG9hc3QoXCLliIbkuqvmiJDlip9cIik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog6Z2Z5oCB5Y+Y6YeP77yM5piv5ZCm5Yqg6L295LitXHJcbiAqL1xyXG5UaXBzLmlzTG9hZGluZyA9IGZhbHNlOyJdfQ==