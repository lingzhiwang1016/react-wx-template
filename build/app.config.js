const baseCdnPrefix = "<%=projectName%>";
const cdnPath = "cdn-vk-html";
const oss = {
  region: "oss-cn-shenzhen",
  bucket: "vk-html",
  accessKeyId: "LTAIzhXQUPznwfoX",
  accessKeySecret: "YhfCxtRTgfPjTbYd4X2OI6J7gR8m78"
};

module.exports = {
  defaultConfig: {
    oss: oss
  },
  development: {
    cdn: false,
    assetsPublicPath: "/",
    cndPrefix: `${baseCdnPrefix}-dev`
  },
  alpha: {
    cdn: true,
    assetsPublicPath: `http://${cdnPath}.maysatech.com/${baseCdnPrefix}-alpha/`,
    cndPrefix: `${baseCdnPrefix}-alpha`
  },
  beta: {
    cdn: true,
    assetsPublicPath: `http://${cdnPath}.maysatech.com/${baseCdnPrefix}-beta/`,
    cndPrefix: `${baseCdnPrefix}-beta`
  },
  production: {
    cdn: true,
    assetsPublicPath: `http://${cdnPath}.maysatech.com/${baseCdnPrefix}-pro/`,
    cndPrefix: `${baseCdnPrefix}-pro`
  }
};

module.exports.config = Object.assign(module.exports.defaultConfig, module.exports[process.env.REACT_APP_PACK_ENV || "development"]);
