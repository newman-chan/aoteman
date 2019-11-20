import wepy from 'wepy'
import md5 from 'js-md5';
import cf from '../config'
import ut from '../util/Util.js'

export default class Auth extends wepy.mixin {
    data = {
        mixin: '登录'
    }
    methods = {

    }
    isLogin () {
        let _self = this;
        return new Promise((resolve, reject) => {
            wx.showLoading({ mask: true, title: "验证中" });
            _self.wxLogin(res => {
                wx.hideLoading();
                resolve(res);
            });
        });
    }
    wxLogin (_callback, _reset) {
        let _self = this;
        let _atmLogin = ut.getStorageSync('atm_login');
        let _curTime = parseInt(new Date().getTime() / 1000);

        cf.log(_curTime)
        cf.log(_atmLogin.expired_at)
        cf.log(_atmLogin.expired_at - _curTime)
        cf.log(ut.formatTime(_curTime * 1000))
        cf.log(ut.formatTime(_atmLogin.expired_at * 1000))
        cf.log("开始登录");
        if (_atmLogin && _atmLogin.token && _curTime < _atmLogin.expired_at && _reset != 1) {
            cf.log("本地登录");
            cf.log(_atmLogin);
            _self.$parent.globalData.login = _atmLogin;
            let obj = { code: 0, message: "已登录了" };
            _callback && _callback(obj)
        }
        else {
            wx.login({
                success: res => {
                    cf.log("CODE " + res.code)
                    if (res.code) {
                        let _userInfo = ut.getStorageSync('atm_userInfo')
                        cf.log(_userInfo)
                        let timeStamp = parseInt(new Date().getTime() / 1000);
                        if (_userInfo && timeStamp - parseInt(_userInfo.timeStamp) <= 30 * 86400) {
                            cf.log(timeStamp - parseInt(_userInfo.timeStamp))
                            _self.$parent.globalData.userInfo = _userInfo;
                            _self.userLogin(res.code, _callback);
                        } else {
                            cf.log('授权')
                            _self.getWxUserInfo(res.code, _callback);
                        }
                    }
                    else {
                        let obj = { code: 404, message: "登录失败" };
                        _callback && _callback(obj)
                    }
                },
                fail: function (e) {
                    let obj = { code: 404, message: "链接失败" };
                    _callback && _callback(obj)
                }
            })
        }
    }
    getWxUserInfo (code, _callback) {
        let _self = this;
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        lang: 'zh_CN',
                        success: (res) => {
                            _self.$parent.globalData.userInfo = res.userInfo;
                            _self.userLogin(code, _callback);
                        },
                        fail: (res) => {
                            wx.hideLoading();
                            _self.$invoke('AuthAlert', 'alertShow', code, _callback);
                        }
                    })
                } else {
                    wx.hideLoading();
                    _self.$invoke('AuthAlert', 'alertShow', code, _callback);
                }
            },
            fail: (res) => {
                wx.hideLoading();
                _self.$invoke('AuthAlert', 'alertShow', code, _callback);
            }
        })
    }
    userLogin (code, _callback) {
        let _self = this;
        let userInfo = _self.$parent.globalData.userInfo || { nickname: "cC", avatar_url: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoz6Cm1iaEZJqGOUYKXURYdAZy5sZlmAwBiaiba7dfo2s4rA7yqOxEbSp8XnkyIJuaeibav9Ws6RjRw8Q/132", gender: 1, city: "", province: "", country: "China", language: "zh_CN" };
        let timeStamp = parseInt(new Date().getTime() / 1000);
        let str = "code=" + code + "&request_ts=" + timeStamp;
        // 只有本地获取的用户，才存在时间戳
        if (!userInfo.timeStamp) {
            cf.log('重置用户信息')
            userInfo.timeStamp = timeStamp
            ut.setStorageSync('atm_userInfo', userInfo)
        }

        let params = {
            code: code,
            nickname: userInfo.nickName,
            avatar_url: userInfo.avatarUrl,
            gender: userInfo.gender,
            city: userInfo.city,
            province: userInfo.province,
            country: userInfo.country,
            language: userInfo.language,
            request_ts: timeStamp,
            sign: md5(md5(str) + cf.signKey),
            debug: 1
        }
        _self.wxRequest("auth/login", res => {
            cf.log("登录");
            if (res.code == 0) {
                _self.$parent.globalData.login = res.data.token;
                ut.setStorageSync('atm_login', res.data.token);
            }
            _callback && _callback(res);
        }, params, 1)
    }
}
