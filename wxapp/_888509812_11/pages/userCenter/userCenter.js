function e(e, a, n) {
    return a in e ? Object.defineProperty(e, a, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = n, e;
}

var a = getApp(), n = require("../../utils/util.js"), t = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        navbarData: {
            title: "我的",
            bgcolor: "",
            color: ""
        },
        statusBarHeight: a.globalData.statusBarHeight,
        user_info: {},
        xm: "",
        my_list: {
            "推荐": [ {
                name: "健康打卡",
                url: "/pages/userCenter/jksb",
                icon: "wd_mrjk"
            }, {
                name: "进出记录",
                url: "/pages/userCenter/cwjl",
                icon: "wd_cwjl"
            }, {
                name: "测温导航",
                url: "/pages/userCenter/cwddh",
                icon: "wd_cwddh"
            }, {
                name: "扫一扫",
                url: "",
                icon: "wd_fxsq"
            } ],
            "我的表单": [ {
                name: "我的审批",
                url: "/pages/userCenter/approval",
                icon: "wd_wdsp"
            }, {
                name: "我发起的",
                url: "/pages/userCenter/wfqd",
                icon: "wd_wfqd"
            }, {
                name: "抄送我的",
                url: "/pages/userCenter/cswd",
                icon: "wd_cxsq"
            } ],
            "数据统计": [ {
                name: "返校查询",
                url: "/pages/userCenter/fxgl",
                icon: "wd_fxsq"
            }, {
                name: "出入明细",
                url: "/pages/userCenter/crmx",
                icon: "wd_crmx"
            }, {
                name: "今日打卡",
                url: "/pages/userCenter/dkcx",
                icon: "wd_dkcx"
            }, {
                name: "打卡统计",
                url: "/pages/userCenter/dktj",
                icon: "wd_dktj"
            } ]
        }
    },
    usercenter: function(e) {
        wx.navigateTo({
            url: "/pages/userCenter/setting"
        });
    },
    funcSys: function(e) {
        "未返校" != a.globalData.jkklx || "visitor" == a.globalData.yhlx ? wx.scanCode({
            complete: function(e) {
                "scanCode:ok" == e.errMsg ? wx.navigateTo({
                    url: "/pages/healthCard/register?ddid=" + e.result
                }) : wx.showToast({
                    title: "二维码识别失败！",
                    icon: "none"
                });
            }
        }) : wx.showModal({
            showCancel: !1,
            content: "visitor" == a.globalData.yhlx ? "访客暂不支持该功能" : "请返校后使用该功能"
        });
    },
    funcLoadData: function() {
        var e = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var r = {
            username: a.globalData.yhm
        };
        n.post(t.load_all_form, r).then(function(a) {
            wx.hideLoading();
            var n = e.data.my_list;
            n["我的表单"] = [ {
                name: "我的审批",
                url: "/pages/userCenter/approval",
                icon: "wd_wdsp"
            }, {
                name: "我发起的",
                url: "/pages/userCenter/wfqd",
                icon: "wd_wfqd"
            }, {
                name: "抄送我的",
                url: "/pages/userCenter/cswd",
                icon: "wd_cxsq"
            } ];
            for (var t in a.data) "jkksq" != a.data[t].id && "jkkgz" != a.data[t].id && n["我的表单"].unshift({
                name: a.data[t].bdmc,
                url: "/pages/userCenter/wdbd?form_id=" + a.data[t].id + "&bdmc=" + a.data[t].bdmc,
                iconCls: a.data[t].icon,
                icon: "icon-group-" + a.data[t].icon.slice(-2)
            });
            e.setData({
                my_list: n
            });
        }).catch(function(e) {
            wx.hideLoading(), console.log("error", e);
        });
    },
    get_addr: function() {
        n.post(t.get_thermometry_addr, {}).then(function(e) {
            wx.hideLoading(), a.globalData.addrList = e.rows;
        }).catch(function(e) {
            wx.hideLoading(), wx.showToast({
                title: e,
                icon: "none"
            });
        });
    },
    onLoad: function(e) {
        a.editTabBar(wx.getStorageSync("sfbw")), this.setData({
            yhlx: a.globalData.yhlx,
            yhm: a.globalData.yhm
        });
    },
    onReady: function() {},
    onShow: function() {
        if (this.setData({
            user_info: a.globalData.userInfo,
            xm: a.globalData.xm
        }), "visitor" == a.globalData.yhlx) if (a.globalData.bs) {
            var n;
            this.setData((n = {}, e(n, "my_list.推荐", [ {
                name: "健康打卡",
                url: "/pages/userCenter/jksb",
                icon: "wd_mrjk"
            }, {
                name: "进出记录",
                url: "/pages/userCenter/cwjl",
                icon: "wd_cwjl"
            }, {
                name: "测温导航",
                url: "/pages/userCenter/cwddh",
                icon: "wd_cwddh"
            }, {
                name: "扫一扫",
                url: "",
                icon: "wd_fxsq"
            } ]), e(n, "my_list.我的表单", []), n));
        } else {
            var t;
            this.setData((t = {}, e(t, "my_list.推荐", [ {
                name: "进出记录",
                url: "/pages/userCenter/cwjl",
                icon: "wd_cwjl"
            }, {
                name: "测温导航",
                url: "/pages/userCenter/cwddh",
                icon: "wd_cwddh"
            } ]), e(t, "my_list.我的表单", []), t));
        } else {
            if ("student" == a.globalData.yhlx) {
                var r;
                this.setData((r = {}, e(r, "my_list.推荐", [ {
                    name: "健康打卡",
                    url: "/pages/userCenter/jksb",
                    icon: "wd_mrjk"
                }, {
                    name: "进出记录",
                    url: "/pages/userCenter/cwjl",
                    icon: "wd_cwjl"
                }, {
                    name: "测温导航",
                    url: "/pages/userCenter/cwddh",
                    icon: "wd_cwddh"
                }, {
                    name: "扫一扫",
                    url: "",
                    icon: "wd_fxsq"
                } ]), e(r, "my_list.我的表单", [ {
                    name: "我发起的",
                    url: "/pages/userCenter/wfqd",
                    icon: "wd_wfqd"
                } ]), r));
            }
            this.funcLoadData();
        }
        this.get_addr();
    },
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});