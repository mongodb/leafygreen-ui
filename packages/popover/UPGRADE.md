# Upgrading v11 to v12

`Popover` v12 introduces a new way to render LG popover elements in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), which "appear[s] on top of all other content on the page."

Prior to v12, popover elements used the `usePortal` boolean prop to render popovers inline in the DOM where it's located or in a portal in a new div appended to the body (or in a provided `portalContainer` element).

In v12, the `usePortal` prop is replaced with the `renderMode` prop and the prior logic is extended to support rendering in the top layer.

- `usePortal={false}` -> `renderMode="inline"`
- `usePortal={true}` -> `renderMode="portal"`
- net new is `renderMode="top-layer"`

Follow these steps to upgrade:

1. In the root of your project, install [@lg-tools/cli](https://github.com/mongodb/leafygreen-ui/blob/main/tools/cli/README.md#installation) and [@lg-tools/codemods](https://github.com/mongodb/leafygreen-ui/blob/main/tools/codemods/README.md#installation).
2. Bump to [v3.2.0 of @leafygreen-ui/leafygreen-provider](https://github.com/mongodb/leafygreen-ui/blob/main/packages/leafygreen-provider/CHANGELOG.md#320). This is a necessary peer dependency of v12 of `@leafygreen-ui/popover` and the consuming packages using v12.
3. Bump to the version of the LG packages you'd like to upgrade and install the bumped packages.
4. Run [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12). By default, this will apply for all relevant packages in the specified directory. The `--packages` flag can be used to only modify specified packages. If necessary, re-lint your project.

At this point, you're all set, and existing popover elements should have parity! New popover elements should now leverage `renderMode="top-layer"` while existing elements are gradually migrated to the top layer.

To aid in the migration, [v3.2.0 of @leafygreen-ui/leafygreen-provider](https://github.com/mongodb/leafygreen-ui/blob/main/packages/leafygreen-provider/CHANGELOG.md#320) adds a `forceUseTopLayer` boolean prop in the global `LeafyGreenProvider`. This can be used to forcibly set all LG popover elements to render in the top layer. This can help pressure test for any regressions but should only be used when all LG dependencies are using v12+ of `@leafygreen-ui/popover`.
