function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp(), e = require("../../utils/util.js"), n = require("../../utils/api/healthCardApi.js");

Page({
    data: {
        base_info: {},
        params: {
            zzcn: !0
        },
        radioArr: [ {
            value: "进",
            name: "进",
            checked: !1
        }, {
            value: "出",
            name: "出",
            checked: !1
        } ],
        form: {
            ddmc: ""
        },
        flags: !1,
        navbarData: {
            title: "通行登记",
            bgcolor: "",
            color: "#ffffff",
            showCapsule: !0,
            share: !0
        },
        statusBarHeight: t.globalData.statusBarHeight,
        screenHeight: ""
    },
    radioChange: function(t) {
        for (var e, n = this.data.radioArr, o = 0, i = n.length; o < i; ++o) n[o].checked = n[o].value === t.detail.value;
        this.setData((e = {}, a(e, "form.fx", t.detail.value), a(e, "items", n), e));
    },
    zzcnChange: function(t) {
        this.setData(a({}, "params.zzcn", !this.data.params.zzcn));
    },
    get_location_info: function(a) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var t = this, o = {
            ddid: a
        };
        e.post(n.get_location_info, o).then(function(a) {
            wx.hideLoading(), t.setData({
                form: a.data
            });
        }).catch(function(a) {
            wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack();
            }, 500);
        });
    },
    funcTJ: function() {
        var a = this;
        if (a.data.flags) wx.showToast({
            title: "请重新扫码！",
            icon: "none"
        }); else if (a.setData({
            flags: !0
        }), a.data.params.zzcn) {
            var o = a.data.form;
            o.yhm = a.data.base_info.yhm, o.yhlx = t.globalData.yhlx, e.post(n.add_sweep_record, o).then(function(a) {
                wx.navigateTo({
                    url: "/pages/healthCard/credentials?ddmc=" + a.data.ddmc + "&smsj=" + a.data.smsj + "&txzt=" + a.data.txzt + "&fx=" + a.data.fx
                });
            }).catch(function(t) {
                wx.hideLoading(), a.setData({
                    flags: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        } else wx.showToast({
            title: "请仔细阅读并勾选申报所列事项！",
            icon: "none"
        }), a.setData({
            flags: !1
        });
    },
    onLoad: function(e) {
        var n = this;
        n.setData({
            user_info: t.globalData.userInfo,
            yhlx: t.globalData.yhlx,
            base_info: wx.getStorageSync("base_info")
        }), wx.getSystemInfo({
            success: function(a) {
                t.globalData.statusBarHeight = a.statusBarHeight, n.setData({
                    screenHeight: a.screenHeight
                });
            }
        }), "student" == t.globalData.yhlx ? n.setData(a({}, "navbarData.bgcolor", "#4293F4")) : "teacher" == t.globalData.yhlx || "thirdparty" == t.globalData.yhlx ? n.setData(a({}, "navbarData.bgcolor", "#47b16f")) : n.setData(a({}, "navbarData.bgcolor", "#8667E8")), 
        n.get_location_info(e.ddid);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});