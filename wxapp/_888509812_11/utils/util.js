function o(o) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "GET";
    return new Promise(function(t, r) {
        wx.request({
            url: o,
            data: e,
            method: n,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: wx.getStorageSync("token")
            },
            success: function(g) {
                console.log("==============================================================================================="), 
                console.log("==    接口地址：" + o), console.log("==    接口参数：" + JSON.stringify(e)), 
                console.log("==    请求类型：" + n), console.log("==    接口状态：" + g.statusCode), console.log("==============================================================================================="), 
                "200" == g.statusCode ? "0x00000000" == g.data.errorCode ? t(g.data) : "0x00000014" == g.data.errorCode ? (wx.setStorageSync("token", ""), 
                r("登录已过期"), wx.showModal({
                    title: "提示",
                    content: "登录已过期，请立即登录，否则无法正常使用",
                    success: function(o) {
                        o.confirm ? (console.log("用户点击确定"), wx.navigateTo({
                            url: "/pages/login/login?toPageUrl=401"
                        })) : o.cancel && console.log("用户点击取消");
                    }
                })) : r(g.data.message) : r("请求失败：" + g.statusCode);
            },
            fail: function(t) {
                console.log("==============================================================================================="), 
                console.log("==    接口地址：" + o), console.log("==    接口参数：" + JSON.stringify(e)), 
                console.log("==    请求类型：" + n), console.log("==    服务器连接异常"), console.log("==============================================================================================="), 
                r("服务器连接异常，请检查网络再试");
            }
        });
    });
}

getApp();

var e = function(o) {
    return (o = o.toString())[1] ? o : "0" + o;
};

module.exports = {
    formatTime: function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date(), n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/", t = o.getFullYear(), r = o.getMonth() + 1, g = o.getDate(), l = o.getHours(), s = o.getMinutes(), i = o.getSeconds();
        return [ t, r, g ].map(e).join(n) + " " + [ l, s, i ].map(e).join(":");
    },
    formatWeek: function() {
        return [ "周天", "周一", "周二", "周三", "周四", "周五", "周六" ][(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date()).getDay()];
    },
    request: o,
    get: function(e) {
        return o(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, "GET");
    },
    post: function(e) {
        return o(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, "POST");
    },
    sub: function(o) {
        if (0 != o.length && void 0 != o) return o.length > 2 ? o.substring(0, 2) : o;
    },
    regexConfig: function() {
        return {
            userid: /^[A-Za-z0-9]+$/,
            phone: /^1(3|4|5|7|8)\d{9}$/,
            reg: /[\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]/,
            reg1: /\d/,
            reg2: /[a-zA-Z]/,
            reg3: /^[\da-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]{8,}$/
        };
    }
};