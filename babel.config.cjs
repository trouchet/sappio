module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "es2015",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
};
