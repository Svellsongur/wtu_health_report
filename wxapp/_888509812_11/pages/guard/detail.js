function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp(), e = require("../../utils/util.js"), s = require("../../utils/api/guardApi.js");

Page({
    data: {
        submitType: !1,
        loading: !1,
        show_dialog: !1,
        flags: !1,
        detail: "",
        base_info: {},
        jkklx: "",
        user: {
            yhm: "",
            xm: "",
            yhlx: "",
            xznj: "",
            yxmc: "",
            zymc: "",
            bjmc: "",
            id_card: "",
            bmmc: "",
            ssld: "-",
            ssmc: "-",
            xqmc: "-"
        },
        navbarData: {
            title: "扫码填报",
            bgcolor: "",
            color: "#ffffff",
            showCapsule: !0,
            share: !0
        },
        statusBarHeight: t.globalData.statusBarHeight,
        screenHeight: "",
        tw: "",
        sfks_list: [ {
            name: "是",
            val: 1,
            checked: !1
        }, {
            name: "否",
            val: 0,
            checked: !1
        } ],
        sfdkz_list: [ {
            name: "是",
            val: 1,
            checked: !1
        }, {
            name: "否",
            val: 0,
            checked: !1
        } ]
    },
    get_form_info: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var i = this, n = {}, o = "";
        i.data.detail ? (o = s.scan_record_detail, n = {
            scan_id: i.data.scan_id
        }) : (o = s.get_form_info, n = {
            yhm: t.globalData.yhm,
            jkmwybs: i.data.jkmwybs,
            get_card: 0
        }), e.post(o, n).then(function(t) {
            var e;
            wx.hideLoading(), "学生" == t.yhlx ? i.setData({
                yhlx: "student"
            }) : "教职工" == t.yhlx || "第三方人员" == t.yhlx ? i.setData({
                yhlx: "teacher"
            }) : "访客" == t.yhlx && i.setData({
                yhlx: "visitor"
            }), "student" == i.data.yhlx ? i.setData(a({}, "navbarData.bgcolor", "#4293F4")) : "teacher" == i.data.yhlx ? i.setData(a({}, "navbarData.bgcolor", "#47b16f")) : i.setData(a({}, "navbarData.bgcolor", "#8667E8")), 
            i.setData((e = {
                form_info: t.form_info
            }, a(e, "user.xm", t.xm), a(e, "user.yhlx", t.yhlx), a(e, "user.yhm", t.yhm), a(e, "user.xznj", t.xznj), 
            a(e, "user.yxmc", t.yxmc), a(e, "user.zymc", t.zymc), a(e, "user.bjmc", t.bjmc), 
            a(e, "user.xqmc", t.xqmc), a(e, "user.ssld", t.ssld), a(e, "user.ssmc", t.ssmc), 
            a(e, "user.id_card", t.id_card), a(e, "user.bmmc", t.bmmc), e)), i.data.detail || t.bs && "green" == t.jkmdqzt || wx.showModal({
                title: "提示",
                content: "禁止出入校园！",
                success: function(a) {
                    a.confirm ? wx.navigateBack() : a.cancel && wx.navigateBack();
                }
            });
        }).catch(function(a) {
            wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack();
            }, 1e3);
        });
    },
    func_tj: function(a) {
        var i = this;
        if (!i.data.flags) {
            i.setData({
                flags: !0
            });
            var n = !1, o = {
                user_id: i.data.user_id,
                form_id: i.data.form_info.form_id,
                kj_data: []
            };
            i.data.form_info.layouts.forEach(function(a, t) {
                a.widgets.forEach(function(a, t) {
                    var e = a.widget_id, s = a.answer ? a.answer : "";
                    "checkbox" == a.type ? o.kj_data.push({
                        kjid: e,
                        value: s
                    }) : a.region ? o.kj_data.push({
                        kjid: e,
                        value: s.join(",")
                    }) : o.kj_data.push({
                        kjid: e,
                        value: s.join("")
                    }), n || !a.required || a.answer[0] || (n = !0, i.setData({
                        flags: !1
                    }), wx.showModal({
                        title: "提示",
                        content: a.title + "不能为空！",
                        success: function(a) {
                            a.confirm || a.cancel;
                        }
                    }));
                });
            });
            var c = {
                yhm: t.globalData.yhm,
                yhlx: t.globalData.yhlx,
                name: t.globalData.xm,
                jkmwybs: i.data.jkmwybs,
                get_card: 0,
                objs: JSON.stringify(o)
            };
            n || e.post(s.active_card, c).then(function(a) {
                i.setData({
                    loading: !0,
                    show_dialog: !0,
                    submitType: !0
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 1e3);
            }).catch(function(a) {
                i.setData({
                    flags: !1
                }), wx.showToast({
                    title: a,
                    icon: "none"
                });
            });
        }
    },
    PickerChange: function(t) {
        var s = this, i = t.detail.filed, n = t.detail.time, o = t.detail.value;
        s.data.form_info.layouts.forEach(function(t, c) {
            t.widgets.forEach(function(t, r) {
                if (t.widget_id == i) {
                    var l = "form_info.layouts[" + c + "].widgets[" + r + "].answer";
                    if ("checkbox" == t.type) s.setData(a({}, l, o)); else if ("date" == t.type && n) if ("rq" == n) if (t.answer[0]) {
                        var d = t.answer[0].split(" ");
                        s.setData(a({}, l, [ o + " " + d[1] ]));
                    } else s.setData(a({}, l, [ o + " 00:00" ])); else if (t.answer[0]) {
                        var f = t.answer[0].split(" ");
                        s.setData(a({}, l, [ f[0] + " " + o ]));
                    } else {
                        var u = e.formatTime(new Date(), "-");
                        s.setData(a({}, l, [ u.split(" ")[0] + " " + o ]));
                    } else if ("select" != t.type || t.region) t.region ? s.setData(a({}, l, o)) : s.setData(a({}, l, [ o ])); else {
                        var m = t.zdz[o].id;
                        s.setData(a({}, l, [ m ]));
                    }
                }
            });
        });
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            scan_id: a.id,
            jkmwybs: a.jkmwybs,
            detail: a.detail ? a.detail : "",
            base_info: wx.getStorageSync("base_info")
        }), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    screenHeight: a.screenHeight
                });
            }
        }), t.get_form_info();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        if (!this.data.detail && this.data.submitType) {
            var a = getCurrentPages(), t = a[a.length - 2];
            setTimeout(function() {
                t.funcDetail();
            }, 50);
        }
    },
    onShareAppMessage: function() {}
});