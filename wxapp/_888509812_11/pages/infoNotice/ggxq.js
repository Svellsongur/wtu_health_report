var t = require("../../utils/util.js"), a = require("../../utils/api/infoNoticeApi.js"), e = require("../../wxParse/wxParse.js");

Page({
    data: {
        flag: !1
    },
    getOneMessageInfo: function(n) {
        if (!this.data.flag) {
            wx.showLoading({
                title: "加载中",
                mask: !0
            }), this.setData({
                flag: !0
            });
            var i = this, s = {
                id: i.data.id
            };
            t.post(a.getOneMessageInfo, s).then(function(t) {
                wx.hideLoading(), i.setData({
                    flag: !1
                }), i.setData({
                    content: t.data
                });
                var a = "";
                a = (a = (a = t.data.content).replace("&lt;", "<")).replace("&gt;", ">"), e.wxParse("article", "html", a, i, 5);
            }).catch(function(t) {
                i.setData({
                    flag: !1
                }), wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        }
    },
    jump: function(t) {
        var a = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: "/pages/index/jumpOut?urls=" + a
        });
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.getOneMessageInfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});