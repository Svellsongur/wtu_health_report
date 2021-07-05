function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../utils/util.js"), i = require("../../utils/api/healthCardApi.js");

Page({
    data: {
        form_info: {},
        showTopTips: !1,
        xxtx_judge: !1,
        tjcg_judge: !0,
        wyyzbsb: !1
    },
    get_form_info: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var t = this, a = {
            yhm: "20160101160114",
            yhlx: "student",
            jkmwybs: "redbird@student@3bc5501e-847c-11ea-8b1c-74e5f93fc216",
            get_card: 0
        };
        e.post(i.get_form_info, a).then(function(a) {
            wx.hideLoading(), t.setData({
                form_info: a.form_info
            });
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none"
            });
        });
    },
    checkboxChange: function(t) {
        var a = this;
        a.setData({
            wyyzbsb: !a.data.wyyzbsb
        });
    },
    PickerChange: function(a) {
        var i = this, n = a.detail.filed, o = a.detail.time, s = a.detail.value;
        i.data.form_info.layouts.forEach(function(a, c) {
            a.widgets.forEach(function(a, f) {
                if (a.widget_id == n) {
                    var r = "form_info.layouts[" + c + "].widgets[" + f + "].answer";
                    if ("checkbox" == a.type) i.setData(t({}, r, s)); else if ("date" == a.type && o) if ("rq" == o) if (a.answer[0]) {
                        var l = a.answer[0].split(" ");
                        i.setData(t({}, r, [ s + " " + l[1] ]));
                    } else i.setData(t({}, r, [ s + " 00:00" ])); else if (a.answer[0]) {
                        var u = a.answer[0].split(" ");
                        i.setData(t({}, r, [ u[0] + " " + s ]));
                    } else {
                        var d = e.formatTime(new Date(), "-");
                        i.setData(t({}, r, [ d.split(" ")[0] + " " + s ]));
                    } else if ("select" != a.type || a.region) a.region ? i.setData(t({}, r, s)) : i.setData(t({}, r, [ s ])); else {
                        var h = a.zdz[s].id;
                        i.setData(t({}, r, [ h ]));
                    }
                }
            });
        });
    },
    funcTJ: function(t) {
        var n = this, o = !1;
        if (n.data.wyyzbsb) {
            var s = {
                user_id: n.data.user_id,
                form_id: n.data.form_info.form_id,
                kj_data: []
            };
            n.data.form_info.layouts.forEach(function(t, a) {
                t.widgets.forEach(function(t, a) {
                    var e = t.widget_id, i = t.answer ? t.answer : "";
                    "checkbox" == t.type ? s.kj_data.push({
                        kjid: e,
                        value: i
                    }) : t.region ? s.kj_data.push({
                        kjid: e,
                        value: i.join(",")
                    }) : s.kj_data.push({
                        kjid: e,
                        value: i.join("")
                    }), o || !t.required || t.answer[0] || (o = !0, wx.showModal({
                        title: "提示",
                        content: t.title + "不能为空！",
                        success: function(t) {
                            t.confirm || t.cancel;
                        }
                    }));
                });
            });
            var c = {
                yhm: a.globalData.yhm,
                yhlx: a.globalData.yhlx,
                name: a.globalData.xm,
                jkklx: n.data.jkklx,
                jkmwybs: a.globalData.jkmwybs,
                get_card: 0,
                objs: JSON.stringify(s)
            };
            o || e.post(i.active_card, c).then(function(t) {
                n.setData({
                    xxtx_judge: !n.data.xxtx_judge,
                    tjcg_judge: !n.data.tjcg_judge
                });
            }).catch(function(t) {
                wx.showToast({
                    title: t,
                    icon: "none"
                });
            });
        } else wx.showToast({
            title: "请勾选：我已阅知本申报所列事项，并保证以上申报内容正确属实。",
            icon: "none"
        });
    },
    funcLjjh: function(t) {
        wx.navigateTo({
            url: "healthCard?new=1"
        });
    },
    uploading: function(t) {
        var a = this, e = t.i ? t.i : 0, i = t.success ? t.succcess : 0, n = t.fail ? t.fail : 0;
        t.imgpic;
        wx.uploadFile({
            url: t.url,
            filePath: t.path[e],
            name: "file",
            formData: {},
            success: function(t) {
                i++;
            },
            fail: function(t) {
                n++;
            },
            complete: function() {
                ++e == t.path.length ? console.log("成功：" + i + " 失败：" + n) : (t.i = e, t.success = i, 
                t.fail = n, a.uploading(t));
            }
        });
    },
    onLoad: function(t) {
        this.setData({
            user_id: t.user_id,
            jkklx: t.jkklx
        }), this.get_form_info();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});