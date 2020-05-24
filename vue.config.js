var path = require("path");
module.exports = {
  publicPath: "/",
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://172.20.10.9:3000/api/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 把px单位换算成rem单位
          require("postcss-pxtorem")({
            rootValue: 75, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: [".van"], // 要忽略的选择器并保留为px。
            propList: ["*"], //可以从px更改为rem的属性。
            minPixelValue: 2, // 设置要替换的最小像素值。
          }),
        ],
      },
    },
  },

  chainWebpack: (config) => {
    // 自定义路径
    config.resolve.alias.set("@", path.join(__dirname, "src"));
  },

  pluginOptions: {
    i18n: {
      locale: "zh",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [],
    },
  },
};
