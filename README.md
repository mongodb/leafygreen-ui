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

| Package                                                              | Latest                                                                                                                                          | Downloads                                                                                  | Docs                                                                     |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [@leafygreen-ui/a11y](./packages/a11y)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/a11y)](https://www.npmjs.com/package/@leafygreen-ui/a11y)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/a11y?color=white)                | [Docs](http://mongodb.design/component/a11y/example)                     |
| [@leafygreen-ui/badge](./packages/badge)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/badge)](https://www.npmjs.com/package/@leafygreen-ui/badge)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/badge?color=white)               | [Docs](http://mongodb.design/component/badge/example)                    |
| [@leafygreen-ui/banner](./packages/banner)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/banner)](https://www.npmjs.com/package/@leafygreen-ui/banner)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/banner?color=white)              | [Docs](http://mongodb.design/component/banner/example)                   |
| [@leafygreen-ui/box](./packages/box)                                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/box)](https://www.npmjs.com/package/@leafygreen-ui/box)                                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/box?color=white)                 | [Docs](http://mongodb.design/component/box/example)                      |
| [@leafygreen-ui/button](./packages/button)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/button)](https://www.npmjs.com/package/@leafygreen-ui/button)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/button?color=white)              | [Docs](http://mongodb.design/component/button/example)                   |
| [@leafygreen-ui/callout](./packages/callout)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/callout)](https://www.npmjs.com/package/@leafygreen-ui/callout)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/callout?color=white)             | [Docs](http://mongodb.design/component/callout/example)                  |
| [@leafygreen-ui/card](./packages/card)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/card)](https://www.npmjs.com/package/@leafygreen-ui/card)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/card?color=white)                | [Docs](http://mongodb.design/component/card/example)                     |
| [@leafygreen-ui/checkbox](./packages/checkbox)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/checkbox)](https://www.npmjs.com/package/@leafygreen-ui/checkbox)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/checkbox?color=white)            | [Docs](http://mongodb.design/component/checkbox/example)                 |
| [@leafygreen-ui/chip](./packages/chip)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/chip)](https://www.npmjs.com/package/@leafygreen-ui/chip)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/chip?color=white)                | [Docs](http://mongodb.design/component/chip/example)                     |
| [@leafygreen-ui/code](./packages/code)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/code)](https://www.npmjs.com/package/@leafygreen-ui/code)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/code?color=white)                | [Docs](http://mongodb.design/component/code/example)                     |
| [@leafygreen-ui/combobox](./packages/combobox)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/combobox)](https://www.npmjs.com/package/@leafygreen-ui/combobox)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/combobox?color=white)            | [Docs](http://mongodb.design/component/combobox/example)                 |
| [@leafygreen-ui/confirmation-modal](./packages/confirmation-modal)   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/confirmation-modal)](https://www.npmjs.com/package/@leafygreen-ui/confirmation-modal)   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/confirmation-modal?color=white)  | [Docs](http://mongodb.design/component/confirmation-modal/example)       |
| [@leafygreen-ui/copyable](./packages/copyable)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/copyable)](https://www.npmjs.com/package/@leafygreen-ui/copyable)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/copyable?color=white)            | [Docs](http://mongodb.design/component/copyable/example)                 |
| [@leafygreen-ui/date-picker](./packages/date-picker)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/date-picker)](https://www.npmjs.com/package/@leafygreen-ui/date-picker)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/date-picker?color=white)         | [Docs](http://mongodb.design/component/date-picker/example)              |
| [@leafygreen-ui/date-utils](./packages/date-utils)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/date-utils)](https://www.npmjs.com/package/@leafygreen-ui/date-utils)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/date-utils?color=white)          | [Docs](http://mongodb.design/component/date-utils/example)               |
| [@leafygreen-ui/descendants](./packages/descendants)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/descendants)](https://www.npmjs.com/package/@leafygreen-ui/descendants)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/descendants?color=white)         | [Docs](http://mongodb.design/component/descendants/example)              |
| [@leafygreen-ui/emotion](./packages/emotion)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/emotion)](https://www.npmjs.com/package/@leafygreen-ui/emotion)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/emotion?color=white)             | [Docs](http://mongodb.design/component/emotion/example)                  |
| [@leafygreen-ui/empty-state](./packages/empty-state)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/empty-state)](https://www.npmjs.com/package/@leafygreen-ui/empty-state)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/empty-state?color=white)         | [Docs](http://mongodb.design/component/empty-state/example)              |
| [@leafygreen-ui/expandable-card](./packages/expandable-card)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/expandable-card)](https://www.npmjs.com/package/@leafygreen-ui/expandable-card)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/expandable-card?color=white)     | [Docs](http://mongodb.design/component/expandable-card/example)          |
| [@leafygreen-ui/form-field](./packages/form-field)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/form-field)](https://www.npmjs.com/package/@leafygreen-ui/form-field)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/form-field?color=white)          | [Docs](http://mongodb.design/component/form-field/example)               |
| [@leafygreen-ui/form-footer](./packages/form-footer)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/form-footer)](https://www.npmjs.com/package/@leafygreen-ui/form-footer)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/form-footer?color=white)         | [Docs](http://mongodb.design/component/form-footer/example)              |
| [@leafygreen-ui/guide-cue](./packages/guide-cue)                     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/guide-cue)](https://www.npmjs.com/package/@leafygreen-ui/guide-cue)                     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/guide-cue?color=white)           | [Docs](http://mongodb.design/component/guide-cue/example)                |
| [@leafygreen-ui/hooks](./packages/hooks)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/hooks)](https://www.npmjs.com/package/@leafygreen-ui/hooks)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/hooks?color=white)               | [Docs](http://mongodb.design/component/hooks/example)                    |
| [@leafygreen-ui/icon](./packages/icon)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/icon)](https://www.npmjs.com/package/@leafygreen-ui/icon)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/icon?color=white)                | [Docs](http://mongodb.design/component/icon/example)                     |
| [@leafygreen-ui/icon-button](./packages/icon-button)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/icon-button)](https://www.npmjs.com/package/@leafygreen-ui/icon-button)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/icon-button?color=white)         | [Docs](http://mongodb.design/component/icon-button/example)              |
| [@leafygreen-ui/info-sprinkle](./packages/info-sprinkle)             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/info-sprinkle)](https://www.npmjs.com/package/@leafygreen-ui/info-sprinkle)             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/info-sprinkle?color=white)       | [Docs](http://mongodb.design/component/info-sprinkle/example)            |
| [@leafygreen-ui/inline-definition](./packages/inline-definition)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition)](https://www.npmjs.com/package/@leafygreen-ui/inline-definition)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/inline-definition?color=white)   | [Docs](http://mongodb.design/component/inline-definition/example)        |
| [@leafygreen-ui/input-option](./packages/input-option)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/input-option)](https://www.npmjs.com/package/@leafygreen-ui/input-option)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/input-option?color=white)        | [Docs](http://mongodb.design/component/input-option/example)             |
| [@leafygreen-ui/leafygreen-provider](./packages/leafygreen-provider) | [![version](https://img.shields.io/npm/v/@leafygreen-ui/leafygreen-provider)](https://www.npmjs.com/package/@leafygreen-ui/leafygreen-provider) | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/leafygreen-provider?color=white) | [Docs](http://mongodb.design/component/leafygreen-provider/example)      |
| [@leafygreen-ui/lib](./packages/lib)                                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/lib)](https://www.npmjs.com/package/@leafygreen-ui/lib)                                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/lib?color=white)                 | [Docs](http://mongodb.design/component/lib/example)                      |
| [@leafygreen-ui/loading-indicator](./packages/loading-indicator)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/loading-indicator)](https://www.npmjs.com/package/@leafygreen-ui/loading-indicator)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/loading-indicator?color=white)   | [Docs](http://mongodb.design/component/loading-indicator/example)        |
| [@leafygreen-ui/logo](./packages/logo)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/logo)](https://www.npmjs.com/package/@leafygreen-ui/logo)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/logo?color=white)                | [Docs](http://mongodb.design/component/logo/example)                     |
| [@leafygreen-ui/marketing-modal](./packages/marketing-modal)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/marketing-modal)](https://www.npmjs.com/package/@leafygreen-ui/marketing-modal)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/marketing-modal?color=white)     | [Docs](http://mongodb.design/component/marketing-modal/example)          |
| [@leafygreen-ui/menu](./packages/menu)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/menu)](https://www.npmjs.com/package/@leafygreen-ui/menu)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/menu?color=white)                | [Docs](http://mongodb.design/component/menu/example)                     |
| [@leafygreen-ui/modal](./packages/modal)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/modal)](https://www.npmjs.com/package/@leafygreen-ui/modal)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/modal?color=white)               | [Docs](http://mongodb.design/component/modal/example)                    |
| [@leafygreen-ui/number-input](./packages/number-input)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/number-input)](https://www.npmjs.com/package/@leafygreen-ui/number-input)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/number-input?color=white)        | [Docs](http://mongodb.design/component/number-input/example)             |
| [@leafygreen-ui/pagination](./packages/pagination)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/pagination)](https://www.npmjs.com/package/@leafygreen-ui/pagination)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/pagination?color=white)          | [Docs](http://mongodb.design/component/pagination/example)               |
| [@leafygreen-ui/palette](./packages/palette)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/palette)](https://www.npmjs.com/package/@leafygreen-ui/palette)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/palette?color=white)             | [Docs](http://mongodb.design/component/palette/example)                  |
| [@leafygreen-ui/password-input](./packages/password-input)           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/password-input)](https://www.npmjs.com/package/@leafygreen-ui/password-input)           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/password-input?color=white)      | [Docs](http://mongodb.design/component/password-input/example)           |
| [@leafygreen-ui/pipeline](./packages/pipeline)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/pipeline)](https://www.npmjs.com/package/@leafygreen-ui/pipeline)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/pipeline?color=white)            | [Docs](http://mongodb.design/component/pipeline/example)                 |
| [@leafygreen-ui/polymorphic](./packages/polymorphic)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/polymorphic)](https://www.npmjs.com/package/@leafygreen-ui/polymorphic)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/polymorphic?color=white)         | [Docs](http://mongodb.design/component/polymorphic/example)              |
| [@leafygreen-ui/popover](./packages/popover)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/popover)](https://www.npmjs.com/package/@leafygreen-ui/popover)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/popover?color=white)             | [Docs](http://mongodb.design/component/popover/example)                  |
| [@leafygreen-ui/portal](./packages/portal)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/portal)](https://www.npmjs.com/package/@leafygreen-ui/portal)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/portal?color=white)              | [Docs](http://mongodb.design/component/portal/example)                   |
| [@leafygreen-ui/radio-box-group](./packages/radio-box-group)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/radio-box-group)](https://www.npmjs.com/package/@leafygreen-ui/radio-box-group)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/radio-box-group?color=white)     | [Docs](http://mongodb.design/component/radio-box-group/example)          |
| [@leafygreen-ui/radio-group](./packages/radio-group)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/radio-group)](https://www.npmjs.com/package/@leafygreen-ui/radio-group)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/radio-group?color=white)         | [Docs](http://mongodb.design/component/radio-group/example)              |
| [@leafygreen-ui/ripple](./packages/ripple)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/ripple)](https://www.npmjs.com/package/@leafygreen-ui/ripple)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/ripple?color=white)              | [Docs](http://mongodb.design/component/ripple/example)                   |
| [@leafygreen-ui/search-input](./packages/search-input)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/search-input)](https://www.npmjs.com/package/@leafygreen-ui/search-input)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/search-input?color=white)        | [Docs](http://mongodb.design/component/search-input/example)             |
| [@leafygreen-ui/segmented-control](./packages/segmented-control)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/segmented-control)](https://www.npmjs.com/package/@leafygreen-ui/segmented-control)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/segmented-control?color=white)   | [Docs](http://mongodb.design/component/segmented-control/example)        |
| [@leafygreen-ui/select](./packages/select)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/select)](https://www.npmjs.com/package/@leafygreen-ui/select)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/select?color=white)              | [Docs](http://mongodb.design/component/select/example)                   |
| [@leafygreen-ui/side-nav](./packages/side-nav)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/side-nav)](https://www.npmjs.com/package/@leafygreen-ui/side-nav)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/side-nav?color=white)            | [Docs](http://mongodb.design/component/side-nav/example)                 |
| [@leafygreen-ui/skeleton-loader](./packages/skeleton-loader)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/skeleton-loader)](https://www.npmjs.com/package/@leafygreen-ui/skeleton-loader)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/skeleton-loader?color=white)     | [Docs](http://mongodb.design/component/skeleton-loader/example)          |
| [@leafygreen-ui/split-button](./packages/split-button)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/split-button)](https://www.npmjs.com/package/@leafygreen-ui/split-button)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/split-button?color=white)        | [Docs](http://mongodb.design/component/split-button/example)             |
| [@leafygreen-ui/stepper](./packages/stepper)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/stepper)](https://www.npmjs.com/package/@leafygreen-ui/stepper)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/stepper?color=white)             | [Docs](http://mongodb.design/component/stepper/example)                  |
| [@leafygreen-ui/table](./packages/table)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/table)](https://www.npmjs.com/package/@leafygreen-ui/table)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/table?color=white)               | [Docs](http://mongodb.design/component/table/example)                    |
| [@leafygreen-ui/tabs](./packages/tabs)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tabs)](https://www.npmjs.com/package/@leafygreen-ui/tabs)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tabs?color=white)                | [Docs](http://mongodb.design/component/tabs/example)                     |
| [@leafygreen-ui/testing-lib](./packages/testing-lib)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/testing-lib)](https://www.npmjs.com/package/@leafygreen-ui/testing-lib)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/testing-lib?color=white)         | [Docs](http://mongodb.design/component/testing-lib/example)              |
| [@leafygreen-ui/text-area](./packages/text-area)                     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/text-area)](https://www.npmjs.com/package/@leafygreen-ui/text-area)                     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/text-area?color=white)           | [Docs](http://mongodb.design/component/text-area/example)                |
| [@leafygreen-ui/text-input](./packages/text-input)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/text-input)](https://www.npmjs.com/package/@leafygreen-ui/text-input)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/text-input?color=white)          | [Docs](http://mongodb.design/component/text-input/example)               |
| [@leafygreen-ui/toast](./packages/toast)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toast)](https://www.npmjs.com/package/@leafygreen-ui/toast)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toast?color=white)               | [Docs](http://mongodb.design/component/toast/example)                    |
| [@leafygreen-ui/toggle](./packages/toggle)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toggle)](https://www.npmjs.com/package/@leafygreen-ui/toggle)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toggle?color=white)              | [Docs](http://mongodb.design/component/toggle/example)                   |
| [@leafygreen-ui/tokens](./packages/tokens)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tokens)](https://www.npmjs.com/package/@leafygreen-ui/tokens)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tokens?color=white)              | [Docs](http://mongodb.design/component/tokens/example)                   |
| [@leafygreen-ui/tooltip](./packages/tooltip)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tooltip)](https://www.npmjs.com/package/@leafygreen-ui/tooltip)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tooltip?color=white)             | [Docs](http://mongodb.design/component/tooltip/example)                  |
| [@leafygreen-ui/typography](./packages/typography)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/typography)](https://www.npmjs.com/package/@leafygreen-ui/typography)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/typography?color=white)          | [Docs](http://mongodb.design/component/typography/example)               |
| [@lg-chat/avatar](./chat/avatar)                                     | [![version](https://img.shields.io/npm/v/@lg-chat/avatar)](https://www.npmjs.com/package/@lg-chat/avatar)                                       | ![downloads](https://img.shields.io/npm/dm/@lg-chat/avatar?color=white)                    | [Docs](http://mongodb.design/component/avatar/example)                   |
| [@lg-chat/chat-disclaimer](./chat/chat-disclaimer)                   | [![version](https://img.shields.io/npm/v/@lg-chat/chat-disclaimer)](https://www.npmjs.com/package/@lg-chat/chat-disclaimer)                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/chat-disclaimer?color=white)           | [Docs](http://mongodb.design/component/chat-disclaimer/example)          |
| [@lg-chat/chat-window](./chat/chat-window)                           | [![version](https://img.shields.io/npm/v/@lg-chat/chat-window)](https://www.npmjs.com/package/@lg-chat/chat-window)                             | ![downloads](https://img.shields.io/npm/dm/@lg-chat/chat-window?color=white)               | [Docs](http://mongodb.design/component/chat-window/example)              |
| [@lg-chat/fixed-chat-window](./chat/fixed-chat-window)               | [![version](https://img.shields.io/npm/v/@lg-chat/fixed-chat-window)](https://www.npmjs.com/package/@lg-chat/fixed-chat-window)                 | ![downloads](https://img.shields.io/npm/dm/@lg-chat/fixed-chat-window?color=white)         | [Docs](http://mongodb.design/component/fixed-chat-window/example)        |
| [@lg-chat/input-bar](./chat/input-bar)                               | [![version](https://img.shields.io/npm/v/@lg-chat/input-bar)](https://www.npmjs.com/package/@lg-chat/input-bar)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-chat/input-bar?color=white)                 | [Docs](http://mongodb.design/component/input-bar/example)                |
| [@lg-chat/leafygreen-chat-provider](./chat/leafygreen-chat-provider) | [![version](https://img.shields.io/npm/v/@lg-chat/leafygreen-chat-provider)](https://www.npmjs.com/package/@lg-chat/leafygreen-chat-provider)   | ![downloads](https://img.shields.io/npm/dm/@lg-chat/leafygreen-chat-provider?color=white)  | [Docs](http://mongodb.design/component/leafygreen-chat-provider/example) |
| [@lg-chat/lg-markdown](./chat/lg-markdown)                           | [![version](https://img.shields.io/npm/v/@lg-chat/lg-markdown)](https://www.npmjs.com/package/@lg-chat/lg-markdown)                             | ![downloads](https://img.shields.io/npm/dm/@lg-chat/lg-markdown?color=white)               | [Docs](http://mongodb.design/component/lg-markdown/example)              |
| [@lg-chat/message](./chat/message)                                   | [![version](https://img.shields.io/npm/v/@lg-chat/message)](https://www.npmjs.com/package/@lg-chat/message)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message?color=white)                   | [Docs](http://mongodb.design/component/message/example)                  |
| [@lg-chat/message-feed](./chat/message-feed)                         | [![version](https://img.shields.io/npm/v/@lg-chat/message-feed)](https://www.npmjs.com/package/@lg-chat/message-feed)                           | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-feed?color=white)              | [Docs](http://mongodb.design/component/message-feed/example)             |
| [@lg-chat/message-feedback](./chat/message-feedback)                 | [![version](https://img.shields.io/npm/v/@lg-chat/message-feedback)](https://www.npmjs.com/package/@lg-chat/message-feedback)                   | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-feedback?color=white)          | [Docs](http://mongodb.design/component/message-feedback/example)         |
| [@lg-chat/message-prompts](./chat/message-prompts)                   | [![version](https://img.shields.io/npm/v/@lg-chat/message-prompts)](https://www.npmjs.com/package/@lg-chat/message-prompts)                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-prompts?color=white)           | [Docs](http://mongodb.design/component/message-prompts/example)          |
| [@lg-chat/message-rating](./chat/message-rating)                     | [![version](https://img.shields.io/npm/v/@lg-chat/message-rating)](https://www.npmjs.com/package/@lg-chat/message-rating)                       | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-rating?color=white)            | [Docs](http://mongodb.design/component/message-rating/example)           |
| [@lg-chat/title-bar](./chat/title-bar)                               | [![version](https://img.shields.io/npm/v/@lg-chat/title-bar)](https://www.npmjs.com/package/@lg-chat/title-bar)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-chat/title-bar?color=white)                 | [Docs](http://mongodb.design/component/title-bar/example)                |
| [@lg-tools/build](./tools/build)                                     | [![version](https://img.shields.io/npm/v/@lg-tools/build)](https://www.npmjs.com/package/@lg-tools/build)                                       | ![downloads](https://img.shields.io/npm/dm/@lg-tools/build?color=white)                    | [Docs](http://mongodb.design/component/build/example)                    |
| [@lg-tools/cli](./tools/cli)                                         | [![version](https://img.shields.io/npm/v/@lg-tools/cli)](https://www.npmjs.com/package/@lg-tools/cli)                                           | ![downloads](https://img.shields.io/npm/dm/@lg-tools/cli?color=white)                      | [Docs](http://mongodb.design/component/cli/example)                      |
| [@lg-tools/create](./tools/create)                                   | [![version](https://img.shields.io/npm/v/@lg-tools/create)](https://www.npmjs.com/package/@lg-tools/create)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/create?color=white)                   | [Docs](http://mongodb.design/component/create/example)                   |
| [@lg-tools/install](./tools/install)                                 | [![version](https://img.shields.io/npm/v/@lg-tools/install)](https://www.npmjs.com/package/@lg-tools/install)                                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/install?color=white)                  | [Docs](http://mongodb.design/component/install/example)                  |
| [@lg-tools/link](./tools/link)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/link)](https://www.npmjs.com/package/@lg-tools/link)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/link?color=white)                     | [Docs](http://mongodb.design/component/link/example)                     |
| [@lg-tools/lint](./tools/lint)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/lint)](https://www.npmjs.com/package/@lg-tools/lint)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/lint?color=white)                     | [Docs](http://mongodb.design/component/lint/example)                     |
| [@lg-tools/meta](./tools/meta)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/meta)](https://www.npmjs.com/package/@lg-tools/meta)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/meta?color=white)                     | [Docs](http://mongodb.design/component/meta/example)                     |
| [@lg-tools/slackbot](./tools/slackbot)                               | [![version](https://img.shields.io/npm/v/@lg-tools/slackbot)](https://www.npmjs.com/package/@lg-tools/slackbot)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/slackbot?color=white)                 | [Docs](http://mongodb.design/component/slackbot/example)                 |
| [@lg-tools/storybook-addon](./tools/storybook-addon)                 | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-addon)](https://www.npmjs.com/package/@lg-tools/storybook-addon)                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-addon?color=white)          | [Docs](http://mongodb.design/component/storybook-addon/example)          |
| [@lg-tools/storybook-decorators](./tools/storybook-decorators)       | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-decorators)](https://www.npmjs.com/package/@lg-tools/storybook-decorators)         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-decorators?color=white)     | [Docs](http://mongodb.design/component/storybook-decorators/example)     |
| [@lg-tools/storybook-utils](./tools/storybook-utils)                 | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-utils)](https://www.npmjs.com/package/@lg-tools/storybook-utils)                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-utils?color=white)          | [Docs](http://mongodb.design/component/storybook-utils/example)          |
| [@lg-tools/test](./tools/test)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/test)](https://www.npmjs.com/package/@lg-tools/test)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/test?color=white)                     | [Docs](http://mongodb.design/component/test/example)                     |
| [@lg-tools/test-harnesses](./tools/test-harnesses)                   | [![version](https://img.shields.io/npm/v/@lg-tools/test-harnesses)](https://www.npmjs.com/package/@lg-tools/test-harnesses)                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/test-harnesses?color=white)           | [Docs](http://mongodb.design/component/test-harnesses/example)           |
| [@lg-tools/update](./tools/update)                                   | [![version](https://img.shields.io/npm/v/@lg-tools/update)](https://www.npmjs.com/package/@lg-tools/update)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/update?color=white)                   | [Docs](http://mongodb.design/component/update/example)                   |
| [@lg-tools/validate](./tools/validate)                               | [![version](https://img.shields.io/npm/v/@lg-tools/validate)](https://www.npmjs.com/package/@lg-tools/validate)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/validate?color=white)                 | [Docs](http://mongodb.design/component/validate/example)                 |

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
