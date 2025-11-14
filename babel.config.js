module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ha korábban 'react-native-reanimated/plugin' szerepelt, cseréld erre:
      "react-native-worklets/plugin"
    ],
  };
};
