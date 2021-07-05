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
        showDialog: !1,
        titList: [ "待我审批的", "我已审批的" ],
        titIndex: 0,
        searchVal: "",
        filter_hidden: !1,
        filter_dsp: [],
        temp_filter_dsp: [],
        filter_ysp: [],
        temp_filter_ysp: [],
        dsp_paging: {
            total: 0,
            offset: 0,
            limit: 10
        },
        ysp_paging: {
            total: 0,
            offset: 0,
            limit: 10
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
        });
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
        i.post(n.load_wdsp_filter, {
            username: e.globalData.yhm,
            type: t
        }).then(function(e) {
            e.data.map(function(t) {
                t.value.map(function(t) {
                    t.cls = "";
                }), t.value.unshift({
                    id: "",
                    text: "全部" + t.name,
                    cls: "active"
                });
            }), "dsp" === t ? a.setData({
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
    funcLoadData: function() {
        var s = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], d = arguments[1];
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var r = this, o = 0 == r.data.titIndex ? "dsp" : "ysp", l = "dsp" == o ? r.data.dsp_paging : r.data.ysp_paging, p = a({}, l), f = "filter_" + o, c = r.data[f];
        s || (p.keyword = r.data.searchVal, c.map(function(t, a) {
            p[t.en_name] = [];
            for (var e in t.value) "active" === t.value[e].cls && (p[t.en_name] = t.value[e].id);
        }));
        var u = Object.assign({
            type: o,
            username: e.globalData.yhm
        }, p);
        i.post(n.load_wdsp_data, u).then(function(a) {
            wx.hideLoading(), "dsp" === o ? r.setData(t({
                filter_hidden: 0 == a.rows.length,
                dsp_data: d ? r.data.dsp_data.concat(a.rows) : a.rows
            }, "dsp_paging.total", a.total)) : r.setData(t({
                filter_hidden: 0 == a.rows.length,
                ysp_data: d ? r.data.ysp_data.concat(a.rows) : a.rows
            }, "ysp_paging.total", a.total));
        }).catch(function(t) {
            wx.hideLoading(), console.log("error", t);
        });
    },
    funcDelList: function(t) {
        var a = this, e = a.data.dsp_data;
        e.forEach(function(a, i) {
            a.id == t && e.splice(i, 1);
        }), a.setData({
            dsp_data: e
        });
    },
    onLoad: function(t) {
        this.funcLoadFilter("ysp"), this.funcLoadFilter("dsp"), this.funcLoadData();
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