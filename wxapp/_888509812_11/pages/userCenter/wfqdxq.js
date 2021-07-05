var t = getApp(), e = require("../../utils/util.js"), a = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        user_info: {},
        showMoreBtn: !0,
        fqrxm: "",
        spbh: "",
        spzt: "",
        can_cancel: !1,
        dialog_show: !1,
        dialog_buttons: [ {
            text: "取消"
        }, {
            text: "确定"
        } ],
        jbxx: [],
        jbxx_all: [],
        splc: []
    },
    funcRecallConfirm: function(t) {
        this.setData({
            dialog_show: !0
        });
    },
    funcRecall: function(n) {
        this.setData({
            dialog_show: !1
        }), "确定" === n.detail.item.text && (wx.showLoading({
            title: "正在撤销",
            mask: !0
        }), e.post(a.load_wfqdxq_recall, {
            username: t.globalData.yhm,
            spbh: this.data.spbh
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "撤销成功",
                icon: "success",
                mask: !0,
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3);
        }).catch(function(t) {
            wx.hideLoading(), console.log("error", t);
        }));
    },
    funcShowMore: function(t) {
        this.setData({
            showMoreBtn: !this.data.showMoreBtn
        });
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.list;
        wx.previewImage({
            urls: a,
            current: e
        });
    },
    funcLoadData: function(n) {
        var o = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), e.post(a.load_wfqdxq_data, {
            username: t.globalData.yhm,
            spbh: n.spbh
        }).then(function(e) {
            wx.hideLoading();
            var a = e.form_info, i = a.layouts, s = a.approvals, r = [];
            wx.setNavigationBarTitle({
                title: a.bdmc
            }), i.map(function(t) {
                var e = t.widgets;
                for (var a in e) if ("select" === e[a].type || "radio" === e[a].type || "checkbox" === e[a].type) {
                    var n = [];
                    if (e[a].region) n = e[a].answer; else for (var i in e[a].zdz) for (var s in e[a].answer) if (e[a].answer[s] === e[a].zdz[i].id) {
                        -1 === n.indexOf(e[a].answer[s]) && n.push(e[a].zdz[i].text);
                        break;
                    }
                    r.push({
                        key: e[a].title,
                        value: n.join(","),
                        type: e[a].type,
                        title: t.is_component && a % t.kjsl == 0 ? t.component_name : ""
                    });
                } else if ("image" === e[a].type) {
                    var l = e[a].answer.map(function(t) {
                        return o.data.serverUrl + t;
                    });
                    r.push({
                        key: e[a].title,
                        value: l,
                        type: e[a].type,
                        title: t.is_component && a % t.kjsl == 0 ? t.component_name : ""
                    });
                } else r.push({
                    key: e[a].title,
                    value: e[a].answer[0] || "",
                    type: e[a].type,
                    title: t.is_component && a % t.kjsl == 0 ? t.component_name + "(" + (Math.floor(a / t.kjsl) + 1) + ")" : ""
                });
            }), o.setData({
                user_info: t.globalData.userInfo,
                fqrxm: a.fqrxm,
                can_cancel: a.can_cancel,
                spbh: n.spbh,
                spzt: a.spzt,
                jbxx: r.slice(0, 6),
                jbxx_all: r,
                splc: s
            });
        }).catch(function(t) {
            wx.hideLoading(), console.log("error", t);
        });
    },
    onLoad: function(e) {
        this.setData({
            serverUrl: t.globalData.ApiRootUrl
        }), this.funcLoadData(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});