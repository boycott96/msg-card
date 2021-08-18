// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  publicPath: "./",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: "dist",
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "static",
  // webpack-dev-server 相关配置
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    proxy: {
      "/open-apis": {
        target: "https://open.feishu.cn",
        ws: true,
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "今日互联-发送消息卡片",
    },
  },
};
