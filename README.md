# LeafyGreen UI Kit

A set of CSS styles and React components built with design in mind.

![Leafy Green Button Demo](https://user-images.githubusercontent.com/2353608/125704789-9b36b339-b478-4ca0-bac3-64f9316901f8.gif)

Checkout all of the components [in action](www.mongodb.design)!

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
- [MongoNav](https://github.com/10gen/leafygreen-ui-mongo-nav) (This package is a private submodule of leafygreen-ui)
- [Palette](https://github.com/mongodb/leafygreen-ui/tree/main/packages/palette)
- [Pipeline](https://github.com/mongodb/leafygreen-ui/tree/main/packages/pipeline)
- [Popover](https://github.com/mongodb/leafygreen-ui/tree/main/packages/popover)
- [Portal](https://github.com/mongodb/leafygreen-ui/tree/main/packages/portal)
- [Radio Box Group](https://github.com/mongodb/leafygreen-ui/tree/main/packages/radio-box-group)
- [Radio Group](https://github.com/mongodb/leafygreen-ui/tree/main/packages/radio-group)
- [Ripple](https://github.com/mongodb/leafygreen-ui/tree/main/packages/ripple)
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

1. Node >= 14.0.0 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

2. Install Yarn >= 1.16.0.

   [Yarn Installation documentation](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

3. Clone the repository.

   ```bash
   # Navigate to the directory you'd like to clone the repository into
   $ cd ~/my/repositories

   # Clone the repository.

   # We recommend installing using the SSH address rather than the HTTPS one to make authentication easier for you. To set up SSH authentication with GitHub, see their guide: https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account

   # NOTE: The `--recurse-submodules` option is important here for initializing private submodules. If you forget to do this, you can run `git submodule update --init` from within the repository's root directory to initialize them instead.
   $ git clone --recurse-submodules git@github.com:mongodb/leafygreen-ui.git
   ```

4. Install dependencies and link packages.

   `yarn run init`

## Development

1. Start up storybook to see all UI components that exist.

   `yarn start`

## Working with Git Submodules

Working with Git Submodules is a bit different. For a comprehensive overview of the git submodules API, see the [official documentation](https://git-scm.com/docs/git-submodule).

Any changes within a submodule will be represented by a change in a pointer to a commit SHA. Running `git status` when a submodule has been updated will look something like this:

```bash
$ git status
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
  (commit or discard the untracked or modified content in submodules)
	modified:   privatePackages/mongo-nav (modified content)
```

Diving in further, running `git diff` when a change has been made will look something like this:

```bash
$ git diff
diff --git a/privatePackages/mongo-nav b/privatePackages/mongo-nav
--- a/privatePackages/mongo-nav
+++ b/privatePackages/mongo-nav
@@ -1 +1 @@
-Subproject commit d3414189c57141e7f7193d7ad214b2a91b0a9db5
+Subproject commit d3414189c57141e7f7193d7ad214b2a91b0a9db5-dirty
```

Note the lack of a description of any changes within the module. The only thing that git sees from outside the module is this pointer change.

### Viewing changes/status of a submodule

Viewing what's changed in a submodule is actually very simple.

```bash
# First, navigate to within the submodule within the repository
$ cd ./privatePackages/mongo-nav

# Then, you can run git commands to see the status
$ git status

On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

Note that it's behaving as its own repository. The branch you're on can be changed within the submodule, and doing so can change the pointer to the commit within the overall leafygreen-ui repository.

### Making a change to a submodule

Let's say you're in a branch of the leafygreen-ui-mongo-nav repository.

```bash
# From within the submodule directory
$ git status

On branch my-change
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")

$ git add .
$ git commit -m "my change"
$ git status

$ git status
On branch my-change
nothing to commit, working tree clean

# After commiting something, git status shows a clean working tree. So how does this change make it into the repository? Let's see what the parent repository's working tree looks like now.

# Navigate to the main repository's root directory
$ cd ../..
$ git status
On branch PD-1289-private-mongo-nav
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   privatePackages/mongo-nav (new commits)

# We now see that git recognizes the submodule has new commits! What does that look like?
$ git diff

diff --git a/privatePackages/mongo-nav b/privatePackages/mongo-nav
index d3414189..cd5f0653 160000
--- a/privatePackages/mongo-nav
+++ b/privatePackages/mongo-nav
@@ -1 +1 @@
-Subproject commit d3414189c57141e7f7193d7ad214b2a91b0a9db5
+Subproject commit cd5f06537309dbc6dcc350154d038087a0e381f8
```

Once the pointer is updated, you can now commit this change in the main repository! Note that when creating a pull request, it's important that the change has already been merged into the `main` branch of the submodule so that the pointer is referencing a commit that's production-ready.

### Getting the latest code for all submodules in the repository

The pointer we were talking about earlier is important also for making sure you're working with the latest! To update a submodule's code to reflect the commit being referenced:

```bash
# For your convenience, we wrapped the recommended update command in a yarn script:
$ yarn submodules:update

# Under the hood, it runs the following command:
$ git submodule update --init --recursive --remote

# The `update` command updates submodules to match what the parent repo expects by cloning missing submodules, fetching missing commits and updating the working tree.

# --init initializes all submodules where "git submodule init" has not been run before updating.

# --recursive makes the update command traverse submodules recursively, bringing submodules of submodules up-to-date. So far, we don't have this case in our repository, so it's not strictly necessary yet.

# --remote makes the update command pull from the remote tracking branch instead of what you have locally.
```

###

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

2. Push the tags from the release up to Github.

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
