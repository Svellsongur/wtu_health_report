function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e) {
    var a = e.data.seconds;
    a <= 0 || setTimeout(function() {
        e.setData({
            seconds: a - 1
        }), t(e);
    }, 1e3);
}

getApp();

var a = require("../../utils/api/loginApi.js"), n = require("../../utils/util.js"), o = require("../../utils/jsencrypt.js");

Page({
    data: {
        codeText: "获取验证码",
        params: {
            telephone: "",
            code: "",
            pwd: "",
            new_pwd: ""
        },
        seconds: 0,
        public_key: null
    },
    changeInput: function(t) {
        var a = t.currentTarget.dataset.key, n = t.detail.value, o = "params." + a;
        this.setData(e({}, o, n));
    },
    getCode: function(e) {
        if (this.data.params.telephone) {
            if (0 == this.data.seconds) {
                var n = this;
                wx.request({
                    url: a.send_sms_captcha,
                    data: {
                        telephone: n.data.params.telephone
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        "0x00000000" == e.data.errorCode ? (wx.showToast({
                            title: e.data.message,
                            icon: "none"
                        }), n.setData({
                            seconds: 60
                        }), t(n)) : (n.setData({
                            seconds: 0
                        }), wx.showToast({
                            title: e.data.message,
                            icon: "none"
                        }));
                    }
                });
            }
        } else wx.showToast({
            title: "请输入手机号码",
            icon: "none"
        });
    },
    get_public_key: function() {
        var e = this;
        wx.request({
            url: a.get_public_key,
            data: {},
            method: "POST",
            header: {},
            success: function(t) {
                "request:ok" == t.errMsg ? e.setData({
                    public_key: t.data
                }) : wx.showToast({
                    title: t.errMsg,
                    icon: "none"
                });
            }
        });
    },
    funcChangePwd: function() {
        var e = this;
        if (e.data.params.pwd && e.data.params.new_pwd && e.data.params.code && e.data.params.telephone) if (e.data.params.pwd == e.data.params.new_pwd) {
            if (e.checkPassword(e.data.params)) {
                var t = new o.JSEncrypt();
                t.setPublicKey(e.data.public_key);
                var n = t.encrypt(e.data.params.pwd), s = t.encrypt(e.data.params.new_pwd), r = {
                    pwd: n,
                    telephone: e.data.params.telephone,
                    code: e.data.params.code,
                    new_pwd: s
                };
                wx.request({
                    url: a.reset_pwd,
                    data: r,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        "0x00000000" == e.data.errorCode ? (wx.showToast({
                            title: e.data.message,
                            icon: "none"
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "/pages/login/login"
                            });
                        }, 1e3)) : wx.showToast({
                            title: e.data.message,
                            icon: "none"
                        });
                    }
                });
            }
        } else wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "新密码必须保持一致！"
        }); else wx.showToast({
            title: "请填写完整信息!",
            icon: "none"
        });
    },
    checkPassword: function(e) {
        var t = n.regexConfig().reg, a = n.regexConfig().reg1, o = n.regexConfig().reg2, s = n.regexConfig().reg3;
        return !!(t.test(e.pwd) && a.test(e.pwd) && o.test(e.pwd) && s.test(e.pwd)) || (wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "密码必须包含字母、数字及特殊符号,并且至少8位"
        }), !1);
    },
    onLoad: function(e) {
        this.get_public_key();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});