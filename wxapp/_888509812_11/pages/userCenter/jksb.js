function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp(), n = require("../../utils/util.js"), s = require("../../utils/api/userCenterApi.js"), i = require("../../libs/qqmap-wx-jssdk.min.js"), o = void 0;

Page((t = {
    data: {
        sbsj: "",
        TJloading: !1,
        nav_list: [ "健康打卡", "打卡记录" ],
        nav_index: 0,
        base_info: {},
        map: {
            status: !0,
            poi: {
                longitude: "",
                latitude: "",
                address: ""
            },
            markers: []
        },
        can_submit: !0,
        params: {
            lxdh: "",
            jjlxr: "",
            jjlxdh: "",
            zgdy: "",
            hbjkmzt: "",
            dqstzk: "",
            dqtw: "",
            brsffr: "",
            brsfks: "",
            jrsffr: "",
            jrsfks: "",
            xxqk: ""
        },
        record_list: [],
        zgdy_list: [ {
            name: "是",
            checked: !1
        }, {
            name: "否",
            checked: !1
        } ],
        hbjkmzt_list: [ {
            name: "绿色",
            checked: !1
        }, {
            name: "黄色",
            checked: !1
        }, {
            name: "红色",
            checked: !1
        } ],
        dqstzk_list: [ {
            name: "健康",
            checked: !1
        }, {
            name: "确诊",
            checked: !1
        }, {
            name: "疑似",
            checked: !1
        }, {
            name: "医学观察",
            checked: !1
        }, {
            name: "可疑（发热隔离）",
            checked: !1
        }, {
            name: "治愈",
            checked: !1
        }, {
            name: "其它",
            checked: !1
        } ],
        brsffr_list: [ {
            name: "是",
            checked: !1
        }, {
            name: "否",
            checked: !1
        } ],
        brsfks_list: [ {
            name: "是",
            checked: !1
        }, {
            name: "否",
            checked: !1
        } ],
        jrsffr_list: [ {
            name: "是",
            checked: !1
        }, {
            name: "否",
            checked: !1
        } ],
        jrsfks_list: [ {
            name: "是",
            checked: !1
        }, {
            name: "否",
            checked: !1
        } ]
    },
    bindChange: function(t) {
        var e = this, n = t.currentTarget.dataset.id, s = t.detail.value;
        e.data.params[n] = "string" == typeof s ? [ s ] : s, e.setData(a({}, "params." + n, s));
    },
    funcNav: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            nav_index: t
        }), 0 == t || this.funcDkjlData();
    },
    funcTJ: function(a) {
        var t = this;
        if (!t.data.TJloading) {
            t.setData({
                TJloading: !0
            });
            var e = t.data, n = e.params;
            if (e.map.status) {
                var s = !1;
                for (var i in n) if ("" == n[i] && "dqtw" != i && "xxqk" != i) {
                    s = !0;
                    break;
                }
                if (s) wx.showToast({
                    title: "信息未填写完整",
                    icon: "none"
                }), t.setData({
                    TJloading: !1
                }); else {
                    var o = !1;
                    "绿色" != t.data.params.hbjkmzt || "健康" != t.data.params.dqstzk && "治愈" != t.data.params.dqstzk && "其它" != t.data.params.dqstzk || "" != t.data.params.dqtw && t.data.params.dqtw >= 37.3 ? wx.showModal({
                        title: "提示",
                        content: "您的健康信息异常，是否确认？",
                        success: function(a) {
                            a.confirm ? (o = !0, t.funcSubmit(o, e, 0)) : a.cancel && (o = !1, t.setData({
                                TJloading: !1
                            }));
                        }
                    }) : (o = !0, t.funcSubmit(o, e));
                }
            } else wx.showToast({
                title: "位置信息获取失败，请重新授权",
                icon: "none"
            }), t.setData({
                TJloading: !1
            });
        }
    },
    funcSubmit: function(a, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, o = this;
        if (a) {
            var d = {
                yhm: e.globalData.yhm,
                yhlx: e.globalData.yhlx,
                jkklx: e.globalData.jkklx,
                jkmdqzt: o.data.base_info.jkmdqzt,
                longitude: t.map.poi.longitude,
                latitude: t.map.poi.latitude,
                address: t.map.poi.address,
                data: JSON.stringify(o.data.params),
                normal: i
            };
            n.post(s.submit_mrjk, d).then(function(a) {
                o.setData({
                    TJloading: !1,
                    can_submit: !1
                }), wx.showToast({
                    title: a.message,
                    icon: "none"
                });
            }).catch(function(a) {
                o.setData({
                    TJloading: !1
                }), wx.showToast({
                    title: a,
                    icon: "none"
                });
            });
        }
    },
    funcGetPosition: function() {
        var t = this, e = t.data.can_submit, n = t.data.map.poi;
        wx.getLocation({
            type: "gcj02",
            altitude: !1,
            complete: function(s) {
                if (-1 !== s.errMsg.indexOf(":ok")) {
                    var i = [];
                    i.push({
                        title: "",
                        id: 0,
                        latitude: s.latitude,
                        longitude: s.longitude,
                        iconPath: "",
                        alpha: 0
                    }), t.setData({
                        map: {
                            status: !0,
                            poi: {
                                latitude: s.latitude,
                                longitude: s.longitude,
                                address: n.address || "-"
                            },
                            markers: i
                        }
                    }), e && t.funcTXAddress();
                } else t.setData(a({}, "map.status", !1)), wx.showToast({
                    title: "获取位置失败，请开启定位刷新位置",
                    icon: "none"
                });
            }
        });
    },
    funcTXAddress: function() {
        var t = this, e = t.data.map.poi;
        o.reverseGeocoder({
            location: {
                latitude: e.latitude,
                longitude: e.longitude
            },
            success: function(e) {
                var n = e.result;
                t.setData(a({}, "map.poi.address", n.address));
            },
            fail: function(e) {
                t.setData(a({}, "map.poi.address", "-"));
            },
            complete: function(a) {}
        });
    },
    funcRefresh: function(a) {
        var t = this;
        t.data.map.status ? t.funcGetPosition() : wx.openSetting({
            success: function(a) {
                a.authSetting["scope.userLocation"] ? (t.data.map.status = !0, t.setData({
                    map: t.data.map
                }), t.funcGetPosition()) : (t.data.map.status = !1, t.setData({
                    map: t.data.map
                }));
            },
            fail: function(a) {
                t.data.map.status = !1, t.setData({
                    map: t.data.map
                }), wx.showToast({
                    title: "系统错误，请稍后重试",
                    icon: "none"
                });
            },
            complete: function(a) {}
        });
    },
    funcDkjlData: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var a = this;
        n.post(s.load_dkjl_data, {
            yhm: e.globalData.yhm
        }).then(function(t) {
            wx.hideLoading(), 0 === t.rows.length ? a.setData({
                record_list: []
            }) : a.setData({
                record_list: t.rows
            });
        }).catch(function(a) {
            wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    get_last_health_report_data: function() {
        var a = this;
        n.post(s.get_last_health_report_data, {
            yhm: e.globalData.yhm
        }).then(function(t) {
            if (t.report.data) {
                var e = JSON.parse(t.report.data);
                a.setData({
                    params: e
                });
            }
            a.setData({
                sbsj: t.fbsj,
                can_submit: t.submit
            }), a.funcGetPosition();
        }).catch(function(a) {
            wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    onReady: function(a) {
        this.mapCtx = wx.createMapContext("jksbMap");
    },
    onLoad: function(a) {
        o = new i({
            key: "5P6BZ-GS7WX-LDA4Z-7VG5O-QG7VS-KLFU4"
        }), this.setData({
            base_info: wx.getStorageSync("base_info")
        }), this.get_last_health_report_data();
    }
}, a(t, "onReady", function() {}), a(t, "onShow", function() {}), a(t, "onHide", function() {}), 
a(t, "onUnload", function() {}), a(t, "onShareAppMessage", function() {}), t));