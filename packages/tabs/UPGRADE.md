# Tabs v17 Upgrade Guide

This upgrade guide provides instructions for upgrading from older versions of the `Tabs` component to v17. In v17, the `selected` prop has been renamed to `value` and the `setSelected` prop has been renamed to `onValueChange`.

Follow these steps to upgrade:

1. In the root of your project, install [@lg-tools/cli](https://github.com/mongodb/leafygreen-ui/blob/main/tools/cli/README.md#installation) and [@lg-tools/codemods](https://github.com/mongodb/leafygreen-ui/blob/main/tools/codemods/README.md#installation).
2. Run [tabs-v17 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#tabs-v17).
   ```shell
   pnpm lg codemod tabs-v17 <path>
   ```
