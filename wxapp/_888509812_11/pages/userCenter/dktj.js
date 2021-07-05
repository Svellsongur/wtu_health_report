var a = getApp(), t = require("../../utils/util.js"), n = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        total: {
            jzg_ydkrs: "-",
            jzg_zrs: "-",
            xs_ydkrs: "-",
            xs_zrs: "-"
        },
        jzg: {},
        xs: {}
    },
    funcLoadData: function(o) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var e = this, i = {
            yhm: a.globalData.yhm,
            rylx: "教职工"
        }, u = {
            yhm: a.globalData.yhm,
            rylx: "学生"
        }, r = n.getDkjd;
        Promise.all([ t.post(n.getConTotal, {
            yhm: a.globalData.yhm
        }), t.post(r, i), t.post(r, u) ]).then(function(a) {
            wx.hideLoading();
            var t = a[1] && a[1].axisData.map(function(t, n) {
                return {
                    name: t,
                    value: a[1].data[n]
                };
            }).sort(function(a, t) {
                return t.value - a.value;
            }), n = a[2] && a[2].axisData.map(function(t, n) {
                return {
                    name: t,
                    value: a[2].data[n]
                };
            }).sort(function(a, t) {
                return t.value - a.value;
            });
            e.setData({
                total: a[0],
                jzg: t,
                xs: n
            });
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
    onShareAppMessage: function() {}
});