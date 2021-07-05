var a = getApp(), e = require("../../utils/util.js"), t = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        splc_cls: "hide",
        user_info: {},
        baseInfo: {
            yhm: "",
            xm: "",
            zt: "",
            title: "",
            form_id: "",
            approval_id: "",
            ssz: "",
            ssbm: "",
            can_cancle: !1
        },
        xx_data: []
    },
    previewImage: function(a) {
        var e = a.currentTarget.dataset.url, t = a.currentTarget.dataset.list;
        wx.previewImage({
            urls: t,
            current: e
        });
    },
    funcLoadData: function(n) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = this;
        e.post(t.load_wdspxq_data, {
            username: a.globalData.yhm,
            approval_id: n.approval_id
        }).then(function(e) {
            wx.hideLoading();
            var t = e.layouts, r = e.approvals, s = [];
            t.map(function(a) {
                var e = a.widgets;
                for (var t in e) if ("select" === e[t].type || "radio" === e[t].type || "checkbox" === e[t].type) {
                    var n = [];
                    for (var r in e[t].zdz) for (var i in e[t].answer) if (e[t].answer[i] === e[t].zdz[r].id) {
                        -1 === n.indexOf(e[t].answer[i]) && n.push(e[t].zdz[r].text);
                        break;
                    }
                    s.push({
                        key: e[t].title,
                        value: n.join(",") || "-",
                        title: a.is_component && t % a.kjsl == 0 ? a.component_name + "(" + (Math.floor(t / a.kjsl) + 1) + ")" : ""
                    });
                } else if ("image" === e[t].type) {
                    var l = e[t].answer.map(function(a) {
                        return o.data.serverUrl + a;
                    });
                    s.push({
                        key: e[t].title,
                        value: l,
                        type: e[t].type,
                        title: a.is_component && t % a.kjsl == 0 ? a.component_name : ""
                    });
                } else s.push({
                    key: e[t].title,
                    value: e[t].answer[0] || "-",
                    title: a.is_component && t % a.kjsl == 0 ? a.component_name + "(" + (Math.floor(t / a.kjsl) + 1) + ")" : ""
                });
            }), o.setData({
                splc_cls: 1 == n.tab_index ? "hide" : "show",
                user_info: a.globalData.userInfo,
                baseInfo: {
                    yhm: a.globalData.yhm,
                    xm: e.fqr,
                    zt: e.zt,
                    title: e.form_title,
                    branch: e.branch,
                    form_id: e.form_id,
                    approval_id: n.approval_id,
                    ssz: n.ssz,
                    ssbm: n.ssbm,
                    can_cancel: e.can_cancel
                },
                jbxx: s.slice(0, 6),
                jbxx_all: s,
                splc: r
            });
        }).catch(function(a) {
            wx.hideLoading(), console.log("error", a);
        });
    },
    onLoad: function(e) {
        this.setData({
            serverUrl: a.globalData.ApiRootUrl
        }), this.funcLoadData(e);
    },
    funcDeal: function(a) {
        var e = a.currentTarget.dataset;
        wx.redirectTo({
            url: "deal?" + e.params
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});