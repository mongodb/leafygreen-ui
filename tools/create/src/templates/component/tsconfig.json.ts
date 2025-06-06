export const tsConfig = (scope: string) => {
  const pathToPackagesRoot =
    scope === '@leafygreen-ui' ? '..' : '../../packages';
  return `{
  "extends": "@lg-tools/build/config/package.tsconfig.json",
   "compilerOptions": {
    "paths": {
      "@leafygreen-ui/icon/dist/*": ["${pathToPackagesRoot}/icon/src/generated/*"],
      "@leafygreen-ui/*": ["${pathToPackagesRoot}/*/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.spec.*", "**/*.stories.*"],
  "references": [
    {
      "path": "${pathToPackagesRoot}/emotion"
    },
    {
      "path": "${pathToPackagesRoot}/lib"
    }
  ]
}
`;
};
