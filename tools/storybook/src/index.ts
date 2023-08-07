/**
 * We export named properties for the default StorybookConfig
 */

export {
  addons,
  babel,
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
export const previewAnnotations = [
  require.resolve('@lg-tools/storybook/dist/preview.js'),
];
export const managerEntries = [
  require.resolve('@lg-tools/storybook/dist/manager.js'),
];
