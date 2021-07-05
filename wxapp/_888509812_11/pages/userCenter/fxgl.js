function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp(), e = require("../../utils/util.js"), i = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        showDialog: !1,
        showIndex: 0,
        data: [],
        filter_sflx: [],
        filter_pc: [],
        params_sflx: "",
        params_pc: "",
        limit: 10,
        offset: 0,
        total: 0,
        inputShowed: !1,
        searchVal: "",
        showLoading: !1,
        hasData: !0,
        fxbb: 0,
        yqfx: 0,
        wfk: 0,
        yfx: 0,
        lxIndex: 0,
        params: {
            lx: ""
        },
        tad_lx: [ {
            id: "",
            name: "全部",
            cls: "active"
        }, {
            id: "返校报备",
            name: "返校报备",
            cls: ""
        }, {
            id: "延期返校",
            name: "延期返校",
            cls: ""
        }, {
            id: "未反馈",
            name: "未反馈",
            cls: ""
        }, {
            id: "已返校",
            name: "已返校",
            cls: ""
        } ]
    },
    funcPanel: function(a) {
        a.currentTarget.dataset.index != this.data.showIndex ? this.setData({
            showIndex: a.currentTarget.dataset.index
        }) : this.setData({
            showIndex: 0
        });
    },
    inputChange: function(a) {
        this.setData({
            searchVal: a.detail.value
        });
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
    func_active_sflx: function(a) {
        var s = this, n = a.target.dataset.name, c = this.data.filter_sflx;
        for (var o in c) c[o].name === n ? c[o].cls = "active" : c[o].cls = "";
        this.setData({
            filter_sflx: c,
            params_sflx: n,
            params_pc: "",
            limit: 10,
            offset: 0
        });
        var l = [ {
            id: "",
            name: "全部",
            cls: "active"
        } ];
        e.post(i.getBatchFilter, {
            sflx: n,
            yhm: t.globalData.yhm
        }).then(function(a) {
            a.data.map(function(a, t) {
                l.push({
                    id: a.id,
                    name: a.text,
                    cls: ""
                });
            }), s.setData({
                filter_pc: l
            });
        }).catch(function(a) {
            console.log("error", a);
        });
    },
    func_active_pc: function(a) {
        var t = a.target.dataset.name, e = this.data.filter_pc;
        for (var i in e) e[i].name === t ? e[i].cls = "active" : e[i].cls = "";
        this.setData({
            filter_pc: e,
            params_pc: t,
            limit: 10,
            offset: 0
        });
    },
    tab_active: function(t) {
        var e, i = t.currentTarget.dataset.id, s = t.currentTarget.dataset.index;
        this.setData((e = {}, a(e, "params.lx", i), a(e, "lxIndex", s), a(e, "limit", 10), 
        a(e, "offset", 0), e)), this.funcLoadData(!1, !1, "lx");
    },
    func_dialog_cancle: function(a) {
        this.setData({
            showDialog: !1
        });
    },
    func_dialog_confirm: function(a) {
        this.setData({
            showDialog: !1
        }), this.funcLoadData(!1);
    },
    funcLoadFilter: function() {
        var a = this;
        e.post(i.getSflxFilter, {
            yhm: t.globalData.yhm
        }).then(function(t) {
            var s = [], n = [ {
                id: "",
                name: "全部",
                cls: "active"
            } ];
            t.data.map(function(a, t) {
                s.push({
                    id: "",
                    name: a,
                    cls: 0 == t ? "active" : ""
                });
            }), a.setData({
                filter_sflx: s,
                params_sflx: t.data[0]
            }), e.post(i.getBatchFilter, {
                sflx: t.data[0]
            }).then(function(t) {
                t.data.map(function(a, t) {
                    n.push({
                        id: a.id,
                        name: a.text,
                        cls: ""
                    });
                }), a.setData({
                    filter_pc: n
                }), a.funcLoadData();
            }).catch(function(a) {
                console.log("error", a);
            });
        }).catch(function(a) {
            console.log("error", a);
        });
    },
    funcLoadData: function() {
        var a = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], s = this, n = arguments[1], c = arguments[2];
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = {};
        a || (o.keyword = this.data.searchVal);
        var l = Object.assign({
            limit: this.data.limit,
            offset: this.data.offset,
            sflx: this.data.params_sflx,
            pcmc: this.data.params_pc,
            lx: this.data.params.lx,
            yhm: t.globalData.yhm
        }, o);
        c || e.post(i.getBackSchoolCnts, {
            sflx: this.data.params_sflx,
            pcmc: this.data.params_pc,
            yhm: t.globalData.yhm
        }).then(function(a) {
            s.setData({
                fxbb: a.data[0],
                yqfx: a.data[1],
                wfk: a.data[2],
                yfx: a.data[3]
            });
        }).catch(function(a) {
            wx.hideLoading(), console.log("error", a);
        }), e.post(i.getBackSchoolList, l).then(function(a) {
            wx.hideLoading();
            var t = [];
            for (var e in a.rows) {
                var i = a.rows[e], c = "";
                "返校报备" === i.lx ? c = "fxbb" : "延期返校" === i.lx ? c = "yqfx" : "未反馈" === i.lx ? c = "wfk" : "已返校" === i.lx && (c = "yfx"), 
                t.push({
                    xm: i.xm,
                    yhm: i.sfrzm,
                    yxmc: i.xbmc,
                    pc: i.pcmc,
                    fxrq: i.fxrq,
                    fxlx: i.lx,
                    lx_cl: c,
                    spbh: i.spbh,
                    sflx: "学生" == s.data.params_sflx ? "专业" : "系部"
                });
            }
            s.setData({
                data: n ? s.data.data.concat(t) : t,
                total: a.total,
                hasData: a.total > 0
            });
        }).catch(function(a) {
            wx.hideLoading(), console.log("error", a);
        });
    },
    funcJumpGo: function(a) {
        "返校报备" != a.currentTarget.dataset.lx && "延期返校" != a.currentTarget.dataset.lx || "-" == a.currentTarget.dataset.spbh || wx.navigateTo({
            url: a.currentTarget.dataset.url
        });
    },
    onLoad: function(a) {
        this.funcLoadFilter();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        if (this.data.offset / this.data.limit + 1 < Math.ceil(this.data.total / this.data.limit)) {
            this.setData(a({}, "offset", this.data.offset + this.data.limit)), this.funcLoadData(!1, "next");
        }
    },
    onShareAppMessage: function() {}
});