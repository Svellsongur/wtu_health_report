function a(a, t, o) {
    return t in a ? Object.defineProperty(a, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = o, a;
}

var t = getApp();

require("../../utils/util.js"), require("../../utils/api/healthCardApi.js");

Page({
    data: {
        form: {
            ddmc: "",
            smsj: "",
            fx: ""
        },
        state: "error",
        flags: !1,
        navbarData: {
            title: "通行凭证",
            bgcolor: "",
            color: "#ffffff",
            showCapsule: !0,
            share: !0,
            back: 2
        },
        statusBarHeight: t.globalData.statusBarHeight
    },
    onLoad: function(o) {
        var e;
        this.setData((e = {}, a(e, "form.ddmc", o.ddmc), a(e, "form.smsj", o.smsj), a(e, "form.fx", o.fx), 
        a(e, "state", "禁止通行" == o.txzt ? "error" : "success"), a(e, "user_info", t.globalData.userInfo), 
        a(e, "yhlx", t.globalData.yhlx), a(e, "base_info", wx.getStorageSync("base_info")), 
        e)), wx.getSystemInfo({
            success: function(a) {
                t.globalData.statusBarHeight = a.statusBarHeight;
            }
        }), "student" == t.globalData.yhlx ? this.setData(a({}, "navbarData.bgcolor", "#4293F4")) : "teacher" == t.globalData.yhlx || "thirdparty" == t.globalData.yhlx ? this.setData(a({}, "navbarData.bgcolor", "#47b16f")) : this.setData(a({}, "navbarData.bgcolor", "#8667E8"));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});