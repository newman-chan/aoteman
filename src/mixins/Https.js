import wepy from 'wepy'
import cf from '../config'

export default class Https extends wepy.mixin {
  data = {
    mixin: '请求方法',
    hash: {},//是为了记录当前请求链接，避免重复请求
    isloading: false,
    isend: false,
    pageNum: 1,
    pageSize: 6,
    pageTotal: 0,
    list: []
  }
  methods = {

  }
  isDouble(key) {
    let bl = false;
    for (let o in this.hash) {
      if (o == key) {
        bl = true;
        break;
      }
    }
    return bl;
  }
  delHash(key) {
    if (this.hash[key]) delete this.hash[key];
  }
  /**
   * 单次请求
   * @param {*} _url 
   * @param {*} _callback 
   * @param {*} _params 
   * @param {*} _method 
   */
  wxRequest(_url, _callback, _params, _method, _loading) {
    let self = this;
    let _tempUrl = cf.host + _url;
    let _tempParams = _params || {};
    let _tempMethod = _method == 1 ? "POST" : "GET";
    var field0 = _url.substring(0, _url.lastIndexOf("/"));
    field0 = field0.substring(field0.lastIndexOf("/") + 1, field0.length);
    var field1 = _url.substring(_url.lastIndexOf("/") + 1, _url.length);
    let key = field0 + '_' + field1;
    //阻止连续点击
    if (self.isDouble(key)) {
      return;
    }
    else {
      self.hash[key] = _tempParams;
    }

    _tempParams.token = self.$parent.globalData.login.token;

    let log = "————————————————————————————————————————————————————————————\n";
    log += "请求的方法：" + _tempMethod + "\n";
    log += "请求的链接：" + _tempUrl + "\n";
    log += "请求的参数：" + JSON.stringify(_tempParams) + "\n";
    log += "————————————————————————————————————————————————————————————\n";
    if (_loading) wx.showLoading({ mask: true });
    wx.request({
      url: _tempUrl,
      data: _tempParams,
      method: _tempMethod,
      header: {
        'content-type': (_tempMethod == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded')
      },
      success: (res) => {
        wx.hideLoading();
        cf.log(res);
        if (res.statusCode != 200 || res.data.code == undefined) {
          res.data = {
            code: res.statusCode,
            msg: "接口异常"
          }
        }

        log += JSON.stringify(res.data);
        log += "\n————————————————————————————————————————————————————————————\n";
        cf.log(log);

        self.delHash(key);
        if (res.data.code == 5001) {
          res.data.msg = '加载中'
          cf.log("去登录" + self.$parent.globalData.isLogin)
          if (!self.$parent.globalData.isLogin) {
            self.$parent.globalData.isLogin = true;
            wx.showLoading({ mask: true,title:"验证中" });
            self.wxLogin(r=>{
              wx.hideLoading();
              self.$parent.globalData.isLogin = false;
              self.onShow();
            },1)
          }
        }
        _callback && _callback(res.data);
      },
      fail: (res) => {
        wx.hideLoading();
        cf.log(res);
        cf.log('\n');
        var obj = {
          code: 404,
          msg: "网络异常"
        }
        log += JSON.stringify(res.data);
        log += "\n————————————————————————————————————————————————————————————\n";
        cf.log(log);

        self.delHash(key);
        _callback && _callback(obj);
      }
    })
  }
  /**
   * 多页请求
   */
  wxRequests(_init, _url, _callback, _params, _method, _loading) {
    let self = this;
    if (_init) {
      self.isloading = false;
      self.isend = false;
      self.pageNum = 1;
      self.pageSize = Math.max(_init,self.pageSize);
      self.list = [];
    }

    if (self.isend) return;
    if (self.isloading) return;
    self.isloading = true;

    _params = _params || {};
    _params.page = self.pageNum;
    _params.page_size = self.pageSize;
    self.wxRequest(_url, res => {
      res.data = res.data || {};
      self.isloading = false;
      self.isend = self.pageNum * self.pageSize >= res.data.total ? true : false;
      self.pageNum++;
      self.pageTotal = res.data.total || 0;
      _callback && _callback(res);
    }, _params, _method, _loading);
  }
}
