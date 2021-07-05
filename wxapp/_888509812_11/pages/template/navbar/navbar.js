var a = getApp();

Component({
    properties: {
        navbarData: {
            type: Object,
            value: {},
            observer: function(a, t) {}
        }
    },
    data: {
        height: "",
        navbarData: {
            showCapsule: 1
        }
    },
    attached: function() {
        this.setData({
            share: !1
        }), this.setData({
            height: a.globalData.statusBarHeight
        });
    },
    methods: {
        _navback: function(a) {
            a.currentTarget.dataset.back ? wx.navigateBack({
                delta: a.currentTarget.dataset.back
            }) : wx.navigateBack();
        },
        _backhome: function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});