function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

function t(a) {
    a.data.loadtime = setInterval(function() {
        var t = a.data.seconds;
        if (t <= 0) return clearInterval(a.data.loadtime), void a.overdue_card();
        a.setData({
            seconds: t - 1
        });
        var o = a.data.seconds / a.data.total * 100;
        a.setData({
            cost: o
        }), e(a);
    }, 1e3);
}

function e(a) {
    var t = 0, e = 0, n = a.data.seconds;
    n < 60 || (n < 3600 ? (t = parseInt(n / 60), n %= 60) : (t = parseInt(n / 60), n %= 60, 
    e = parseInt(t / 60), t %= 60)), a.setData({
        time: o(e) + ":" + o(t) + ":" + o(n)
    });
}

function o(a) {
    return a < 10 ? "0" + a : a + "";
}

var n = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (a[o] = e[o]);
    }
    return a;
}, s = getApp(), i = require("../../utils/util.js"), r = require("../../utils/api/healthCardApi.js");

Page({
    data: {
        base_info: {
            xqmc: "-",
            ssld: "-",
            ssmc: "-"
        },
        navbarData: {
            title: "纺大畅行码",
            bgcolor: "",
            color: "#ffffff"
        },
        screenHeight: "",
        statusBarHeight: s.globalData.statusBarHeight,
        goto: !0,
        jlctw: "",
        eyes_mode: "open",
        showOneButtonDialog: !1,
        oneButton: [ {
            text: "确定"
        } ],
        loadtime: "",
        seconds: 0,
        time: "00:00:00",
        total: 0,
        cost: 0
    },
    funcSys: function(a) {
        "未返校" == this.data.base_info.jkklx && "visitor" != this.data.yhlx || wx.scanCode({
            complete: function(a) {
                "scanCode:ok" == a.errMsg ? wx.navigateTo({
                    url: "/pages/healthCard/register?ddid=" + a.result
                }) : wx.showToast({
                    title: "二维码识别失败！",
                    icon: "none"
                });
            }
        });
    },
    getUserinfo: function() {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var e = this, o = {
            yhm: s.globalData.yhm,
            yhlx: s.globalData.yhlx,
            jkmwybs: s.globalData.jkmwybs,
            get_card: 1
        };
        i.post(r.get_user_info, o).then(function(o) {
            wx.hideLoading(), wx.stopPullDownRefresh(), wx.setStorageSync("sfbw", o.data.sfbw), 
            s.editTabBar(wx.getStorageSync("sfbw")), s.globalData.jkmwybs = o.data.jkmwybs, 
            s.globalData.xm = o.data.xm, s.globalData.jkklx = o.data.jkklx, s.globalData.telephone = o.data.telephone, 
            s.globalData.bs = o.data.bs, s.globalData.path = s.globalData.ApiRootUrl + o.path + "?" + Date.parse(new Date()), 
            wx.setStorageSync("base_info", o.data), e.setData({
                base_info: o.data,
                seconds: o.data.jkmyxsc,
                total: o.data.total,
                path: s.globalData.path,
                yxq: (o.data.total / 3600).toFixed(2)
            }), clearInterval(e.data.loadtime), o.data.jkmyxsc > 0 && t(a);
        }).catch(function(a) {
            wx.hideLoading(), wx.stopPullDownRefresh(), wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    get_thermometry_report: function() {
        var a = this, t = {
            yhm: s.globalData.yhm
        };
        i.post(r.get_thermometry_report, t).then(function(t) {
            var e = "";
            t.rows.length ? t.rows.forEach(function(a, t) {
                e += 0 == t ? a.mqtw + "°C" : "、" + a.mqtw + "°C";
            }) : e = "暂无数据", a.setData({
                jlctw: e
            });
        }).catch(function(a) {
            wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    overdue_card: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var t = this, e = {
            yhm: s.globalData.yhm,
            yhlx: s.globalData.yhlx,
            jkmdqzt: t.data.base_info.jkmdqzt,
            jkmwybs: s.globalData.jkmwybs,
            jkklx: t.data.base_info.jkklx,
            get_card: 1
        };
        i.post(r.overdue_card, e).then(function(e) {
            var o;
            wx.hideLoading();
            t.setData((o = {}, a(o, "base_info.jkmdqzt", e.jkmdqzt), a(o, "path", s.globalData.ApiRootUrl + e.path + "?" + Date.parse(new Date())), 
            o));
        }).catch(function(a) {
            wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    funcEyesMode: function(a) {
        var t = "open" === this.data.eyes_mode ? "close" : "open";
        this.setData({
            eyes_mode: t
        });
    },
    funcGetAvatar: function() {
        var t = this, e = {
            yhm: s.globalData.yhm,
            yhlx: s.globalData.yhlx
        };
        wx.request({
            url: r.getAvatar,
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: wx.getStorageSync("token")
            },
            data: e,
            responseType: "arraybuffer",
            success: function(e) {
                var o = wx.arrayBufferToBase64(e.data), n = "data:image/png;base64," + o;
                t.setData(a({}, "user_info.avatarUrl", o.length > 0 ? n : "")), o.length > 0 ? s.globalData.userInfo.avatarUrl = n : s.globalData.userInfo.avatarUrl = "";
            },
            fail: function(a) {}
        });
    },
    funcJksb: function() {
        wx.navigateTo({
            url: "/pages/userCenter/jksb"
        });
    },
    funcCwddh: function(a) {
        this.get_addr(), wx.navigateTo({
            url: "cwddh"
        });
    },
    funcSbjkxx: function(a) {
        wx.navigateTo({
            url: "/pages/userCenter/wdbd?form_id=fxsq&bdmc=返校报备"
        });
    },
    tapDialogButton: function(a) {
        this.setData({
            showOneButtonDialog: !1
        });
    },
    funcWhzy: function(a) {
        var t = this;
        this.data.goto && (this.data.goto = !1, wx.navigateToMiniProgram({
            appId: "wx9995d2ac6283d7fa",
            path: "/packages/health-code/pages/report-health/index",
            extraData: "",
            envVersion: "",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {
                t.data.goto = !0;
            }
        }));
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            user_info: s.globalData.userInfo,
            yhlx: s.globalData.yhlx
        }), e.funcGetAvatar(), wx.getSystemInfo({
            success: function(a) {
                s.globalData.statusBarHeight = a.statusBarHeight, e.setData({
                    screenHeight: a.screenHeight
                });
                var t = {
                    yhm: s.globalData.yhm,
                    yhlx: s.globalData.yhlx,
                    jkmwybs: s.globalData.jkmwybs,
                    get_card: 0
                };
                i.post(r.get_user_info, t).then(function(t) {
                    var e = n({
                        phone: t.data.telephone || "",
                        phoneModel: a.brand + "_" + a.model,
                        time: i.formatTime(new Date())
                    }, a);
                    i.post(r.set_phone_info, {
                        data: JSON.stringify(e)
                    }).then(function(a) {}).catch(function(a) {});
                }).catch(function(a) {});
            }
        }), "student" == s.globalData.yhlx ? e.setData(a({}, "navbarData.bgcolor", "#4293F4")) : "teacher" == s.globalData.yhlx || "thirdparty" == s.globalData.yhlx ? e.setData(a({}, "navbarData.bgcolor", "#47b16f")) : e.setData(a({}, "navbarData.bgcolor", "#8667E8"));
    },
    onReady: function() {},
    onShow: function(a) {
        this.setData({
            new_time: !1
        }), this.getUserinfo();
    },
    onHide: function() {
        clearInterval(this.data.loadtime);
    },
    onUnload: function() {
        clearInterval(this.data.loadtime);
    },
    onPullDownRefresh: function() {
        clearInterval(this.data.loadtime), this.setData({
            new_time: !1
        }), this.getUserinfo();
    },
    onShareAppMessage: function() {}
});