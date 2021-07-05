function t(t, a, s) {
    return a in t ? Object.defineProperty(t, a, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = s, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var s = arguments[a];
        for (var e in s) Object.prototype.hasOwnProperty.call(s, e) && (t[e] = s[e]);
    }
    return t;
}, s = getApp(), e = require("../../utils/util.js"), i = require("../../utils/api/infoNoticeApi.js");

Page({
    data: {
        navbarData: {
            title: "信息公告",
            bgcolor: "",
            color: ""
        },
        statusBarHeight: s.globalData.statusBarHeight,
        hide: !1,
        titIndex: 0,
        flag: !1,
        titList: [ "通知公告", "我的消息", "审批通知" ],
        tzggList: [],
        tzggPrams: {
            limit: 10,
            offset: 0
        },
        tzggTotal: 0,
        wdxxList: [],
        wdxxPrams: {
            limit: 10,
            offset: 0
        },
        wdxxTotal: 0,
        sptzList: [],
        sptzPrams: {
            limit: 10,
            offset: 0,
            state: ""
        },
        sptzTotal: 0,
        sxShow: !1,
        sxBtbList: [ {
            text: "全部",
            value: ""
        }, {
            text: "已同意",
            value: "已同意"
        }, {
            text: "已拒绝",
            value: "已拒绝"
        }, {
            text: "已撤销",
            value: "已撤销"
        }, {
            text: "已转交",
            value: "已转交"
        }, {
            text: "已驳回",
            value: "已驳回"
        } ]
    },
    handeRecord: function(a) {
        if (!this.data.flag && a.currentTarget.dataset.index != this.data.titIndex) if (wx.pageScrollTo && wx.pageScrollTo({
            scrollTop: 0
        }), this.setData({
            titIndex: a.currentTarget.dataset.index
        }), 0 == this.data.titIndex) {
            var s;
            this.setData((s = {}, t(s, "tzggPrams.limit", 10), t(s, "tzggPrams.offset", 0), 
            s)), this.getMessageCount();
        } else if (1 == this.data.titIndex) {
            var e;
            this.setData((e = {}, t(e, "wdxxPrams.limit", 10), t(e, "wdxxPrams.offset", 0), 
            e)), this.wd_getMessageCount();
        } else if (2 == this.data.titIndex) {
            var i;
            this.setData((i = {}, t(i, "sptzPrams.limit", 10), t(i, "sptzPrams.offset", 0), 
            i)), this.sp_getMessageCount(), this.sp_getNoticeState();
        }
    },
    getMessageCount: function(t) {
        if (!this.data.flag) {
            this.setData({
                flag: !0
            }), wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var s = this, n = a({}, s.data.tzggPrams);
            n.offset = s.data.tzggPrams.offset * s.data.tzggPrams.limit, e.post(i.getMessageCount, n).then(function(a) {
                wx.hideLoading(), s.setData({
                    tzggList: t ? s.data.tzggList.concat(a.rows) : a.rows,
                    tzggTotal: a.total,
                    flag: !1
                });
            }).catch(function(t) {
                wx.hideLoading(), s.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    maskAsRead: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", s = "";
        if (!this.data.flag) {
            this.setData({
                flag: !0
            });
            var n = this, o = {
                "id[]": (s = "" != a && a.currentTarget && a.currentTarget.dataset.id ? a.currentTarget.dataset.id : a) || "all"
            };
            e.post(i.maskAsRead, o).then(function(a) {
                n.setData({
                    flag: !1
                }), s ? (n.data.tzggList.forEach(function(a, e) {
                    if (a.id == s) {
                        var i = "tzggList[" + e + "].read";
                        n.setData(t({}, i, 1));
                    }
                }), wx.navigateTo({
                    url: "ggxq?id=" + s
                })) : n.data.tzggList.forEach(function(a, s) {
                    var e = "tzggList[" + s + "].read";
                    n.setData(t({}, e, 1));
                });
            }).catch(function(t) {
                n.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    funcTzggBj: function(t) {
        this.maskAsRead();
    },
    funcTzggDetail: function(t) {
        var a = this, s = t.currentTarget.dataset.id;
        a.data.tzggList.forEach(function(t, e) {
            t.id == s && 0 == t.read ? a.maskAsRead(s) : t.id == s && 1 == t.read && wx.navigateTo({
                url: "ggxq?id=" + s
            });
        });
    },
    wd_getMessageCount: function(t) {
        if (!this.data.flag) {
            this.setData({
                flag: !0
            }), wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var s = this, n = a({}, s.data.wdxxPrams);
            n.offset = s.data.wdxxPrams.offset * s.data.wdxxPrams.limit, e.post(i.wd_getMessageCount, n).then(function(a) {
                wx.hideLoading(), s.setData({
                    wdxxList: t ? s.data.wdxxList.concat(a.rows) : a.rows,
                    wdxxTotal: a.total,
                    flag: !1
                });
            }).catch(function(t) {
                wx.hideLoading(), s.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    wd_maskAsRead: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", s = "";
        if (!this.data.flag) {
            this.setData({
                flag: !0
            });
            var n = this, o = {
                "id[]": (s = "" != a && a.currentTarget && a.currentTarget.dataset.id ? a.currentTarget.dataset.id : a) || "all"
            };
            e.post(i.wd_maskAsRead, o).then(function(a) {
                n.setData({
                    flag: !1
                }), s ? n.data.wdxxList.forEach(function(a, e) {
                    if (a.id == s) {
                        var i = "wdxxList[" + e + "].read";
                        n.setData(t({}, i, 1));
                    }
                }) : n.data.wdxxList.forEach(function(a, s) {
                    var e = "wdxxList[" + s + "].read";
                    n.setData(t({}, e, 1));
                });
            }).catch(function(t) {
                n.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    funcWdxxBj: function(t) {
        this.wd_maskAsRead();
    },
    funcWdxxDetail: function(t) {
        var a = t.currentTarget.dataset.urls, s = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/index/jumpOut?urls=" + a
        }), this.wd_maskAsRead(s);
    },
    sp_getNoticeState: function() {
        var t = this, a = {};
        e.post(i.sp_getNoticeState, a).then(function(a) {
            t.setData({
                sxBtbList: a.data[0]
            });
        }).catch(function(t) {
            wx.showToast({
                title: t,
                icon: "none"
            });
        });
    },
    sp_getMessageCount: function(t) {
        if (!this.data.flag) {
            this.setData({
                flag: !0
            }), wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var s = this, n = a({}, s.data.sptzPrams);
            n.offset = s.data.sptzPrams.offset * s.data.sptzPrams.limit, e.post(i.sp_getMessageCount, n).then(function(a) {
                wx.hideLoading();
                var e = a.rows;
                a.rows.forEach(function(t, a) {
                    e[a].content = t.content.split(";");
                }), s.setData({
                    sptzList: t ? s.data.sptzList.concat(e) : e,
                    sptzTotal: a.total,
                    flag: !1
                });
            }).catch(function(t) {
                wx.hideLoading(), s.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    funcHide: function(t) {
        this.setData({
            sxShow: !1
        });
    },
    funcSptzDetail: function(t) {
        var a = t.currentTarget.dataset.id, s = t.currentTarget.dataset.spzt;
        wx.navigateTo({
            url: "/pages/userCenter/wfqdxq?spbh=" + a + "&spzt=" + s
        });
    },
    funcSptzBj: function(t) {
        this.setData({
            sxShow: !0
        });
    },
    funcSxBtb: function(a) {
        this.setData(t({}, "sptzPrams.state", a.target.dataset.value));
    },
    funcCancel: function(t) {
        this.setData({
            sxShow: !1
        });
    },
    funcConfirm: function(a) {
        this.setData(t({
            sptzList: []
        }, "sptzPrams.offset", 0)), this.sp_getMessageCount(), this.setData({
            sxShow: !1
        });
    },
    onLoad: function() {
        "visitor" == s.globalData.yhlx ? this.setData({
            hide: !0,
            titIndex: 1
        }) : this.setData({
            hide: !1,
            titIndex: 0
        }), s.editTabBar(wx.getStorageSync("sfbw")), 0 == this.data.titIndex ? this.getMessageCount() : 1 == this.data.titIndex ? this.wd_getMessageCount() : 2 == this.data.titIndex && (this.sp_getMessageCount(), 
        this.sp_getNoticeState());
    },
    onReachBottom: function() {
        if ("0" == this.data.titIndex) {
            var a = this.data.tzggPrams.offset + 1, s = Math.ceil(this.data.tzggTotal / this.data.tzggPrams.limit);
            if (!this.data.flag && a < s) {
                this.setData(t({}, "tzggPrams.offset", this.data.tzggPrams.offset + 1)), this.getMessageCount("next");
            }
        } else if ("1" == this.data.titIndex) {
            var e = this.data.wdxxPrams.offset + 1, i = Math.ceil(this.data.wdxxTotal / this.data.wdxxPrams.limit);
            if (!this.data.flag && e < i) {
                this.setData(t({}, "wdxxPrams.offset", this.data.wdxxPrams.offset + 1)), this.wd_getMessageCount("next");
            }
        } else if ("2" == this.data.titIndex) {
            var n = this.data.sptzPrams.offset + 1, o = Math.ceil(this.data.sptzTotal / this.data.sptzPrams.limit);
            if (!this.data.flag && n < o) {
                this.setData(t({}, "sptzPrams.offset", this.data.sptzPrams.offset + 1)), this.sp_getMessageCount("next");
            }
        }
    }
});