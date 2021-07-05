function t(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]);
    }
    return t;
}, i = getApp(), e = require("../../utils/util.js"), n = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        showDialog: !1,
        paging: {
            total: 0,
            offset: 0,
            limit: 10
        },
        data: [],
        filter: [],
        temp_filter: [],
        inputShowed: !1,
        searchVal: "",
        showLoading: !1,
        hasData: !0,
        spzt_cls: {
            "审批中": "spz",
            "通过": "sptg",
            "拒绝": "spbjj"
        }
    },
    closeDialog: function(t) {
        this.setData({
            showDialog: !1
        });
    },
    inputChange: function(t) {
        this.setData({
            searchVal: t.detail.value
        });
    },
    clearInput: function(t) {
        this.setData({
            searchVal: ""
        }), this.funcLoadData(!1);
    },
    funcSearch: function(t) {
        this.funcLoadData(!1);
    },
    func_dialog: function(t) {
        this.setData({
            hideSearch: !0,
            showDialog: !0
        });
    },
    func_filter_active: function(t) {
        var a = t.target.dataset.name, i = t.target.dataset.id, e = this.data.filter;
        for (var n in e) if (e[n].name === a) for (var o in e[n].value) e[n].value[o].id === i ? e[n].value[o].cls = "active" : e[n].value[o].cls = "";
        this.setData({
            filter: e
        });
    },
    func_dialog_cancle: function(t) {
        this.setData({
            showDialog: !1,
            filter: this.data.temp_filter
        });
    },
    func_dialog_confirm: function(t) {
        this.setData({
            showDialog: !1,
            temp_filter: this.data.filter,
            paging: {
                total: 0,
                offset: 0,
                limit: 10
            }
        }), this.funcLoadData(!1);
    },
    funcLoadFilter: function() {
        var t = this;
        e.post(n.load_wfqd_filter, {
            username: i.globalData.yhm
        }).then(function(a) {
            a.data.map(function(t) {
                t.value.map(function(t) {
                    t.cls = "";
                }), t.value.unshift({
                    id: "",
                    text: "全部" + t.name,
                    cls: "active"
                });
            }), t.setData({
                filter: a.data,
                temp_filter: JSON.parse(JSON.stringify(a.data))
            });
        }).catch(function(t) {
            console.log("error", t);
        });
    },
    funcLoadData: function() {
        var o = this, s = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], l = arguments[1];
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var r = this, c = a({}, r.data.paging), f = this.data.filter;
        s || (c.keyword = this.data.searchVal, f.map(function(t, a) {
            c[t.en_name] = [];
            for (var i in t.value) "active" === t.value[i].cls && (c[t.en_name] = t.value[i].id);
        }));
        var u = Object.assign({
            username: i.globalData.yhm
        }, c);
        e.post(n.load_wfqd_data, u).then(function(a) {
            wx.hideLoading();
            var i = [];
            for (var e in a.rows) {
                var n = a.rows[e], s = "", c = "";
                "通过" === n.spzt ? (s = "sptg", c = "审批通过") : "拒绝" === n.spzt ? (s = "spbjj", c = "审批被拒绝") : "已撤销" === n.spzt ? (s = "ycx", 
                c = "审批已撤销") : (s = "spz", c = n.spr.length > 1 ? n.spxx : n.spr[0] + n.spzt), i.push({
                    title: n.title,
                    time: n.fbsj,
                    nfxsj: n.fxsj,
                    spbh: n.spbh,
                    spzt: s,
                    spjg: c
                });
            }
            o.setData(t({
                data: l ? r.data.data.concat(i) : i,
                hasData: !1
            }, "paging.total", a.total));
        }).catch(function(t) {
            wx.hideLoading(), console.log("error", t);
        });
    },
    onLoad: function(t) {
        this.funcLoadFilter(), this.funcLoadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var a = this, i = a.data.paging, e = parseInt(i.offset / i.limit) + 1;
        e < Math.ceil(i.total / i.limit) && (a.setData(t({}, "paging.offset", e * i.limit)), 
        a.funcLoadData(!1, "next"));
    },
    onShareAppMessage: function() {}
});