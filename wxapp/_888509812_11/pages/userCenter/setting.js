var n = getApp();

Page({
    data: {
        type: "",
        dialog_show: !1,
        environment: !0,
        dialog_buttons: [ {
            text: "取消"
        }, {
            text: "确定"
        } ]
    },
    func_dialog_button: function(t) {
        this.setData({
            dialog_show: !1
        }), "确定" === t.detail.item.text && (n.globalData.isLogin = !1, wx.setStorageSync("token", ""), 
        n.globalData.userInfo = null, wx.reLaunch({
            url: "/pages/login/login"
        }));
    },
    onLoad: function(n) {
        var t = this;
        wx.getSystemInfo({
            success: function(n) {
                n.environment ? t.setData({
                    environment: !0
                }) : t.setData({
                    environment: !1
                });
            }
        });
    },
    funcExit: function(n) {
        this.setData({
            dialog_show: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});