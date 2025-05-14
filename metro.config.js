const { getDefaultConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// If no custom transformer/resolver needed, no merge required
const customConfig = defaultConfig;

// Wrap with Reanimated config (if used)
module.exports = wrapWithReanimatedMetroConfig(customConfig);
