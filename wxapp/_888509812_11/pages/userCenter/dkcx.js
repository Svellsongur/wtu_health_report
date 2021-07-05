function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (a[i] = e[i]);
    }
    return a;
}, e = getApp(), i = require("../../utils/util.js"), n = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        showDialog: !1,
        start: {
            time: "",
            min: "00:00",
            max: "23:59"
        },
        end: {
            time: "",
            min: "00:00",
            max: "23:59"
        },
        showIndex: 0,
        data: [],
        inputShowed: !1,
        searchVal: "",
        showLoading: !1,
        hasData: !0,
        static: {
            ydkrs: 0,
            wdkrs: 0,
            ydkzcs: 0
        },
        params: {
            sj: "",
            total: 0,
            limit: 10,
            offset: 0
        },
        tad_lx: [ {
            id: "",
            name: "全部",
            cls: "active"
        }, {
            id: "已打卡",
            name: "已打卡",
            cls: ""
        }, {
            id: "未打卡",
            name: "未打卡",
            cls: ""
        } ],
        lxIndex: 0
    },
    inputChange: function(a) {
        this.setData({
            searchVal: a.detail.value
        });
    },
    bindTimeChange: function(t) {
        var e = this, i = t.currentTarget.dataset.id;
        e.setData(a({}, i + ".time", t.detail.value));
    },
    clearInput: function(a) {
        this.setData({
            searchVal: ""
        }), this.funcLoadData(!1);
    },
    funcSearch: function(a) {
        this.funcLoadData(!1);
    },
    func_dialog: function(a) {
        this.setData({
            hideSearch: !0,
            showDialog: !0
        });
    },
    tab_active: function(t) {
        var e;
        t.currentTarget.dataset.index !== this.data.lxIndex && (this.setData((e = {
            params: {
                sj: "",
                total: 0,
                limit: 10,
                offset: 0
            },
            lxIndex: t.currentTarget.dataset.index
        }, a(e, "start.time", ""), a(e, "end.time", ""), e)), this.funcLoadData(!1, !1));
    },
    func_dialog_cancle: function(a) {
        this.setData({
            showDialog: !1
        });
    },
    func_dialog_confirm: function(t) {
        var e, i = this, n = i.data.start.time, s = parseInt(n.replace(":", "")), o = i.data.end.time, d = parseInt(o.replace(":", ""));
        s && d && s > d && (i.data.start.time = o, i.data.end.time = n), this.setData((e = {
            showDialog: !1
        }, a(e, "start.time", i.data.start.time), a(e, "end.time", i.data.end.time), e)), 
        this.funcLoadData(!1);
    },
    funcLoadData: function() {
        var s = this, o = (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], 
        arguments[1]);
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var d = this, r = t({}, d.data.params, {
            keyword: d.data.searchVal,
            yhm: e.globalData.yhm,
            type: d.data.tad_lx[d.data.lxIndex].name,
            sj: d.data.start.time || d.data.end.time ? d.data.start.time + "至" + d.data.end.time : ""
        }), c = n["get_" + (e.globalData.yhlx || "visitors") + "_sign_record"];
        i.post(c, r).then(function(t) {
            var e;
            wx.hideLoading();
            var i = t.data;
            s.setData((e = {
                data: o ? d.data.data.concat(i) : i,
                static: {
                    ydkrs: t.ydkrs,
                    wdkrs: t.wdkrs,
                    ydkzcs: t.ydkzcs
                }
            }, a(e, "params.total", t.total), a(e, "hasData", t.total > 0), e));
        }).catch(function(a) {
            wx.hideLoading(), console.log("error", a);
        });
    },
    onLoad: function(a) {
        this.funcLoadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this.data.params;
        if (t.offset / t.limit + 1 < Math.ceil(t.total / t.limit)) {
            this.setData(a({}, "params.offset", t.offset + t.limit)), this.funcLoadData(!1, "next");
        }
    },
    onShareAppMessage: function() {}
});