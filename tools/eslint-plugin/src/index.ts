import requireIndex from 'requireindex';
import { getPackageJson } from '@lg-tools/meta';
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const pkg = getPackageJson();
const rules = requireIndex(__dirname + '/rules');

export default {
  meta: {
    name: '@lg-tools/eslint-plugin',
    version: pkg?.version,
  },
  rules,
};
