function a(a, t, i) {
    return t in a ? Object.defineProperty(a, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = i, a;
}

var t = getApp(), i = require("../../utils/util.js"), s = require("../../utils/api/guardApi.js");

Page({
    data: {
        navbarData: {
            title: "扫码登记",
            bgcolor: "",
            color: ""
        },
        statusBarHeight: t.globalData.statusBarHeight,
        selected: 0,
        selectedColor: "#0080EF",
        params: {
            limit: 10,
            offset: 0,
            username: "",
            yhlx: "",
            keyword: ""
        },
        total: 0,
        searchVal: "",
        showDialog: !1,
        filter_lx: [],
        cw_data: [],
        inputShowed: !1,
        inputVal: "",
        loading: !1
    },
    input: function(t) {
        var i, s = t.detail.value;
        this.setData((i = {}, a(i, "params.keyword", s), a(i, "params.offset", 0), i));
    },
    clear: function(t) {
        this.setData(a({}, "params.keyword", "")), this.scan_record_list();
    },
    scan_record_list: function(a) {
        if (!this.data.flag) {
            this.setData({
                flag: !0
            }), wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var t = this, o = t.data.params;
            i.post(s.scan_record_list, o).then(function(i) {
                wx.hideLoading();
                var s = i.rows;
                t.setData({
                    cw_data: a ? t.data.cw_data.concat(s) : s,
                    total: i.total,
                    flag: !1
                });
            }).catch(function(a) {
                wx.hideLoading(), t.setData({
                    flag: !1
                }), wx.showToast({
                    title: a,
                    icon: "none"
                });
            });
        }
    },
    scan_record_filter: function() {
        var a = this, o = {
            username: t.globalData.yhm
        };
        i.post(s.scan_record_filter, o).then(function(t) {
            a.setData({
                filter_lx: t.data[0] ? t.data[0].value : []
            });
        }).catch(function(a) {
            wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    funcSearch: function(a) {
        0 != this.data.total && this.scan_record_list();
    },
    func_scan: function(a) {
        wx.scanCode({
            complete: function(a) {
                "scanCode:ok" == a.errMsg ? wx.navigateTo({
                    url: "/pages/guard/detail?jkmwybs=" + a.result
                }) : wx.showToast({
                    title: "二维码识别失败！",
                    icon: "none"
                });
            }
        });
    },
    closeDialog: function(a) {
        this.setData({
            showDialog: !1
        });
    },
    func_dialog: function(a) {
        this.setData({
            hideSearch: !0,
            showDialog: !0
        });
    },
    func_active_lx: function(t) {
        var i, s = t.currentTarget.dataset.id;
        this.setData((i = {}, a(i, "params.yhlx", s), a(i, "params.offset", 0), i));
    },
    func_dialog_cancle: function(a) {
        this.setData({
            showDialog: !1
        });
    },
    func_dialog_confirm: function(a) {
        this.setData({
            showDialog: !1
        }), this.scan_record_list();
    },
    funcDetail: function() {
        var t;
        this.setData((t = {}, a(t, "params.limit", 10), a(t, "params.offset", 0), t)), wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }), this.scan_record_list(), this.scan_record_filter();
    },
    onLoad: function(i) {
        t.editTabBar(wx.getStorageSync("sfbw")), this.setData(a({}, "params.username", t.globalData.yhm)), 
        this.scan_record_list(), this.scan_record_filter();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this.data.params.offset / this.data.params.limit + 1, i = Math.ceil(this.data.total / this.data.params.limit);
        if (!this.data.flag && t < i) {
            this.setData(a({}, "params.offset", this.data.params.offset + this.data.params.limit)), 
            this.scan_record_list("next");
        }
    },
    onShareAppMessage: function() {}
});