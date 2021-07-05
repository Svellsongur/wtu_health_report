var t = getApp(), a = require("../../utils/util.js"), n = require("../../utils/api/healthCardApi.js");

Page({
    data: {
        base_info: {
            "用户名": "2020031001",
            "姓名": "朱小雀",
            "身份证号": "420001200101010001",
            "所在院系": "信息工程学院",
            "所在专业": "计算机科学与技术",
            "所在年级": "2018级",
            "所在班级": "201801班"
        }
    },
    getUserinfo: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = this, i = {
            yhm: t.globalData.yhm,
            yhlx: t.globalData.yhlx,
            get_card: 0
        };
        a.post(n.get_user_info, i).then(function(t) {
            wx.hideLoading(), o.setData({
                base_info: t.data
            });
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none"
            });
        });
    },
    onLoad: function(a) {
        this.setData({
            yhlx: t.globalData.yhlx
        }), this.getUserinfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});