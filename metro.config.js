const { getDefaultConfig } = require('@expo/metro-config')

const config = getDefaultConfig(__dirname)

// Use react-native-svg-transformer for SVG imports
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer')

// Treat SVGs as source files, not assets
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg')
config.resolver.sourceExts = [...new Set([...(config.resolver.sourceExts || []), 'svg'])]

module.exports = config
