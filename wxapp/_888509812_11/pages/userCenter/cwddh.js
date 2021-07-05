var t = getApp();

require("../../utils/util.js"), require("../../utils/api/healthCardApi.js");

Page({
    data: {
        dhShow: !1,
        flag: !1,
        stitle: "武昌站",
        latitude: "",
        longitude: "",
        dh_latitude: "",
        dh_longitude: "",
        dh_name: "",
        scale: 10,
        markers: [],
        distanceArr: []
    },
    onReady: function(t) {
        this.mapCtx = wx.createMapContext("myMap");
    },
    onLoad: function(t) {
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                e.createMarker(t);
                e.setData({
                    latitude: t.latitude,
                    longitude: t.longitude,
                    markers: e.getMarkers()
                });
            }
        });
    },
    markertap: function(t) {
        var e = this;
        this.data.markers.forEach(function(a) {
            t.markerId == a.id && e.setData({
                dh_latitude: a.latitude,
                dh_longitude: a.longitude,
                dh_name: a.address
            });
        }), this.setData({
            dhShow: !0
        });
    },
    getMarkers: function() {
        var e = [], a = !0, r = !1, i = void 0;
        try {
            for (var d, n = t.globalData.addrList[Symbol.iterator](); !(a = (d = n.next()).done); a = !0) {
                var o = d.value, u = this.createMarker(o);
                e.push(u);
            }
        } catch (t) {
            r = !0, i = t;
        } finally {
            try {
                !a && n.return && n.return();
            } finally {
                if (r) throw i;
            }
        }
        return e;
    },
    onGuideTap: function(t) {
        var e = Number(t.currentTarget.dataset.latitude), a = Number(t.currentTarget.dataset.longitude), r = t.currentTarget.dataset.bankname;
        wx.openLocation({
            type: "gcj02",
            latitude: e,
            longitude: a,
            name: r,
            scale: 28
        });
    },
    createMarker: function(t) {
        var e = t.wd, a = t.jd;
        return {
            iconPath: "/resources/icon-zbd.png",
            id: t.id || 0,
            name: t.mc || "",
            latitude: e,
            longitude: a,
            address: t.wz || "",
            width: 25,
            height: 32,
            callout: {
                content: t.wz || "",
                color: "#ffffff",
                fontSize: 12,
                borderRadius: 6,
                bgColor: "#000000",
                borderColor: "#000000",
                padding: 5,
                display: "ALWAYS"
            }
        };
    },
    funcHide: function(t) {
        this.setData({
            dhShow: !1
        });
    }
});