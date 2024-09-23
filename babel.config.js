module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "babel-plugin-module-resolver",
        {
          root: ["./"],
          alias: {
            "@env": "./env.js",
          },
        },
      ],
      [
        "babel-plugin-dotenv-import",
        {
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          blacklist: null,
          whitelist: null,
          systemVar: "overwrite",
        },
      ],
    ],
  };
};
