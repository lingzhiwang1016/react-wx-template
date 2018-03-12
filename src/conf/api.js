import config from "@/conf/config";

export default {
  user_info: config.api + "/user/getUserInfo", // 用户信息

  captcha_for_bind: config.api + "/captcha/bind_merchant_wechat_user", // 图形验证码
  smscode: config.api + "/sms/send/:telephone/:type", // 手机验证码
};
