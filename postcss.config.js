
/**
 * postcss設定
 */

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        "last 3 versions",
        "Android 4.0",
        "iOS >= 8",
        "ie 11"
      ]
    }),
  ]
};
