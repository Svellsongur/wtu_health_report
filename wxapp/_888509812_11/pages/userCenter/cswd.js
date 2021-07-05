function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, e = getApp(), i = require("../../utils/util.js"), n = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        flag: !1,
        showDialog: !1,
        titList: [ "全部", "未读" ],
        titIndex: 0,
        unreadCount: 0,
        searchVal: "",
        filter_hidden: !1,
        filter_dsp: [],
        temp_filter_dsp: [],
        filter_ysp: [],
        temp_filter_ysp: [],
        dsp_paging: {
            offset: 0,
            limit: 10,
            total: 0
        },
        ysp_paging: {
            offset: 0,
            limit: 10,
            total: 0
        },
        dsp_data: [],
        ysp_data: []
    },
    searchInput: function(t) {
        var a = t.detail.value;
        this.setData({
            searchVal: a
        });
    },
    clearInput: function(t) {
        this.setData({
            searchVal: ""
        }), this.funcLoadData(!1);
    },
    funcxxBj: function(a) {
        if (!this.data.flag) {
            var e = this, s = {
                spbh: a || ""
            };
            i.post(n.load_cswd_read, s).then(function(i) {
                e.setData({
                    flag: !1
                });
                var n = 0 == e.data.titIndex ? e.data.dsp_data : e.data.ysp_data;
                a ? (n.forEach(function(i, n) {
                    if (i.spbh == a) {
                        var s = 0 == e.data.titIndex ? "dsp_data[" + n + "].is_read" : "ysp_data[" + n + "].is_read";
                        e.setData(t({}, s, !0));
                    }
                }), wx.navigateTo({
                    url: "wfqdxq?spbh=" + a
                })) : (n.forEach(function(a, i) {
                    var n = 0 == e.data.titIndex ? "dsp_data[" + i + "].is_read" : "ysp_data[" + i + "].is_read";
                    e.setData(t({}, n, !0));
                }), e.setData({
                    unreadCount: 0,
                    ysp_data: []
                }));
            }).catch(function(t) {
                e.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    funcSearch: function(t) {
        this.funcLoadData(!1);
    },
    handeRecord: function(a) {
        var e;
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
        var i = 0 == a.currentTarget.dataset.index ? "filter_dsp" : "filter_ysp", n = 0 == a.currentTarget.dataset.index ? "dsp_paging.offset" : "ysp_paging.offset", s = this.data[i];
        this.setData((e = {}, t(e, n, 0), t(e, "titIndex", a.currentTarget.dataset.index), 
        t(e, "filter_hidden", 0 == s.length), e)), this.funcLoadData(!1);
    },
    func_dialog: function(t) {
        this.setData({
            hideSearch: !0,
            showDialog: !0
        });
    },
    func_filter_active: function(a) {
        var e = a.target.dataset.name, i = a.target.dataset.id, n = 0 == this.data.titIndex ? "filter_dsp" : "filter_ysp", s = this.data[n];
        for (var d in s) if (s[d].name === e) for (var r in s[d].value) s[d].value[r].id === i ? s[d].value[r].cls = "active" : s[d].value[r].cls = "";
        this.setData(t({}, n, s));
    },
    func_dialog_cancle: function(a) {
        var e = 0 == this.data.titIndex ? "filter_dsp" : "filter_ysp", i = "filter_dsp" === e ? "temp_filter_dsp" : "temp_filter_ysp";
        this.setData(t({
            showDialog: !1
        }, e, this.data[i]));
    },
    func_dialog_confirm: function(a) {
        var e, i = 0 == this.data.titIndex ? "filter_dsp" : "filter_ysp", n = 0 == this.data.titIndex ? "dsp_paging" : "ysp_paging", s = "filter_dsp" === i ? "temp_filter_dsp" : "temp_filter_ysp";
        this.setData((e = {
            showDialog: !1
        }, t(e, s, this.data[i]), t(e, n, {
            total: 0,
            offset: 0,
            limit: 10
        }), e)), this.funcLoadData(!1);
    },
    funcLoadFilter: function(t) {
        var a = this;
        i.post(n.load_cswd_filter, {
            username: e.globalData.yhm,
            type: "全部" == t ? t : "未读"
        }).then(function(e) {
            0 != e.data.length ? e.data.map(function(t) {
                t.value.map(function(t) {
                    t.cls = "";
                }), t.value.unshift({
                    id: "",
                    text: "全部",
                    cls: "active"
                });
            }) : e.data = [], "全部" === t ? a.setData({
                filter_dsp: e.data,
                temp_filter_dsp: JSON.parse(JSON.stringify(e.data)),
                filter_hidden: 0 == e.data.length
            }) : a.setData({
                filter_ysp: e.data,
                temp_filter_ysp: JSON.parse(JSON.stringify(e.data))
            });
        }).catch(function(t) {
            console.log("error", t);
        });
    },
    _DoSearch: function(t) {},
    funcLoadData: function() {
        var s = this, d = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], r = arguments[1];
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = this, l = 0 == this.data.titIndex ? "全部" : "未读", f = "filter_" + ("全部" == l ? "dsp" : "ysp"), c = "全部" == l ? o.data.dsp_paging : o.data.ysp_paging, p = a({}, c), u = this.data[f];
        d || (p.keyword = this.data.searchVal, u.map(function(t, a) {
            p[t.en_name] = [];
            for (var e in t.value) "active" === t.value[e].cls && (p[t.en_name] = t.value[e].id);
        }));
        var h = Object.assign({
            type: l,
            username: e.globalData.yhm
        }, p);
        i.post(n.load_cswd_data, h).then(function(a) {
            wx.hideLoading(), s.setData({
                unreadCount: a.unread
            }), "全部" === l ? s.setData(t({
                filter_hidden: 0 == a.rows.length,
                dsp_data: r ? o.data.dsp_data.concat(a.rows) : a.rows
            }, "dsp_paging.total", a.total)) : s.setData(t({
                filter_hidden: 0 == a.rows.length,
                ysp_data: r ? o.data.ysp_data.concat(a.rows) : a.rows
            }, "ysp_paging.total", a.total));
        }).catch(function(t) {
            wx.hideLoading(), console.log("error", t);
        });
    },
    funcDetail: function(t) {
        this.funcxxBj(t.currentTarget.dataset.spbh);
    },
    onLoad: function(t) {
        this.funcLoadFilter("全部"), this.funcLoadFilter("未读"), this.funcLoadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.reLaunch({
            url: "/pages/userCenter/userCenter"
        });
    },
    onReachBottom: function() {
        var a = this, e = 0 == a.data.titIndex ? "dsp" : "ysp", i = "dsp" == e ? a.data.dsp_paging : a.data.ysp_paging, n = "dsp" == e ? "dsp_paging.offset" : "ysp_paging.offset", s = parseInt(i.offset / i.limit) + 1;
        s < Math.ceil(i.total / i.limit) && (a.setData(t({}, n, s * i.limit)), a.funcLoadData(!1, "next"));
    },
    onShareAppMessage: function() {}
});