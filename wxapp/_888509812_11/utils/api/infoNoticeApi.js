var e = getApp().globalData.ApiRootUrl;

module.exports = {
    getOneMessageInfo: e + "/health/announcement/getOneMessageInfo/",
    getMessageCount: e + "/health/announcement/getMessageList/",
    maskAsRead: e + "/health/announcement/maskAsRead/",
    wd_getOneMessageInfo: e + "/health/myMessage/getOneMessageInfo/",
    wd_getMessageCount: e + "/health/myMessage/getMessageList/",
    wd_maskAsRead: e + "/health/myMessage/maskAsRead/",
    sp_getMessageCount: e + "/health/approveNotice/getMessageList/",
    sp_getNoticeState: e + "/health/approveNotice/getNoticeState/"
};