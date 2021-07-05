function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = getApp(), t = require("../../utils/api/loginApi.js"), n = require("../../utils/util.js"), o = require("../../utils/jsencrypt.js");

Page({
    data: {
        show_dialog: !1,
        params: {
            old_pwd: "",
            pwd: "",
            new_pwd: ""
        }
    },
    func_xgmm: function(e) {
        var s = this;
        if (s.data.params.old_pwd) if (s.data.params.pwd == s.data.params.new_pwd && s.data.params.pwd) {
            if (s.checkPassword(s.data.params)) {
                wx.showLoading({
                    title: "加载中",
                    mask: !0
                });
                var i = new o.JSEncrypt();
                i.setPublicKey(s.data.public_key);
                i.encrypt(s.data.params.old_pwd), i.encrypt(s.data.params.pwd), i.encrypt(s.data.params.new_pwd);
                n.post(t.change_pwd, s.data.params).then(function(e) {
                    wx.hideLoading(), s.setData({
                        show_dialog: !0
                    }), a.globalData.isLogin = !1, setTimeout(function() {
                        wx.reLaunch({
                            url: "/pages/login/login"
                        });
                    }, 1e3);
                }).catch(function(e) {
                    wx.hideLoading(), wx.showToast({
                        title: e,
                        icon: "none"
                    });
                });
            }
        } else wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "确认密码必须于新密码保持一致且密码不能为空！"
        }); else wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "请填写旧密码！"
        });
    },
    funcOldPassword: function(a) {
        this.setData(e({}, "params.old_pwd", a.detail.value));
    },
    funcPassword: function(a) {
        this.setData(e({}, "params.pwd", a.detail.value));
    },
    funcNewPassword: function(a) {
        this.setData(e({}, "params.new_pwd", a.detail.value));
    },
    checkPassword: function(e) {
        var a = n.regexConfig().reg, t = n.regexConfig().reg1, o = n.regexConfig().reg2, s = n.regexConfig().reg3;
        return !!(a.test(e.pwd) && t.test(e.pwd) && o.test(e.pwd) && s.test(e.pwd)) || (wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "密码必须包含字母、数字及特殊符号,并且至少8位"
        }), !1);
    },
    get_public_key: function() {
        var e = this;
        wx.request({
            url: t.get_public_key,
            data: {},
            method: "POST",
            header: {},
            success: function(a) {
                "request:ok" == a.errMsg ? e.setData({
                    public_key: a.data
                }) : wx.showToast({
                    title: a.errMsg,
                    icon: "none"
                });
            }
        });
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