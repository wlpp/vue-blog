const path = require("path");

module.exports = {
  devServer: {
    open: false,
    host: "localhost",
    port: "8888",
    proxy: "http://localhost:3000",
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.join(__dirname, "src"));
  },
};
