<img src="./.storybook/static/leafygreen-ui-banner.png" width="100%"/>

<h1 align="center">LeafyGreen UI</h1>

<p align="center">A library of React components, CSS patterns, and CLI tools for MongoDB's LeafyGreen Design System.</p>

<p align="center">
   <a align="center" href="https://mongodb.design">
      <img src="https://img.shields.io/badge/mongodb.design-112733?style=for-the-badge&logo=mongodb&logoColor=00ED64.svg" alt="mongodb.design">
   </a>
</p>

<p align="center">
   <a href="https://storybook.mongodb.design">
      <img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg" alt="Storybook"/>
   </a>
</p>

<p align="center">
   <img alt="Release" src="https://github.com/mongodb/leafygreen-ui/actions/workflows/release.yml/badge.svg"/>
   <img alt="License" src="https://img.shields.io/github/license/mongodb/leafygreen-ui">
</p>

## Getting Started

### With LeafyGreen CLI

1. Create or open a React project
2. Install the LeafyGreen CLI

```bash
npm install -g @lg-tools/cli
```

3. Install all, or some LeafyGreen components

```bash
lg install
```

```bash
lg install button combobox
```

3. Import LeafyGreen components into your project

```tsx
import Button from '@leafygreen-ui/button';
import { Combobox, ComboboxOptions } from '@leafygreen-ui/combobox';
```

### Without CLI

1. Create or open a React project
2. Install individual LeafyGreen components using `npm` or `yarn`

```bash
yarn add @leafygreen-ui/button
```

3. Import LeafyGreen components into your project

```tsx
import Button from '@leafygreen-ui/button';
```

## Packages

| Package                                                                                           | Latest                                                                                                                                          | Downloads                                                                                  |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [@leafygreen-ui/a11y](http://mongodb.design/component/a11y/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/a11y)](https://www.npmjs.com/package/@leafygreen-ui/a11y)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/a11y?color=white)                |
| [@leafygreen-ui/badge](http://mongodb.design/component/badge/example)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/badge)](https://www.npmjs.com/package/@leafygreen-ui/badge)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/badge?color=white)               |
| [@leafygreen-ui/banner](http://mongodb.design/component/banner/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/banner)](https://www.npmjs.com/package/@leafygreen-ui/banner)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/banner?color=white)              |
| [@leafygreen-ui/box](http://mongodb.design/component/box/example)                                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/box)](https://www.npmjs.com/package/@leafygreen-ui/box)                                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/box?color=white)                 |
| [@leafygreen-ui/button](http://mongodb.design/component/button/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/button)](https://www.npmjs.com/package/@leafygreen-ui/button)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/button?color=white)              |
| [@leafygreen-ui/callout](http://mongodb.design/component/callout/example)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/callout)](https://www.npmjs.com/package/@leafygreen-ui/callout)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/callout?color=white)             |
| [@leafygreen-ui/card](http://mongodb.design/component/card/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/card)](https://www.npmjs.com/package/@leafygreen-ui/card)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/card?color=white)                |
| [@leafygreen-ui/checkbox](http://mongodb.design/component/checkbox/example)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/checkbox)](https://www.npmjs.com/package/@leafygreen-ui/checkbox)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/checkbox?color=white)            |
| [@leafygreen-ui/code](http://mongodb.design/component/code/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/code)](https://www.npmjs.com/package/@leafygreen-ui/code)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/code?color=white)                |
| [@leafygreen-ui/combobox](http://mongodb.design/component/combobox/example)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/combobox)](https://www.npmjs.com/package/@leafygreen-ui/combobox)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/combobox?color=white)            |
| [@leafygreen-ui/confirmation-modal](http://mongodb.design/component/confirmation-modal/example)   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/confirmation-modal)](https://www.npmjs.com/package/@leafygreen-ui/confirmation-modal)   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/confirmation-modal?color=white)  |
| [@leafygreen-ui/copyable](http://mongodb.design/component/copyable/example)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/copyable)](https://www.npmjs.com/package/@leafygreen-ui/copyable)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/copyable?color=white)            |
| [@leafygreen-ui/emotion](http://mongodb.design/component/emotion/example)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/emotion)](https://www.npmjs.com/package/@leafygreen-ui/emotion)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/emotion?color=white)             |
| [@leafygreen-ui/empty-state](http://mongodb.design/component/empty-state/example)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/empty-state)](https://www.npmjs.com/package/@leafygreen-ui/empty-state)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/empty-state?color=white)         |
| [@leafygreen-ui/expandable-card](http://mongodb.design/component/expandable-card/example)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/expandable-card)](https://www.npmjs.com/package/@leafygreen-ui/expandable-card)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/expandable-card?color=white)     |
| [@leafygreen-ui/form-footer](http://mongodb.design/component/form-footer/example)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/form-footer)](https://www.npmjs.com/package/@leafygreen-ui/form-footer)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/form-footer?color=white)         |
| [@leafygreen-ui/guide-cue](http://mongodb.design/component/guide-cue/example)                     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/guide-cue)](https://www.npmjs.com/package/@leafygreen-ui/guide-cue)                     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/guide-cue?color=white)           |
| [@leafygreen-ui/hooks](http://mongodb.design/component/hooks/example)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/hooks)](https://www.npmjs.com/package/@leafygreen-ui/hooks)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/hooks?color=white)               |
| [@leafygreen-ui/icon](http://mongodb.design/component/icon/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/icon)](https://www.npmjs.com/package/@leafygreen-ui/icon)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/icon?color=white)                |
| [@leafygreen-ui/icon-button](http://mongodb.design/component/icon-button/example)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/icon-button)](https://www.npmjs.com/package/@leafygreen-ui/icon-button)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/icon-button?color=white)         |
| [@leafygreen-ui/inline-definition](http://mongodb.design/component/inline-definition/example)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition)](https://www.npmjs.com/package/@leafygreen-ui/inline-definition)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/inline-definition?color=white)   |
| [@leafygreen-ui/input-option](http://mongodb.design/component/input-option/example)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/input-option)](https://www.npmjs.com/package/@leafygreen-ui/input-option)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/input-option?color=white)        |
| [@leafygreen-ui/leafygreen-provider](http://mongodb.design/component/leafygreen-provider/example) | [![version](https://img.shields.io/npm/v/@leafygreen-ui/leafygreen-provider)](https://www.npmjs.com/package/@leafygreen-ui/leafygreen-provider) | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/leafygreen-provider?color=white) |
| [@leafygreen-ui/lib](http://mongodb.design/component/lib/example)                                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/lib)](https://www.npmjs.com/package/@leafygreen-ui/lib)                                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/lib?color=white)                 |
| [@leafygreen-ui/loading-indicator](http://mongodb.design/component/loading-indicator/example)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/loading-indicator)](https://www.npmjs.com/package/@leafygreen-ui/loading-indicator)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/loading-indicator?color=white)   |
| [@leafygreen-ui/logo](http://mongodb.design/component/logo/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/logo)](https://www.npmjs.com/package/@leafygreen-ui/logo)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/logo?color=white)                |
| [@leafygreen-ui/marketing-modal](http://mongodb.design/component/marketing-modal/example)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/marketing-modal)](https://www.npmjs.com/package/@leafygreen-ui/marketing-modal)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/marketing-modal?color=white)     |
| [@leafygreen-ui/menu](http://mongodb.design/component/menu/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/menu)](https://www.npmjs.com/package/@leafygreen-ui/menu)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/menu?color=white)                |
| [@leafygreen-ui/modal](http://mongodb.design/component/modal/example)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/modal)](https://www.npmjs.com/package/@leafygreen-ui/modal)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/modal?color=white)               |
| [@leafygreen-ui/number-input](http://mongodb.design/component/number-input/example)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/number-input)](https://www.npmjs.com/package/@leafygreen-ui/number-input)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/number-input?color=white)        |
| [@leafygreen-ui/pagination](http://mongodb.design/component/pagination/example)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/pagination)](https://www.npmjs.com/package/@leafygreen-ui/pagination)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/pagination?color=white)          |
| [@leafygreen-ui/palette](http://mongodb.design/component/palette/example)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/palette)](https://www.npmjs.com/package/@leafygreen-ui/palette)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/palette?color=white)             |
| [@leafygreen-ui/password-input](http://mongodb.design/component/password-input/example)           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/password-input)](https://www.npmjs.com/package/@leafygreen-ui/password-input)           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/password-input?color=white)      |
| [@leafygreen-ui/pipeline](http://mongodb.design/component/pipeline/example)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/pipeline)](https://www.npmjs.com/package/@leafygreen-ui/pipeline)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/pipeline?color=white)            |
| [@leafygreen-ui/polymorphic](http://mongodb.design/component/polymorphic/example)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/polymorphic)](https://www.npmjs.com/package/@leafygreen-ui/polymorphic)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/polymorphic?color=white)         |
| [@leafygreen-ui/popover](http://mongodb.design/component/popover/example)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/popover)](https://www.npmjs.com/package/@leafygreen-ui/popover)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/popover?color=white)             |
| [@leafygreen-ui/portal](http://mongodb.design/component/portal/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/portal)](https://www.npmjs.com/package/@leafygreen-ui/portal)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/portal?color=white)              |
| [@leafygreen-ui/radio-box-group](http://mongodb.design/component/radio-box-group/example)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/radio-box-group)](https://www.npmjs.com/package/@leafygreen-ui/radio-box-group)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/radio-box-group?color=white)     |
| [@leafygreen-ui/radio-group](http://mongodb.design/component/radio-group/example)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/radio-group)](https://www.npmjs.com/package/@leafygreen-ui/radio-group)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/radio-group?color=white)         |
| [@leafygreen-ui/ripple](http://mongodb.design/component/ripple/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/ripple)](https://www.npmjs.com/package/@leafygreen-ui/ripple)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/ripple?color=white)              |
| [@leafygreen-ui/search-input](http://mongodb.design/component/search-input/example)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/search-input)](https://www.npmjs.com/package/@leafygreen-ui/search-input)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/search-input?color=white)        |
| [@leafygreen-ui/segmented-control](http://mongodb.design/component/segmented-control/example)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/segmented-control)](https://www.npmjs.com/package/@leafygreen-ui/segmented-control)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/segmented-control?color=white)   |
| [@leafygreen-ui/select](http://mongodb.design/component/select/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/select)](https://www.npmjs.com/package/@leafygreen-ui/select)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/select?color=white)              |
| [@leafygreen-ui/side-nav](http://mongodb.design/component/side-nav/example)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/side-nav)](https://www.npmjs.com/package/@leafygreen-ui/side-nav)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/side-nav?color=white)            |
| [@leafygreen-ui/skeleton-loader](http://mongodb.design/component/skeleton-loader/example)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/skeleton-loader)](https://www.npmjs.com/package/@leafygreen-ui/skeleton-loader)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/skeleton-loader?color=white)     |
| [@leafygreen-ui/split-button](http://mongodb.design/component/split-button/example)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/split-button)](https://www.npmjs.com/package/@leafygreen-ui/split-button)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/split-button?color=white)        |
| [@leafygreen-ui/stepper](http://mongodb.design/component/stepper/example)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/stepper)](https://www.npmjs.com/package/@leafygreen-ui/stepper)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/stepper?color=white)             |
| [@leafygreen-ui/table](http://mongodb.design/component/table/example)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/table)](https://www.npmjs.com/package/@leafygreen-ui/table)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/table?color=white)               |
| [@leafygreen-ui/tabs](http://mongodb.design/component/tabs/example)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tabs)](https://www.npmjs.com/package/@leafygreen-ui/tabs)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tabs?color=white)                |
| [@leafygreen-ui/testing-lib](http://mongodb.design/component/testing-lib/example)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/testing-lib)](https://www.npmjs.com/package/@leafygreen-ui/testing-lib)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/testing-lib?color=white)         |
| [@leafygreen-ui/text-area](http://mongodb.design/component/text-area/example)                     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/text-area)](https://www.npmjs.com/package/@leafygreen-ui/text-area)                     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/text-area?color=white)           |
| [@leafygreen-ui/text-input](http://mongodb.design/component/text-input/example)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/text-input)](https://www.npmjs.com/package/@leafygreen-ui/text-input)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/text-input?color=white)          |
| [@leafygreen-ui/toast](http://mongodb.design/component/toast/example)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toast)](https://www.npmjs.com/package/@leafygreen-ui/toast)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toast?color=white)               |
| [@leafygreen-ui/toggle](http://mongodb.design/component/toggle/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toggle)](https://www.npmjs.com/package/@leafygreen-ui/toggle)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toggle?color=white)              |
| [@leafygreen-ui/tokens](http://mongodb.design/component/tokens/example)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tokens)](https://www.npmjs.com/package/@leafygreen-ui/tokens)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tokens?color=white)              |
| [@leafygreen-ui/tooltip](http://mongodb.design/component/tooltip/example)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tooltip)](https://www.npmjs.com/package/@leafygreen-ui/tooltip)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tooltip?color=white)             |
| [@leafygreen-ui/typography](http://mongodb.design/component/typography/example)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/typography)](https://www.npmjs.com/package/@leafygreen-ui/typography)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/typography?color=white)          |
| [@lg-tools/build](http://mongodb.design/component/build/example)                                  | [![version](https://img.shields.io/npm/v/@lg-tools/build)](https://www.npmjs.com/package/@lg-tools/build)                                       | ![downloads](https://img.shields.io/npm/dm/@lg-tools/build?color=white)                    |
| [@lg-tools/cli](http://mongodb.design/component/cli/example)                                      | [![version](https://img.shields.io/npm/v/@lg-tools/cli)](https://www.npmjs.com/package/@lg-tools/cli)                                           | ![downloads](https://img.shields.io/npm/dm/@lg-tools/cli?color=white)                      |
| [@lg-tools/create](http://mongodb.design/component/create/example)                                | [![version](https://img.shields.io/npm/v/@lg-tools/create)](https://www.npmjs.com/package/@lg-tools/create)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/create?color=white)                   |
| [@lg-tools/install](http://mongodb.design/component/install/example)                              | [![version](https://img.shields.io/npm/v/@lg-tools/install)](https://www.npmjs.com/package/@lg-tools/install)                                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/install?color=white)                  |
| [@lg-tools/link](http://mongodb.design/component/link/example)                                    | [![version](https://img.shields.io/npm/v/@lg-tools/link)](https://www.npmjs.com/package/@lg-tools/link)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/link?color=white)                     |
| [@lg-tools/lint](http://mongodb.design/component/lint/example)                                    | [![version](https://img.shields.io/npm/v/@lg-tools/lint)](https://www.npmjs.com/package/@lg-tools/lint)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/lint?color=white)                     |
| [@lg-tools/meta](http://mongodb.design/component/meta/example)                                    | [![version](https://img.shields.io/npm/v/@lg-tools/meta)](https://www.npmjs.com/package/@lg-tools/meta)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/meta?color=white)                     |
| [@lg-tools/slackbot](http://mongodb.design/component/slackbot/example)                            | [![version](https://img.shields.io/npm/v/@lg-tools/slackbot)](https://www.npmjs.com/package/@lg-tools/slackbot)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/slackbot?color=white)                 |
| [@lg-tools/storybook](http://mongodb.design/component/storybook/example)                          | [![version](https://img.shields.io/npm/v/@lg-tools/storybook)](https://www.npmjs.com/package/@lg-tools/storybook)                               | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook?color=white)                |
| [@lg-tools/storybook-decorators](http://mongodb.design/component/storybook-decorators/example)    | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-decorators)](https://www.npmjs.com/package/@lg-tools/storybook-decorators)         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-decorators?color=white)     |
| [@lg-tools/test](http://mongodb.design/component/test/example)                                    | [![version](https://img.shields.io/npm/v/@lg-tools/test)](https://www.npmjs.com/package/@lg-tools/test)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/test?color=white)                     |
| [@lg-tools/update](http://mongodb.design/component/update/example)                                | [![version](https://img.shields.io/npm/v/@lg-tools/update)](https://www.npmjs.com/package/@lg-tools/update)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/update?color=white)                   |
| [@lg-tools/validate](http://mongodb.design/component/validate/example)                            | [![version](https://img.shields.io/npm/v/@lg-tools/validate)](https://www.npmjs.com/package/@lg-tools/validate)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/validate?color=white)                 |

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
