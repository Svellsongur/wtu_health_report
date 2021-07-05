function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = getApp(), o = require("../../utils/util.js"), i = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        showDialog: !1,
        flags: !1,
        user_id: "",
        form_id: "",
        form_info: {},
        toptips: {
            show: !1,
            type: "",
            msg: ""
        },
        pageWait: !0,
        xxtx_judge: !1,
        tjcg_judge: !0,
        params: {
            zzcn: !1
        },
        data: [],
        splc_list: [],
        look_all: {}
    },
    get_form_info: function() {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var t = this, a = {
            username: e.globalData.yhm,
            form_id: t.data.form_id
        };
        o.post(i.load_wdbd_form, a).then(function(a) {
            wx.hideLoading();
            var e = [];
            for (var o in a.form_info.approvals) {
                var i = a.form_info.approvals[o];
                e.push({
                    index: o,
                    role: i.type,
                    desc: i.sum || i.type,
                    mark: -1 !== i.sum.indexOf("或") ? "huo" : "yu",
                    who: [],
                    all: []
                }), (i.name || i.multi_names).split(",").map(function(t, a) {
                    t = t || "-", a < 2 && e[o].who.push({
                        shortname: t.slice(-2),
                        fullname: t
                    }), e[o].all.push({
                        shortname: t.slice(-2),
                        fullname: t
                    });
                });
            }
            t.setData({
                form_info: a.form_info,
                splc_list: e,
                pageWait: !1
            });
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack();
            }, 800);
        });
    },
    pickerChange: function(t) {
        var e = this, i = t.detail.filed, n = t.detail.time, s = t.detail.widgetsindex, r = t.detail.value, l = t.detail.files;
        e.data.form_info.layouts.forEach(function(t, f) {
            t.widgets.forEach(function(t, c) {
                if (t.widget_id == i && c == s) {
                    var d = "form_info.layouts[" + f + "].widgets[" + c + "].answer";
                    if ("checkbox" == t.type) e.setData(a({}, d, r)); else if ("date" == t.type && n) if ("rq" == n) if (t.answer[0]) {
                        var u = t.answer[0].split(" ");
                        e.setData(a({}, d, [ r + " " + u[1] ]));
                    } else e.setData(a({}, d, [ r + " 00:00" ])); else if (t.answer[0]) {
                        var m = t.answer[0].split(" ");
                        e.setData(a({}, d, [ m[0] + " " + r ]));
                    } else {
                        var h = o.formatTime(new Date(), "-");
                        e.setData(a({}, d, [ h.split(" ")[0] + " " + r ]));
                    } else if ("select" != t.type || t.region) "image" == t.type ? e.setData(a({}, d, l)) : t.region ? e.setData(a({}, d, r)) : e.setData(a({}, d, [ r ])); else {
                        var g = t.zdz[r].id;
                        e.setData(a({}, d, [ g ]));
                    }
                }
            });
        });
    },
    zzcnChange: function(t) {
        var a = this.data.params, e = t.detail.value[0] || "";
        a.zzcn = e, this.setData({
            params: a
        });
    },
    funcLookAll: function(t) {
        this.setData({
            showDialog: !0,
            look_all: t.currentTarget.dataset
        });
    },
    closeDialog: function(t) {
        this.setData({
            showDialog: !1
        });
    },
    funcTJ: function(t) {
        var a = this;
        if (!a.data.flags) {
            a.setData({
                flags: !0
            });
            var n = !1;
            if (a.data.params.zzcn) {
                var s = {
                    user_id: a.data.user_id,
                    form_id: a.data.form_info.form_id,
                    kj_data: []
                }, r = [];
                a.data.form_info.layouts.forEach(function(t, e) {
                    if (t.is_component) {
                        var o = [], i = t.kjsl;
                        t.widgets.forEach(function(t, e) {
                            e % i == 0 && o.push([]);
                            var s = t.widget_id, l = t.answer ? t.answer : "";
                            "image" === t.type && 0 !== l.length && l.forEach(function(t) {
                                r.push({
                                    filed: s,
                                    file_path: t
                                });
                            }), "checkbox" == t.type ? o[Math.floor(e / i)].push({
                                kjid: s,
                                value: l
                            }) : t.region ? o[Math.floor(e / i)].push({
                                kjid: s,
                                value: l.join(",")
                            }) : o[Math.floor(e / i)].push({
                                kjid: s,
                                value: l.join("")
                            });
                            var f = /^1[3456789]\d{9}$/;
                            !n && t.required && t.answer[0] && "手机号" == t.title && !f.test(t.answer[0]) && (n = !0, 
                            a.setData({
                                flags: !1
                            }), wx.showModal({
                                title: "提示",
                                content: "请输入正确的手机号！",
                                success: function(t) {
                                    t.confirm || t.cancel;
                                }
                            })), n || !t.required || t.answer[0] || (n = !0, a.setData({
                                flags: !1
                            }), wx.showModal({
                                title: "提示",
                                content: t.title + "不能为空！",
                                success: function(t) {
                                    t.confirm || t.cancel;
                                }
                            }));
                        }), s.kj_data.push({
                            component_id: t.component_id,
                            value: o
                        });
                    } else t.widgets.forEach(function(t, e) {
                        var o = t.widget_id, i = t.answer ? t.answer : "";
                        "image" === t.type && 0 !== i.length && i.forEach(function(t) {
                            r.push({
                                filed: o,
                                file_path: t
                            });
                        }), "checkbox" == t.type ? s.kj_data.push({
                            kjid: o,
                            value: i
                        }) : t.region ? s.kj_data.push({
                            kjid: o,
                            value: i.join(",")
                        }) : s.kj_data.push({
                            kjid: o,
                            value: i.join("")
                        }), n || !t.required || t.answer[0] || (n = !0, a.setData({
                            flags: !1
                        }), wx.showModal({
                            title: "提示",
                            content: t.title + "不能为空！",
                            success: function(t) {
                                t.confirm || t.cancel;
                            }
                        }));
                    });
                });
                var l = {
                    form_id: a.data.form_id,
                    yhm: e.globalData.yhm,
                    yhlx: e.globalData.yhlx,
                    jkklx: a.data.jkklx,
                    jkmwybs: e.globalData.jkmwybs,
                    get_card: 0,
                    objs: JSON.stringify(s)
                };
                n || (wx.showLoading({
                    title: "提交中...",
                    mask: !0
                }), o.post(i.submit_wdbd_form, l).then(function(t) {
                    var e = t.record_id;
                    Promise.all(r.map(function(t, o) {
                        return new Promise(function(o, n) {
                            wx.uploadFile({
                                url: i.upload_image,
                                name: "file",
                                filePath: t.file_path,
                                formData: {
                                    record_id: e,
                                    widget_id: t.filed,
                                    form_id: a.data.form_id
                                },
                                header: {
                                    Authorization: wx.getStorageSync("token")
                                },
                                success: function(t) {
                                    var a = JSON.parse(t.data);
                                    "0x00000000" === a.errorCode ? o(a) : n(a);
                                },
                                fail: function(t) {
                                    n(message);
                                },
                                complete: function(t) {}
                            });
                        });
                    })).then(function(t) {
                        wx.hideLoading({
                            complete: function(t) {}
                        }), a.setData({
                            xxtx_judge: !a.data.xxtx_judge,
                            tjcg_judge: !a.data.tjcg_judge
                        });
                    }).catch(function(t) {
                        a.setData({
                            flags: !1
                        }), console.log("error", t), wx.hideLoading({
                            complete: function(t) {}
                        }), wx.showToast({
                            title: "图片上传失败",
                            icon: "none"
                        });
                    });
                }).catch(function(t) {
                    a.setData({
                        flags: !1
                    }), wx.showToast({
                        title: t,
                        icon: "none"
                    });
                }));
            } else wx.showToast({
                title: "请仔细阅读并勾选郑重承诺！",
                icon: "none"
            }), a.setData({
                flags: !1
            });
        }
    },
    componentAdd: function(a) {
        var e = this, o = a.detail.component_id, i = a.detail.kjsl, n = e.data.form_info;
        n.layouts.forEach(function(a, e) {
            if (a.component_id == o) {
                wx.setStorageSync("form_component", a.widgets);
                var n = a.widgets.slice(0, i);
                n.forEach(function(t) {
                    t.answer = [];
                }), a.widgets = [].concat(t(wx.getStorageSync("form_component")), t(n));
            }
        }), e.setData({
            form_info: n
        });
    },
    componentDel: function(t) {
        var a = this, e = t.detail.component_id, o = t.detail.kjsl, i = t.detail.delindex, n = a.data.form_info;
        n.layouts.forEach(function(t, a) {
            t.component_id == e && t.widgets.splice(i, o);
        }), a.setData({
            form_info: n
        });
    },
    funcLjjh: function(t) {
        wx.navigateTo({
            url: "userCenter"
        });
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            form_id: t.form_id,
            flags: !1
        }), wx.setNavigationBarTitle({
            title: t.bdmc
        }), a.get_form_info();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});