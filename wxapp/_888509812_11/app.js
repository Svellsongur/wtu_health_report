function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

App({
    onLaunch: function() {
        var e = this;
        this.autoUpdate(), wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        e.globalData.userInfo = t.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(t);
                    }
                });
            }
        });
    },
    editTabBar: function(t) {
        var a = getCurrentPages(), n = a[a.length - 1], o = n.__route__;
        0 != o.indexOf("/") && (o = "/" + o);
        for (var s = this.globalData.tabBar_list, c = [], i = 0; i < s.length; i++) s[i].active = !1, 
        s[i].pagePath == o && (s[i].active = !0), (t || "扫码登记" != s[i].text) && c.push(s[i]);
        s = c, n.setData(e({}, "tabBar.list", s));
    },
    autoUpdate: function() {
        if (wx.canIUse("getUpdateManager")) {
            var e = wx.getUpdateManager();
            e.onCheckForUpdate(function(t) {
                t.hasUpdate && wx.showModal({
                    title: "版本更新",
                    showCancel: !1,
                    content: "新版本来咯，立即下载并重启小程序？",
                    success: function(t) {
                        t.confirm && (wx.showLoading(), e.onUpdateReady(function() {
                            wx.hideLoading(), wx.clearStorage({
                                success: function(e) {},
                                fail: function(e) {
                                    wx.showModal({
                                        title: "温馨提示",
                                        content: "缓存清理失败，请删除当前小程序，进行清理哦"
                                    });
                                },
                                complete: function(t) {
                                    e.applyUpdate();
                                }
                            });
                        }), e.onUpdateFailed(function() {
                            wx.hideLoading(), wx.showModal({
                                title: "版本更新",
                                content: "新版本来咯，请删除当前小程序进行升级"
                            });
                        }));
                    }
                });
            });
        } else wx.showModal({
            title: "温馨提示",
            content: "当前微信版本过低，无法使用更新功能，请升级微信后重试。"
        });
    },
    globalData: {
        ApiRootUrl: "https://jk.wtu.edu.cn",
        userInfo: {
            avatarUrl: null
        },
        xm: "",
        yhlx: "",
        jkklx: "",
        sfbw: !1,
        jkmwybs: "",
        yhm: "",
        isLogin: !1,
        statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
        tabBar: {
            color: "#333333",
            borderStyle: "white",
            selectedColor: "#0080EF",
            backgroundColor: "#fff",
            list: [],
            position: "bottom"
        },
        tabBar_list: [ {
            text: "畅行码",
            iconPath: "/resources/tab-jkk@2x.png",
            selectedIconPath: "/resources/tab-jkk-active@2x.png",
            pagePath: "/pages/healthCard/healthCard",
            clas: "menu-item",
            selected: !1
        }, {
            text: "扫码登记",
            iconPath: "/resources/tab-sys@2x.png",
            selectedIconPath: "/resources/tab-sys-active@2x.png",
            pagePath: "/pages/guard/index",
            clas: "menu-item",
            selected: !1
        }, {
            text: "信息公告",
            iconPath: "/resources/tab-xxgg@2x.png",
            selectedIconPath: "/resources/tab-xxgg-active@2x.png",
            dot: !0,
            pagePath: "/pages/infoNotice/infoNotice",
            clas: "menu-item",
            selected: !1
        }, {
            text: "我的",
            iconPath: "/resources/tab-wd@2x.png",
            selectedIconPath: "/resources/tab-wd-active@2x.png",
            pagePath: "/pages/userCenter/userCenter",
            clas: "menu-item menu-item2",
            selected: !1
        } ]
    }
});