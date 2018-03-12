import request, { LogicError } from "@/utils/request";
import config from "@/conf/config";
import api from "@/conf/api";

export const redirectWeiXin = (redirectUrl, state, publicCode) => {
  return request(config.wxRedirectUrl, {
    method: "get",
    params: {
      url: redirectUrl,
      state: state,
      publicCode: publicCode,
    }
  });
};

export const currentUser = () => {
  return request(api.user_info, {
    method: "get",
    useToken: true
  });
};

export const getToken = (authCode, publicCode) => {
  return request(config.wxTransToken, {
    method: "get",
    params: {
      authCode,
      publicCode
    }
  });
};

export const weixinLogin = (wxToken) => {
  return request(config.wxLogin, {
    method: "post",
    params: {
      wxToken
    }
  });
};

export const bind = ({ telephone, smsCode, wxToken }) => {
  return request(config.wxBind, {
    method: "post",
    params: { telephone, smsCode, wxToken }
  });
};

export const smsCode = async (telephone, type) => {
  if (!telephone) {
    throw new LogicError("请输入手机号");
  }
  return request(api.smscode, {
    method: "get",
    path: {
      telephone,
      type
    }
  });
};
