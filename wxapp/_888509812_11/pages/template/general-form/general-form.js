Component({
    properties: {
        formInfo: {
            type: Object,
            value: {}
        },
        detail: {
            type: String,
            value: ""
        }
    },
    observers: {
        formInfo: function(e) {
            this.data.formInfo;
        }
    },
    data: {
        formInfo: {},
        file_list: {},
        canTap: !0
    },
    lifetimes: {
        attached: function() {
            this.setData({
                formInfo: this.properties.formInfo
            });
        }
    },
    ready: function() {},
    methods: {
        pickerChange: function(e) {
            var t = this, a = e.currentTarget.dataset.filed, i = e.detail.value, n = e.currentTarget.dataset.widgetsindex, r = e.currentTarget.dataset.time, s = [];
            t.triggerEvent("pickerChange", {
                filed: a,
                value: i,
                time: r,
                widgetsindex: n,
                files: s
            });
        },
        funcComponentAdd: function(e) {
            var t = this, a = e.target.dataset.componentid, i = e.target.dataset.kjsl;
            t.triggerEvent("ComponentAdd", {
                component_id: a,
                kjsl: i
            });
        },
        funcComponentDel: function(e) {
            var t = this, a = e.target.dataset.componentid, i = e.target.dataset.kjsl, n = e.target.dataset.delindex;
            t.triggerEvent("ComponentDel", {
                component_id: a,
                kjsl: i,
                delindex: n
            });
        },
        chooseImage: function(e) {
            var t = this, a = t.data.file_list, i = e.currentTarget.dataset.filed;
            if (t.data.canTap) {
                t.data.canTap = !1;
                var n = setTimeout(function() {
                    t.data.canTap = !0;
                }, 1e3);
                wx.chooseImage({
                    count: e.currentTarget.dataset.length,
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album" ],
                    success: function(e) {
                        var n = [];
                        for (var r in e.tempFiles) e.tempFiles[r].size <= 20971520 && n.push(e.tempFiles[r].path);
                        0 !== n.length ? (n.length !== e.tempFiles.length && wx.showToast({
                            icon: "none",
                            title: "部分图片超过20M，请重新选择",
                            mask: !0
                        }), a[i] ? 0 === a[i].length ? a[i] = n : a[i] = a[i].concat(n) : a[i] = n, a[i].length > 9 && (a[i] = a[i].slice(0, 9)), 
                        t.triggerEvent("pickerChange", {
                            filed: i,
                            value: "",
                            time: "",
                            widgetsindex: "",
                            files: a[i]
                        })) : wx.showToast({
                            icon: "none",
                            title: "所有图片均超过20M，不合格",
                            mask: !0
                        });
                    },
                    complete: function(e) {
                        clearTimeout(n), t.data.canTap = !0;
                    }
                });
            }
        },
        previewImage: function(e) {
            var t = this, a = e.currentTarget.dataset.filed, i = t.data.file_list[a];
            wx.previewImage({
                urls: i,
                current: e.currentTarget.dataset.url
            });
        },
        deleteImage: function(e) {
            var t = this;
            wx.showModal({
                title: "提示",
                content: "确定要删除这张图片吗？",
                cancelText: "取消",
                confirmText: "确定",
                success: function(a) {
                    var i = e.currentTarget.dataset.index, n = e.currentTarget.dataset.filed;
                    a.confirm && (t.data.file_list[n].splice(i, 1), t.setData({
                        file_list: t.data.file_list
                    })), t.triggerEvent("pickerChange", {
                        filed: n,
                        value: "",
                        time: "",
                        widgetsindex: "",
                        files: t.data.file_list[n]
                    });
                }
            });
        }
    }
});