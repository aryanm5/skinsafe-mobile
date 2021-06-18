/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const blacklist = require('metro-config/src/defaults/blacklist');

// get defaults assetExts array
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts;

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: [...defaultAssetExts, 'png', 'bin', 'json', 'h5'],
    blacklistRE: blacklist([/platform_node/]),
  },
};
