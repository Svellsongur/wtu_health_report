Page({
    data: {
        inputShowed: !1,
        inputVal: "",
        searchIndex: 0,
        searchList: [ "成员", "组织机构" ],
        orgUser: !1,
        orgList: [ {
            id: 1,
            text: "学工部"
        }, {
            id: 2,
            text: "教务处"
        }, {
            id: 3,
            text: "计算机学院"
        }, {
            id: 4,
            text: "艺术学院"
        }, {
            id: 5,
            text: "软件工程学院"
        }, {
            id: 6,
            text: "机械工程学院"
        } ],
        orgArr: [ {
            id: 1,
            text: "组织机构"
        } ],
        userList: [ {
            id: "001",
            text: "胡建跃",
            name: "建跃"
        }, {
            id: "002",
            text: "刘良",
            name: "刘良"
        }, {
            id: "003",
            text: "张来",
            name: "张来"
        }, {
            id: "004",
            text: "廖志群",
            name: "志群"
        }, {
            id: "005",
            text: "陈琪",
            name: "陈琪"
        }, {
            id: "006",
            text: "胡洁",
            name: "胡洁"
        } ]
    },
    onLoad: function(t) {
        this.setData({
            search: this.search.bind(this)
        });
    },
    search: function(t) {
        var e = this;
        return new Promise(function(n, a) {
            setTimeout(function() {
                n(t && 0 == e.data.searchIndex ? e.data.userList : []);
            }, 200);
        });
    },
    clear: function(t) {},
    selectResult: function(t) {
        wx.navigateTo({
            url: "approval"
        });
    },
    hideInput: function(t) {},
    handeSearch: function(t) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }), this.setData({
            searchIndex: t.currentTarget.dataset.index
        });
    },
    funcZzjg: function(t) {
        wx.navigateTo({
            url: "approval"
        });
    },
    funcNextOrg: function(t) {
        var e = t.currentTarget.dataset.id, n = t.currentTarget.dataset.text, a = this.data.orgArr;
        a.push({
            id: e,
            text: n
        }), this.setData({
            orgUser: !0,
            orgArr: a
        });
    },
    funcOrgBack: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            orgUser: !1,
            orgArr: [ {
                id: e,
                text: "组织机构"
            } ]
        });
    },
    input: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});