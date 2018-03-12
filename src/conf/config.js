const config = {
  env: process.env.REACT_APP_PACK_ENV,
  json: "http://127.0.0.1:80",
  api: "http://service-d.vkcommerce.com/vankely-mp-member-api",
};

const envConfig = {
  development: {
    api: "http://service-d.vkcommerce.com/vankely-mp-member-api"
  },
  alpha: {
    api: "http://service-t.vkcommerce.com/vankely-mp-member-api"
  },
  beta: {
    api: "http://service-demo.vkcommerce.com/vankely-mp-member-api"
  },
  production: {
    api: "http://service.vkcommerce.com/vankely-mp-member-api"
  }
};

Object.assign(config, envConfig[config.env]);

const wxConfig = {
  // 微信的相关配置
  wxShareConfig: {
    title: "万科年会2017",
    desc: "万科年会2017-大吉大利",
    link: "http://annual.maysatech.com",
    imgUrl: "http://cdn-vk-html.maysatech.com/annual-wx-pro/share.jpg",
  },
  wxSignature: `${config.api}/wechat/jsapi/signature`,
  wxRedirectUrl: `${config.api}/wechat/redirect_url`, // 获得微信登录跳转链接
  wxTransToken: `${config.api}/wxToken`, // 获取微信token
  wxLogin: `${config.api}/fastLogin`, // 微信登录
  wxBind: `${config.api}/login`, // 微信绑定
  // 跳转的域名
  getProxyOrigin() {
    const code = this.getPublicCode();
    const state = config.env;
    if (state === "development") {
      return `http://${code}.member-d.vkcommerce.com`;
    } else if (state === "alpha") {
      return `http://${code}.member-d.vkcommerce.com`;
    } else if (state === "beta") {
      return `http://${code}.member-d.vkcommerce.com`;
    } else {
      return `http://${code}.member.vkcommerce.com`;
    }
  },
  // 根据状态，proxy需要跳转的新域名
  getOrigin(state) {
    const code = this.getPublicCode();
    if (state === "development") {
      return `http://${code}.member-d.vkcommerce.com`;
    } else if (state === "alpha") {
      return `http://${code}.member-t.vkcommerce.com`;
    } else if (state === "beta") {
      return `http://${code}.member-demo.vkcommerce.com`;
    } else {
      return `http://${code}.member.vkcommerce.com`;
    }
  },
  getPublicCode() {
    const hostname = window.location.hostname;
    return hostname.split(".")[0];
    // if (process.env.PACK_ENV === "production") {
    //     return "xm001";
    // } else if (process.env.PACK_ENV === "alpha") {
    //     return "xm001";
    // } else {
    //     return "xm001";
    // }
  },
};

Object.assign(config, wxConfig);

export default config;
