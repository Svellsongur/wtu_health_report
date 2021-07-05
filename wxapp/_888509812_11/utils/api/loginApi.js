var e = getApp().globalData.ApiRootUrl;

module.exports = {
    wx_login_in: e + "/login/wx_login_in/",
    wx_qy_login_in: e + "/login/qywx_login_in/",
    get_public_key: e + "/commonInterface/get_public_key/",
    change_pwd: e + "/commonInterface/change_pwd/",
    send_sms_captcha: e + "/commonInterface/send_sms_captcha/",
    reset_pwd: e + "/commonInterface/reset_pwd/"
};