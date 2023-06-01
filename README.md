# LeafyGreen UI Kit

A set of CSS styles and React components built with design in mind.

Check out all of the components [in action](https://www.mongodb.design/)!

## Package Table of Contents

- [A11y](https://github.com/mongodb/leafygreen-ui/tree/main/packages/a11y)
- [Badge](https://github.com/mongodb/leafygreen-ui/tree/main/packages/badge)
- [Banner](https://github.com/mongodb/leafygreen-ui/tree/main/packages/banner)
- [Box](https://github.com/mongodb/leafygreen-ui/tree/main/packages/box)
- [Button](https://github.com/mongodb/leafygreen-ui/tree/main/packages/button)
- [Callout](https://github.com/mongodb/leafygreen-ui/tree/main/packages/callout)
- [Card](https://github.com/mongodb/leafygreen-ui/tree/main/packages/card)
- [Checkbox](https://github.com/mongodb/leafygreen-ui/tree/main/packages/checkbox)
- [Code](https://github.com/mongodb/leafygreen-ui/tree/main/packages/code)
- [Combobox](https://github.com/mongodb/leafygreen-ui/tree/main/packages/combobox)
- [Confirmation Modal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/confirmation-modal)
- [Copyable](https://github.com/mongodb/leafygreen-ui/tree/main/packages/copyable)
- [Emotion](https://github.com/mongodb/leafygreen-ui/tree/main/packages/emotion)
- [Empty State](https://github.com/mongodb/leafygreen-ui/tree/main/packages/empty-state)
- [Expandable Card](https://github.com/mongodb/leafygreen-ui/tree/main/packages/expandable-card)
- [Form Footer](https://github.com/mongodb/leafygreen-ui/tree/main/packages/form-footer)
- [GuideCue](https://github.com/mongodb/leafygreen-ui/tree/main/packages/guide-cue)
- [Hooks](https://github.com/mongodb/leafygreen-ui/tree/main/packages/hooks)
- [Icon](https://github.com/mongodb/leafygreen-ui/tree/main/packages/icon)
- [Icon Button](https://github.com/mongodb/leafygreen-ui/tree/main/packages/icon-button)
- [Inline Definition](https://github.com/mongodb/leafygreen-ui/tree/main/packages/inline-definition)
- [LeafyGreen Provider](https://github.com/mongodb/leafygreen-ui/tree/main/packages/leafygreen-provider)
- [Lib](https://github.com/mongodb/leafygreen-ui/tree/main/packages/lib)
- [Loading Indicator](https://github.com/mongodb/leafygreen-ui/tree/main/packages/loading-indicator)
- [Logo](https://github.com/mongodb/leafygreen-ui/tree/main/packages/logo)
- [Marketing Modal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/marketing-modal)
- [Menu](https://github.com/mongodb/leafygreen-ui/tree/main/packages/menu)
- [Modal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/modal)
- [MongoNav](https://github.com/10gen/leafygreen-ui-private/tree/main/packages/mongo-nav) (This package lives in a private repository)
- [Number Input](https://github.com/mongodb/leafygreen-ui/tree/main/packages/number-input)
- [Pagination](https://github.com/mongodb/leafygreen-ui/tree/main/packages/pagination)
- [Palette](https://github.com/mongodb/leafygreen-ui/tree/main/packages/palette)
- [Password Input](https://github.com/mongodb/leafygreen-ui/tree/main/packages/password-input)
- [Pipeline](https://github.com/mongodb/leafygreen-ui/tree/main/packages/pipeline)
- [Popover](https://github.com/mongodb/leafygreen-ui/tree/main/packages/popover)
- [Polymorphic](https://github.com/mongodb/leafygreen-ui/tree/main/packages/polymorphic)
- [Portal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/portal)
- [Radio Box Group](https://github.com/mongodb/leafygreen-ui/tree/main/packages/radio-box-group)
- [Radio Group](https://github.com/mongodb/leafygreen-ui/tree/main/packages/radio-group)
- [Ripple](https://github.com/mongodb/leafygreen-ui/tree/main/packages/ripple)
- [Search Input](https://github.com/mongodb/leafygreen-ui/tree/main/packages/search-input)
- [Segmented Control](https://github.com/mongodb/leafygreen-ui/tree/main/packages/segmented-control)
- [Select](https://github.com/mongodb/leafygreen-ui/tree/main/packages/select)
- [Side Nav](https://github.com/mongodb/leafygreen-ui/tree/main/packages/side-nav)
- [Split Button](https://github.com/mongodb/leafygreen-ui/tree/main/packages/split-button)
- [Stepper](https://github.com/mongodb/leafygreen-ui/tree/main/packages/stepper)
- [Table](https://github.com/mongodb/leafygreen-ui/tree/main/packages/table)
- [Tabs](https://github.com/mongodb/leafygreen-ui/tree/main/packages/tabs)
- [Testing Lib](https://github.com/mongodb/leafygreen-ui/tree/main/packages/testing-lib)
- [Text Area](https://github.com/mongodb/leafygreen-ui/tree/main/packages/text-area)
- [Text Input](https://github.com/mongodb/leafygreen-ui/tree/main/packages/text-input)
- [Toast](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toast)
- [Toggle](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toggle)
- [Tokens](https://github.com/mongodb/leafygreen-ui/tree/main/packages/tokens)
- [Tooltip](https://github.com/mongodb/leafygreen-ui/tree/main/packages/tooltip)
- [Typography](https://github.com/mongodb/leafygreen-ui/tree/main/packages/typography)

## Developer Setup

1. Node >= 16.20.0 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

2. Install Yarn >= 1.20.0.

   [Yarn Installation documentation](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

3. Clone the repository.

   ```bash
   # Navigate to the directory you'd like to clone the repository into
   $ cd ~/my/repositories

   # Clone the repository.

   # We recommend installing using the SSH address rather than the HTTPS one to make authentication easier for you. To set up SSH authentication with GitHub, see their guide: https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account
   ```

4. Install dependencies and link packages.

   `yarn run init`

Use `yarn build` to rebuild all packages.
Pass in a specific package name to rebuild select packages:

`yarn build button icon`

Additionally, pass in the `--watch` flag to rebuild packages on change.

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

## create-leafygreen-app

An externally maintained script to bootstrap a React app with all Leafygreen UI components.

Create a new React app with Leafygreen UI components pre-installed

```bash
npx create-leafygreen-app@latest <project-name>
```

Create a new Next app

```bash
npx create-leafygreen-app@latest --next <project-name>
```

Install all Leafygreen UI components to an existing project

```bash
npx create-leafygreen-app@latest --packages-only
```

## Creating New Component

### Getting Started

To get started quickly and easily run `yarn create-package my-new-package`. When you run this command, we create a directory containing all of the boilerplate code that you'll need to start developing your new Component.

Note: it's important to follow the kebab-casing convention described above.

- Add the new component to `build.tsconfig.json`
- If you are using any `leafygreen-ui` dependencies in your new component, add the dependency to the component directory's `tsconfig.json`.
- Run `yarn run init` to link all packages before starting development

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

## Committing

When making a PR that contains changes that should be included in a package's changelog, be sure to do so by running:

```
yarn changeset
```

This will generate a `changes.json` file, keeping track of version upgrades and update descriptions. We follow semver conventions for versioning, so each change will either be major, minor, or patch.

Make sure that the PR includes the changes made by running this command.

## Publishing

1. Merge the automatically generated `Version Packages` PR that will contain appropriate version bumps and changelog documentation.

2. Push the tags from the release up to Github.

```
git push --follow-tags
```

### Publishing Pre-releases

Read more in-depth [pre-release guides here](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

Pre-releases let you publish an alpha/beta/next version of a component, allowing developers to test a component before fully releasing a component.

Let's imagine we want to publish a `beta` release of some component. Our work is being done on a branch called `new-feature`

1. Create a new branch off your component branch `git checkout -b pre-release`
   - this makes sure your package updates stay independent
2. Enter pre-release mode: `yarn changeset pre enter beta` (name can be `next`, `beta`, `alpha`, or any other name)
3. Update package versions `yarn changeset version`
   - This will update any packages with existing changeset files to version `X.Y.Z-beta.0` (or whatever name you used)
4. Commit these updates `git commit -am "Prerelease version packages"`
5. Build the component(s) you're pre-releasing `yarn build <...components>`
6. Publish the prerelease with `yarn changeset publish`

Any new work you do should be done in the _original_ (`new-feature`) branch.
To publish a new pre-release version, pull the changes from `new-feature` into branch `pre-release`, and follow steps 3-5.

When `new-feature` is merged into `main`, you can safely delete the `pre-release` branch

## Deploy gh-pages

You can deploy a static build of our Storybook site to gh-pages from the `main` branch.

1. First be sure you've built a static version of Storybook with the script: `build-storybook`
2. Then deploy to gh-pages: `yarn release:site`

### To deploy to your own mirror of leafygreen-ui

1. Run `yarn demo:site [your_github_username]`.
2. If you haven't built a static version of Storybook yet, you will be prompted to do so.
3. You will be asked for confirmation before Storybook is published.

## License

The source files in this repository are made available under the terms of the Apache License, version 2.0.
