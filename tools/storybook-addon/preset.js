// @ts-nocheck
module.exports = require('./dist/umd/index.js');

/**
 * We also export named arrays for any files we want to use for default
 * `preview.js` and `manager.js` settings
 */
module.exports.previewAnnotations = [require.resolve('./dist/umd/preview.js')];
module.exports.managerEntries = [require.resolve('./dist/umd/manager.js')];
