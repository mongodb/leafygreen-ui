# LeafyGreen UI Kit

A set of CSS styles and React components built with design in mind.

## Package Table of Contents

- [Badge](https://github.com/mongodb/leafygreen-ui/tree/main/packages/badge)
- [Banner](https://github.com/mongodb/leafygreen-ui/tree/main/packages/banner)
- [Box](https://github.com/mongodb/leafygreen-ui/tree/main/packages/box)
- [Button](https://github.com/mongodb/leafygreen-ui/tree/main/packages/button)
- [Callout](https://github.com/mongodb/leafygreen-ui/tree/main/packages/callout)
- [Card](https://github.com/mongodb/leafygreen-ui/tree/main/packages/card)
- [Checkbox](https://github.com/mongodb/leafygreen-ui/tree/main/packages/checkbox)
- [Code](https://github.com/mongodb/leafygreen-ui/tree/main/packages/code)
- [Confirmation Modal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/confirmation-modal)
- [Copyable](https://github.com/mongodb/leafygreen-ui/tree/main/packages/copyable)
- [Emotion](https://github.com/mongodb/leafygreen-ui/tree/main/packages/emotion)
- [Hooks](https://github.com/mongodb/leafygreen-ui/tree/main/packages/hooks)
- [Icon](https://github.com/mongodb/leafygreen-ui/tree/main/packages/icon)
- [Icon Button](https://github.com/mongodb/leafygreen-ui/tree/main/packages/icon-button)
- [Inline Definition](https://github.com/mongodb/leafygreen-ui/tree/main/packages/inline-definition)
- [Interaction Ring](https://github.com/mongodb/leafygreen-ui/tree/main/packages/interaction-ring)
- [LeafyGreen Provider](https://github.com/mongodb/leafygreen-ui/tree/main/packages/leafygreen-provider)
- [Lib](https://github.com/mongodb/leafygreen-ui/tree/main/packages/lib)
- [Logo](https://github.com/mongodb/leafygreen-ui/tree/main/packages/logo)
- [Marketing Modal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/marketing-modal)
- [Menu](https://github.com/mongodb/leafygreen-ui/tree/main/packages/menu)
- [Modal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/modal)
- [Palette](https://github.com/mongodb/leafygreen-ui/tree/main/packages/palette)
- [Pipeline](https://github.com/mongodb/leafygreen-ui/tree/main/packages/pipeline)
- [Popover](https://github.com/mongodb/leafygreen-ui/tree/main/packages/popover)
- [Portal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/portal)
- [Radio Box Group](https://github.com/mongodb/leafygreen-ui/tree/main/packages/radio-box-group)
- [Radio Group](https://github.com/mongodb/leafygreen-ui/tree/main/packages/radio-group)
- [Select](https://github.com/mongodb/leafygreen-ui/tree/main/packages/select)
- [Side Nav](https://github.com/mongodb/leafygreen-ui/tree/main/packages/side-nav)
- [Stepper](https://github.com/mongodb/leafygreen-ui/tree/main/packages/stepper)
- [Table](https://github.com/mongodb/leafygreen-ui/tree/main/packages/table)
- [Tabs](https://github.com/mongodb/leafygreen-ui/tree/main/packages/tabs)
- [Testing Lib](https://github.com/mongodb/leafygreen-ui/tree/main/packages/testing-lib)
- [Text Area](https://github.com/mongodb/leafygreen-ui/tree/main/packages/text-area)
- [Text Input](https://github.com/mongodb/leafygreen-ui/tree/main/packages/text-input)
- [Toast](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toast)
- [Toggle](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toggle)
- [Tooltip](https://github.com/mongodb/leafygreen-ui/tree/main/packages/tooltip)
- [Typography](https://github.com/mongodb/leafygreen-ui/tree/main/packages/typography)

## Developer Setup

1. Node >= 6.11.5 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

2. yarn >= 1.16.0 installed.

3. Install dependencies and link packages.

   `yarn run init`

## Development

1. Start up storybook to see all UI components that exist.

   `yarn start`

## Development within an Application

To actively develop `leafygreen-ui` components within an application, the following script will link all `leafygreen-ui` components within your application to the local `leafygreen-ui` repository.

This will allow you to make changes to your local repository of `leafygreen-ui` and see those changes immediately reflected within your running application. This allows you to develop both in isolation (within `leafygreen-ui`) and in the context of your application.

To do this, clone this repository and navigate to the root directory (where `package.json` is located), then run the following:

```
yarn run link -- ${PATH_TO_APPLICATION}
```

The script does several things in order:

1. This builds every `leafygreen-ui` component so they are ready to be linked

2. It scans your application for any installed `leafygreen-ui` components in your `node_modules/@leafygreen-ui` folder.
   **NOTE:** If the package is new and unpublished/not installed, you will need to create a directory for the new component within your application inside `node_modules/@leafygreen-ui` before running this command.

3. If any `leafygreen-ui` components are found then the script uses `yarn link` to link every `node_modules/@leafygreen-ui` module to your local `leafygreen-ui` repository.

After the script completes, you can make changes directly to the component in your local `leafygreen-ui` repository. Once you do this, run `yarn build` in the root of the `leafygreen-ui` repository and the changes will be visible on your running application.

## Creating New Component

### Getting Started

To get started quickly and easily run `yarn create-package my-new-package`. When you run this command, we create a directory containing all of the boilerplate code that you'll need to start developing your new Component.

Note: it's important to follow the kebab-casing convention described above.

## Formatting and linting

When you run `yarn fix`, we do the following:

- We run `yarn prettier:fix` so that we have consistently formatted code.
- We run `yarn eslint:fix` to catch any syntax errors, unused variables, and any other easy-to-catch issues.

To fix all files in the repository, run the following:

```
yarn fix
```

To check if any files need formatting without automatically formatting them, run the following:

```
yarn prettier:check
```

To run linting without automatically fixing issues, run the following:

```
yarn eslint:check
```

## Typechecking

To run typechecking without compiling the code, run the following:

```
yarn ts
```

## Testing

To run the unit tests for our components, run the following:

```
yarn test
```

## Commiting

When making a PR that contains changes that should be included in a package's changelog, be sure to do so by running:

```
yarn changeset
```

This will generate a `changes.json` file, keeping track of version upgrades and update descriptions. We follow semver conventions for versioning, so each change will either be major, minor, or patch.

Make sure that the PR includes the changes made by running this command.

## Publishing

1. Merge the automatically generated `Version Packages` PR that will contain appropriate version bumps and changelog documentation.

2. Build the compiled version of every UI package. This creates the dist/ folder with the transpiled code ready for distribution.

```
# To transpile and concatenate all files
yarn build
# To build TypeScript type definition files
yarn ts:build
# To build TypeScript type definition files for older TypeScript versions
yarn ts:downlevel
```

3. Publish all packages to NPM using changesets. This can be done from the `main` branch.

```
yarn release
```

6. Push the tags from the release up to Github.

```
git push --follow-tags
```

## Deploy gh-pages

You can deploy a static build of our Storybook site to gh-pages from the `main` branch.

1. First be sure you've built a static version of Storybook: `yarn build:storybook`
2. Then deploy to gh-pages: `yarn release:site`

### To deploy to your own mirror of leafygreen-ui

1. Run `yarn demo:site [your_github_username]`.
2. If you haven't built a static version of Storybook yet, you will be prompted to do so.
3. You will be asked for confirmation before Storybook is published.

## License

The source files in this repository are made available under the terms of the Apache License, version 2.0.
