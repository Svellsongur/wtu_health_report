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
}, e = getApp(), i = require("../../utils/util.js"), s = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        jccw: 3,
        flag: !1,
        dataList: [],
        params: {
            limit: 10,
            offset: 0,
            yhm: "",
            dh: ""
        },
        total: 0,
        dataListShow: !0
    },
    searchInput: function(a) {
        var e = a.detail.value;
        this.setData(t({}, "params.dh", e));
    },
    clearInput: function(a) {
        this.setData(t({}, "params.dh", "")), this.get_thermometry_report(!1);
    },
    funcSearch: function(t) {
        this.get_thermometry_report(!1);
    },
    get_thermometry_report: function(t) {
        if (!this.data.flag) {
            this.setData({
                flag: !0
            }), wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var o = this, r = a({}, o.data.params), n = s["get_" + (e.globalData.yhlx || "student") + "_access_record"];
            r.offset = o.data.params.offset, i.post(n, r).then(function(a) {
                wx.hideLoading();
                var e = a.data;
                o.setData({
                    dataList: t ? o.data.dataList.concat(e) : e,
                    total: a.total,
                    flag: !1
                });
            }).catch(function(t) {
                wx.hideLoading(), o.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    onLoad: function(a) {
        this.setData(t({}, "params.yhm", e.globalData.yhm)), this.get_thermometry_report();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var a = parseInt(this.data.params.offset / this.data.params.limit) + 1, e = Math.ceil(this.data.total / this.data.params.limit);
        if (!this.data.flag && a < e) {
            this.setData(t({}, "params.offset", this.data.params.offset + this.data.params.limit)), 
            this.get_thermometry_report("next");
        }
    },
    onShareAppMessage: function() {}
});