module.exports = {
  ignore: [/\/core-js/],
  sourceType: "module",
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.22",
      },
    ],
  ],
};
