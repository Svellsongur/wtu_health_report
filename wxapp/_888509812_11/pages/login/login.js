var a = getApp(), t = require("../../utils/api/loginApi.js");

require("../../utils/util.js"), require("../../utils/jsencrypt.js");

Page({
    data: {
        loginState: !0,
        userInfo: {},
        hasUserInfo: !1,
        username: "",
        password: "",
        rememberPassword: null,
        login_type: 1,
        privacy: !1,
        oneButton: [ {
            text: "确定"
        } ],
        showDialog: !1
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = this;
        o.setData({
            rememberPassword: wx.getStorageSync("rememberPassword"),
            username: wx.getStorageSync("username") || "",
            password: wx.getStorageSync("rememberPassword") ? wx.getStorageSync("password") : ""
        }), wx.getStorageSync("globalData") && (a.globalData = wx.getStorageSync("globalData")), 
        wx.getSystemInfo({
            success: function(e) {
                e.environment ? wx.qy.login({
                    success: function(e) {
                        e.code ? wx.request({
                            url: t.wx_qy_login_in,
                            data: {
                                code: e.code
                            },
                            method: "POST",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                "ok" == t.data.result ? (wx.setStorageSync("token", t.data.data.token), o.setData({
                                    isLogin: !0
                                }), a.globalData.isLogin = !0, a.globalData.yhlx = t.data.data.yhlx, a.globalData.yhm = t.data.data.username, 
                                a.globalData.xm = t.data.data.xm, wx.setStorageSync("sfbw", t.data.data.sfbw), wx.setStorageSync("globalData", a.globalData), 
                                wx.reLaunch({
                                    url: "/pages/healthCard/healthCard"
                                })) : wx.showToast({
                                    title: t.data.message,
                                    icon: "none"
                                });
                            }
                        }) : console.log("登录失败！" + e.errMsg);
                    }
                }) : wx.getStorageSync("token") ? wx.reLaunch({
                    url: "/pages/healthCard/healthCard"
                }) : (wx.login({
                    success: function(a) {
                        var t = a.code;
                        o.setData({
                            code: t,
                            loginState: !1
                        }), wx.setNavigationBarTitle({
                            title: "请登录"
                        }), wx.hideLoading();
                    }
                }), o.setData({
                    privacy: wx.getStorageSync("privacy")
                }));
            }
        });
    },
    getPhoneNumber: function(e) {
        var o = this;
        wx.login({
            success: function(n) {
                var s = n.code;
                o.setData({
                    code: s
                }), o.data.privacy ? "getPhoneNumber:ok" == e.detail.errMsg && wx.request({
                    url: t.wx_login_in,
                    data: {
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                        code: o.data.code,
                        login_type: 1
                    },
                    method: "POST",
                    header: {},
                    success: function(t) {
                        "ok" == t.data.result ? (wx.setStorageSync("token", t.data.data.token), o.setData({
                            isLogin: !0
                        }), a.globalData.isLogin = !0, a.globalData.yhlx = t.data.data.yhlx, a.globalData.yhm = t.data.data.username, 
                        a.globalData.xm = t.data.data.xm, wx.setStorageSync("sfbw", t.data.data.sfbw), wx.setStorageSync("globalData", a.globalData), 
                        wx.showToast({
                            title: "登录成功！",
                            icon: "none"
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "/pages/healthCard/healthCard"
                            });
                        }, 500)) : wx.showToast({
                            title: t.data.message,
                            icon: "none"
                        });
                    }
                }) : o.setData({
                    showDialog: !0
                });
            }
        });
    },
    privacyDialog: function(a) {
        this.setData({
            showDialog: !1
        });
    },
    checkboxChange: function(a) {
        wx.setStorageSync("privacy", !this.data.privacy), this.setData({
            privacy: wx.getStorageSync("privacy")
        });
    },
    funcService: function(a) {
        wx.navigateTo({
            url: "/pages/login/service"
        });
    },
    funcPrivacy: function(a) {
        wx.navigateTo({
            url: "/pages/login/privacy"
        });
    },
    onShow: function() {}
});