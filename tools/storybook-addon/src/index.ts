/**
 * We export named properties for the default StorybookConfig
 */

export {
  addons,
  core,
  docs,
  framework,
  managerHead,
  previewHead,
  staticDirs,
  stories,
  typescript,
  webpackFinal,
} from './main';

/**
 * We also export named arrays for any files we want to use for default
 * `preview.js` and `manager.js` settings
 */
export const previewAnnotations = [require.resolve('../dist/preview.js')];
export const managerEntries = [require.resolve('../dist/manager.js')];
