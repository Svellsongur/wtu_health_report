var e = getApp(), a = require("../../utils/util.js"), t = require("../../utils/api/userCenterApi.js");

Page({
    data: {
        current: 0,
        max: 300,
        opinion: "",
        backHide: !1,
        checkbox_val: "",
        files: []
    },
    limit: function(e) {
        var a = e.detail.value, t = parseInt(a.length);
        t > this.data.noteMaxLen || this.setData({
            current: t,
            opinion: a
        });
    },
    checkboxChange: function(e) {
        this.setData({
            checkbox_val: e.detail.value[0] || ""
        });
    },
    funcBackMore: function(e) {
        this.setData({
            backHide: !0
        });
    },
    funcHidden: function(e) {
        this.setData({
            backHide: !1
        });
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "确认" + e.type
        }), this.setData({
            baseInfo: e
        });
    },
    chooseImage: function(e) {
        var a = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                a.setData({
                    files: a.data.files.concat(e.tempFilePaths)
                });
            }
        });
    },
    previewImage: function(e) {
        wx.previewImage({
            current: e.currentTarget.id,
            urls: this.data.files
        });
    },
    selectFile: function(e) {},
    uplaodFile: function(e) {
        return new Promise(function(e, a) {
            setTimeout(function() {
                a("some error");
            }, 1e3);
        });
    },
    uploadError: function(e) {
        console.log("upload error", e.detail);
    },
    uploadSuccess: function(e) {
        console.log("upload success", e.detail);
    },
    funcSumbit: function(i) {
        var n = "", o = {};
        "转交" === this.data.baseInfo.type ? (n = t.submit_wdspxq_deal_zj, o = {
            form_id: this.data.baseInfo.form_id,
            source_username: this.data.baseInfo.username,
            dest_username: "",
            opinion: this.data.opinion,
            checked: "1" === this.data.checkbox_val
        }) : (n = t.submit_wdspxq_deal_other, o = {
            username: e.globalData.yhm,
            form_id: this.data.baseInfo.form_id,
            approval_id: this.data.baseInfo.approval_id,
            branch: this.data.baseInfo.branch,
            sftg: this.data.baseInfo.type,
            opinion: this.data.opinion,
            checked: "1" === this.data.checkbox_val
        }), wx.showLoading({
            title: "加载中",
            mask: !0
        }), a.post(n, o).then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: e.message,
                duration: 2e3,
                icon: "success"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1,
                    complete: function(e) {}
                });
            }, 2e3);
        }).catch(function(e) {
            wx.hideLoading(), console.log("error", e);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        var e = getCurrentPages();
        e[e.length - 2].funcDelList(this.data.baseInfo.approval_id);
    },
    onShareAppMessage: function() {}
});