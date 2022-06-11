const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
      extras: ["fontawesome-v6"],
    },
  },
});
