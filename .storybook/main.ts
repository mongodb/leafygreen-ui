import { dirname, join } from "path";
export default {
  addons: [getAbsolutePath("@lg-tools/storybook-addon")],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
};

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
