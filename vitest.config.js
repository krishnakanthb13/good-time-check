const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    include: ["core/**/*.test.js"],
  },
});
