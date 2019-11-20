const goPage = (page, param, ptype) => {
    let strParam = ""
    for (let o in param || {}) {
        strParam += o + '=' + param[o] + '&'
    }
    strParam = strParam.length > 0 ? ('?' + strParam.substring(0, strParam.length - 1)) : "";
    page = page + strParam;
    switch (ptype) {
        case 1:
            wx.switchTab({
                url: page
            })
            break;
        case 2:
            wx.redirectTo({
                url: page
            })
            break;
        case 3:
            wx.reLaunch({
                url: page
            })
            break;
        default:
            wx.navigateTo({
                url: page
            })
            break;
    }
}
const goPageBack = (step) => {
    step = step || 1;
    wx.navigateBack({
        delta: step
    })
}
const setStorageSync = (key, value) => {
    if (key) {
        wx.setStorageSync(key, value ? JSON.stringify(value) : '');
    }
}
const getStorageSync = (key, vType) => {
    var value = wx.getStorageSync(key);
    if (value) {
        value = JSON.parse(value);
    }
    else if (vType == 1) {
        value = [];
    }
    return value;
}
const strTrim = str => {
    str = str ? (str + "") : "";
    if (str) {
        return str.replace(/\s+/g, "");
    } else {
        return "";
    }
}
const checkMobile = num => {
    num = num + '';
    if (num.length == 0) {
        return false;
    }
    if (num.length != 11) {
        return false;
    }

    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(num)) {
        return false;
    }
    return true;
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const formatTime = (date, split, timetype) => {
    let time = "";
    if (!date) return time;
    date = new Date(date);
    split = split || '-';
    timetype = timetype || 0;
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    switch (timetype) {
        case 0:
            time = [year, month, day].map(formatNumber).join(split) + ' ' + [hour, minute, second].map(formatNumber).join(':')
            break;
        case 1:
            time = [year, month, day].map(formatNumber).join(split)
            break;
        case 2:
            time = [hour, minute, second].map(formatNumber).join(':')
            break;
    }
    return time
}
export default {
    goPage,
    goPageBack,
    setStorageSync,
    getStorageSync,
    strTrim,
    checkMobile,
    formatTime
}