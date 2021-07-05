var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function(e) {
    function n(t) {
        if (r[t]) return r[t].exports;
        var o = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }
    var r = {};
    return n.m = e, n.c = r, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, n.t = function(e, r) {
        if (1 & r && (e = n(e)), 8 & r) return e;
        if (4 & r && "object" === (void 0 === e ? "undefined" : t(e)) && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & r && "string" != typeof e) for (var u in e) n.d(o, u, function(t) {
            return e[t];
        }.bind(null, u));
        return o;
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return n.d(e, "a", e), e;
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 2);
}({
    2: function(t, e, n) {
        Component({
            options: {
                addGlobalClass: !0,
                multipleSlots: !0
            },
            properties: {
                title: {
                    type: String,
                    value: ""
                },
                subtitle: {
                    type: String,
                    value: ""
                }
            },
            relations: {
                "../cells/cells": {
                    type: "descendant",
                    linked: function(t) {
                        this.data.firstItem || (this.data.firstItem = t), t !== this.data.firstItem && t.setOuterClass("weui-cells__group_wxss");
                    }
                }
            },
            data: {
                firstItem: null
            }
        });
    }
});