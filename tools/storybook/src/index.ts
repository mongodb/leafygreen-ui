export {
  addons,
  babel,
  core,
  docs,
  framework,
  staticDirs,
  stories,
  typescript,
  webpackFinal,
} from './main';

export const previewAnnotations = [
  require.resolve('@lg-tools/storybook/dist/preview.js'),
];
export const managerEntries = [
  require.resolve('@lg-tools/storybook/dist/manager.js'),
];
