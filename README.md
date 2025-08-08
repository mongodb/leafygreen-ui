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
2. Install individual LeafyGreen components using `npm`, `pnpm`, or `yarn`

```bash
pnpm add @leafygreen-ui/button
```

3. Import LeafyGreen components into your project

```tsx
import Button from '@leafygreen-ui/button';
```

## Packages

| Package                                                              | Latest                                                                                                                                          | Downloads                                                                                  | Live Example                                                                          |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [@leafygreen-ui/a11y](./packages/a11y)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/a11y)](https://www.npmjs.com/package/@leafygreen-ui/a11y)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/a11y?color=white)                | [Live Example](http://mongodb.design/component/a11y/live-example)                     |
| [@leafygreen-ui/avatar](./packages/avatar)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/avatar)](https://www.npmjs.com/package/@leafygreen-ui/avatar)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/avatar?color=white)              | [Live Example](http://mongodb.design/component/avatar/live-example)                   |
| [@leafygreen-ui/badge](./packages/badge)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/badge)](https://www.npmjs.com/package/@leafygreen-ui/badge)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/badge?color=white)               | [Live Example](http://mongodb.design/component/badge/live-example)                    |
| [@leafygreen-ui/banner](./packages/banner)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/banner)](https://www.npmjs.com/package/@leafygreen-ui/banner)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/banner?color=white)              | [Live Example](http://mongodb.design/component/banner/live-example)                   |
| [@leafygreen-ui/box](./packages/box)                                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/box)](https://www.npmjs.com/package/@leafygreen-ui/box)                                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/box?color=white)                 | [Live Example](http://mongodb.design/component/box/live-example)                      |
| [@leafygreen-ui/button](./packages/button)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/button)](https://www.npmjs.com/package/@leafygreen-ui/button)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/button?color=white)              | [Live Example](http://mongodb.design/component/button/live-example)                   |
| [@leafygreen-ui/callout](./packages/callout)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/callout)](https://www.npmjs.com/package/@leafygreen-ui/callout)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/callout?color=white)             | [Live Example](http://mongodb.design/component/callout/live-example)                  |
| [@leafygreen-ui/card](./packages/card)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/card)](https://www.npmjs.com/package/@leafygreen-ui/card)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/card?color=white)                | [Live Example](http://mongodb.design/component/card/live-example)                     |
| [@leafygreen-ui/checkbox](./packages/checkbox)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/checkbox)](https://www.npmjs.com/package/@leafygreen-ui/checkbox)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/checkbox?color=white)            | [Live Example](http://mongodb.design/component/checkbox/live-example)                 |
| [@leafygreen-ui/chip](./packages/chip)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/chip)](https://www.npmjs.com/package/@leafygreen-ui/chip)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/chip?color=white)                | [Live Example](http://mongodb.design/component/chip/live-example)                     |
| [@leafygreen-ui/code](./packages/code)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/code)](https://www.npmjs.com/package/@leafygreen-ui/code)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/code?color=white)                | [Live Example](http://mongodb.design/component/code/live-example)                     |
| [@leafygreen-ui/combobox](./packages/combobox)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/combobox)](https://www.npmjs.com/package/@leafygreen-ui/combobox)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/combobox?color=white)            | [Live Example](http://mongodb.design/component/combobox/live-example)                 |
| [@leafygreen-ui/confirmation-modal](./packages/confirmation-modal)   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/confirmation-modal)](https://www.npmjs.com/package/@leafygreen-ui/confirmation-modal)   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/confirmation-modal?color=white)  | [Live Example](http://mongodb.design/component/confirmation-modal/live-example)       |
| [@leafygreen-ui/context-drawer](./packages/context-drawer)           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/context-drawer)](https://www.npmjs.com/package/@leafygreen-ui/context-drawer)           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/context-drawer?color=white)      | [Live Example](http://mongodb.design/component/context-drawer/live-example)           |
| [@leafygreen-ui/copyable](./packages/copyable)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/copyable)](https://www.npmjs.com/package/@leafygreen-ui/copyable)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/copyable?color=white)            | [Live Example](http://mongodb.design/component/copyable/live-example)                 |
| [@leafygreen-ui/date-picker](./packages/date-picker)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/date-picker)](https://www.npmjs.com/package/@leafygreen-ui/date-picker)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/date-picker?color=white)         | [Live Example](http://mongodb.design/component/date-picker/live-example)              |
| [@leafygreen-ui/date-utils](./packages/date-utils)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/date-utils)](https://www.npmjs.com/package/@leafygreen-ui/date-utils)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/date-utils?color=white)          | [Live Example](http://mongodb.design/component/date-utils/live-example)               |
| [@leafygreen-ui/descendants](./packages/descendants)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/descendants)](https://www.npmjs.com/package/@leafygreen-ui/descendants)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/descendants?color=white)         | [Live Example](http://mongodb.design/component/descendants/live-example)              |
| [@leafygreen-ui/drawer](./packages/drawer)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/drawer)](https://www.npmjs.com/package/@leafygreen-ui/drawer)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/drawer?color=white)              | [Live Example](http://mongodb.design/component/drawer/live-example)                   |
| [@leafygreen-ui/emotion](./packages/emotion)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/emotion)](https://www.npmjs.com/package/@leafygreen-ui/emotion)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/emotion?color=white)             | [Live Example](http://mongodb.design/component/emotion/live-example)                  |
| [@leafygreen-ui/empty-state](./packages/empty-state)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/empty-state)](https://www.npmjs.com/package/@leafygreen-ui/empty-state)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/empty-state?color=white)         | [Live Example](http://mongodb.design/component/empty-state/live-example)              |
| [@leafygreen-ui/expandable-card](./packages/expandable-card)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/expandable-card)](https://www.npmjs.com/package/@leafygreen-ui/expandable-card)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/expandable-card?color=white)     | [Live Example](http://mongodb.design/component/expandable-card/live-example)          |
| [@leafygreen-ui/form-field](./packages/form-field)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/form-field)](https://www.npmjs.com/package/@leafygreen-ui/form-field)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/form-field?color=white)          | [Live Example](http://mongodb.design/component/form-field/live-example)               |
| [@leafygreen-ui/form-footer](./packages/form-footer)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/form-footer)](https://www.npmjs.com/package/@leafygreen-ui/form-footer)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/form-footer?color=white)         | [Live Example](http://mongodb.design/component/form-footer/live-example)              |
| [@leafygreen-ui/gallery-indicator](./packages/gallery-indicator)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/gallery-indicator)](https://www.npmjs.com/package/@leafygreen-ui/gallery-indicator)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/gallery-indicator?color=white)   | [Live Example](http://mongodb.design/component/gallery-indicator/live-example)        |
| [@leafygreen-ui/guide-cue](./packages/guide-cue)                     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/guide-cue)](https://www.npmjs.com/package/@leafygreen-ui/guide-cue)                     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/guide-cue?color=white)           | [Live Example](http://mongodb.design/component/guide-cue/live-example)                |
| [@leafygreen-ui/hooks](./packages/hooks)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/hooks)](https://www.npmjs.com/package/@leafygreen-ui/hooks)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/hooks?color=white)               | [Live Example](http://mongodb.design/component/hooks/live-example)                    |
| [@leafygreen-ui/icon](./packages/icon)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/icon)](https://www.npmjs.com/package/@leafygreen-ui/icon)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/icon?color=white)                | [Live Example](http://mongodb.design/component/icon/live-example)                     |
| [@leafygreen-ui/icon-button](./packages/icon-button)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/icon-button)](https://www.npmjs.com/package/@leafygreen-ui/icon-button)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/icon-button?color=white)         | [Live Example](http://mongodb.design/component/icon-button/live-example)              |
| [@leafygreen-ui/info-sprinkle](./packages/info-sprinkle)             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/info-sprinkle)](https://www.npmjs.com/package/@leafygreen-ui/info-sprinkle)             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/info-sprinkle?color=white)       | [Live Example](http://mongodb.design/component/info-sprinkle/live-example)            |
| [@leafygreen-ui/inline-definition](./packages/inline-definition)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition)](https://www.npmjs.com/package/@leafygreen-ui/inline-definition)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/inline-definition?color=white)   | [Live Example](http://mongodb.design/component/inline-definition/live-example)        |
| [@leafygreen-ui/input-option](./packages/input-option)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/input-option)](https://www.npmjs.com/package/@leafygreen-ui/input-option)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/input-option?color=white)        | [Live Example](http://mongodb.design/component/input-option/live-example)             |
| [@leafygreen-ui/leafygreen-provider](./packages/leafygreen-provider) | [![version](https://img.shields.io/npm/v/@leafygreen-ui/leafygreen-provider)](https://www.npmjs.com/package/@leafygreen-ui/leafygreen-provider) | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/leafygreen-provider?color=white) | [Live Example](http://mongodb.design/component/leafygreen-provider/live-example)      |
| [@leafygreen-ui/lib](./packages/lib)                                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/lib)](https://www.npmjs.com/package/@leafygreen-ui/lib)                                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/lib?color=white)                 | [Live Example](http://mongodb.design/component/lib/live-example)                      |
| [@leafygreen-ui/loading-indicator](./packages/loading-indicator)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/loading-indicator)](https://www.npmjs.com/package/@leafygreen-ui/loading-indicator)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/loading-indicator?color=white)   | [Live Example](http://mongodb.design/component/loading-indicator/live-example)        |
| [@leafygreen-ui/logo](./packages/logo)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/logo)](https://www.npmjs.com/package/@leafygreen-ui/logo)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/logo?color=white)                | [Live Example](http://mongodb.design/component/logo/live-example)                     |
| [@leafygreen-ui/marketing-modal](./packages/marketing-modal)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/marketing-modal)](https://www.npmjs.com/package/@leafygreen-ui/marketing-modal)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/marketing-modal?color=white)     | [Live Example](http://mongodb.design/component/marketing-modal/live-example)          |
| [@leafygreen-ui/menu](./packages/menu)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/menu)](https://www.npmjs.com/package/@leafygreen-ui/menu)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/menu?color=white)                | [Live Example](http://mongodb.design/component/menu/live-example)                     |
| [@leafygreen-ui/modal](./packages/modal)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/modal)](https://www.npmjs.com/package/@leafygreen-ui/modal)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/modal?color=white)               | [Live Example](http://mongodb.design/component/modal/live-example)                    |
| [@leafygreen-ui/number-input](./packages/number-input)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/number-input)](https://www.npmjs.com/package/@leafygreen-ui/number-input)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/number-input?color=white)        | [Live Example](http://mongodb.design/component/number-input/live-example)             |
| [@leafygreen-ui/ordered-list](./packages/ordered-list)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/ordered-list)](https://www.npmjs.com/package/@leafygreen-ui/ordered-list)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/ordered-list?color=white)        | [Live Example](http://mongodb.design/component/ordered-list/live-example)             |
| [@leafygreen-ui/pagination](./packages/pagination)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/pagination)](https://www.npmjs.com/package/@leafygreen-ui/pagination)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/pagination?color=white)          | [Live Example](http://mongodb.design/component/pagination/live-example)               |
| [@leafygreen-ui/palette](./packages/palette)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/palette)](https://www.npmjs.com/package/@leafygreen-ui/palette)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/palette?color=white)             | [Live Example](http://mongodb.design/component/palette/live-example)                  |
| [@leafygreen-ui/password-input](./packages/password-input)           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/password-input)](https://www.npmjs.com/package/@leafygreen-ui/password-input)           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/password-input?color=white)      | [Live Example](http://mongodb.design/component/password-input/live-example)           |
| [@leafygreen-ui/preview-card](./packages/preview-card)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/preview-card)](https://www.npmjs.com/package/@leafygreen-ui/preview-card)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/preview-card?color=white)        | [Live Example](http://mongodb.design/component/preview-card/live-example)             |
| [@leafygreen-ui/pipeline](./packages/pipeline)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/pipeline)](https://www.npmjs.com/package/@leafygreen-ui/pipeline)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/pipeline?color=white)            | [Live Example](http://mongodb.design/component/pipeline/live-example)                 |
| [@leafygreen-ui/polymorphic](./packages/polymorphic)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/polymorphic)](https://www.npmjs.com/package/@leafygreen-ui/polymorphic)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/polymorphic?color=white)         | [Live Example](http://mongodb.design/component/polymorphic/live-example)              |
| [@leafygreen-ui/popover](./packages/popover)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/popover)](https://www.npmjs.com/package/@leafygreen-ui/popover)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/popover?color=white)             | [Live Example](http://mongodb.design/component/popover/live-example)                  |
| [@leafygreen-ui/portal](./packages/portal)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/portal)](https://www.npmjs.com/package/@leafygreen-ui/portal)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/portal?color=white)              | [Live Example](http://mongodb.design/component/portal/live-example)                   |
| [@leafygreen-ui/progress-bar](./packages/progress-bar)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/progress-bar)](https://www.npmjs.com/package/@leafygreen-ui/progress-bar)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/progress-bar?color=white)        | [Live Example](http://mongodb.design/component/progress-bar/live-example)             |
| [@leafygreen-ui/radio-box-group](./packages/radio-box-group)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/radio-box-group)](https://www.npmjs.com/package/@leafygreen-ui/radio-box-group)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/radio-box-group?color=white)     | [Live Example](http://mongodb.design/component/radio-box-group/live-example)          |
| [@leafygreen-ui/radio-group](./packages/radio-group)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/radio-group)](https://www.npmjs.com/package/@leafygreen-ui/radio-group)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/radio-group?color=white)         | [Live Example](http://mongodb.design/component/radio-group/live-example)              |
| [@leafygreen-ui/ripple](./packages/ripple)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/ripple)](https://www.npmjs.com/package/@leafygreen-ui/ripple)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/ripple?color=white)              | [Live Example](http://mongodb.design/component/ripple/live-example)                   |
| [@leafygreen-ui/search-input](./packages/search-input)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/search-input)](https://www.npmjs.com/package/@leafygreen-ui/search-input)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/search-input?color=white)        | [Live Example](http://mongodb.design/component/search-input/live-example)             |
| [@leafygreen-ui/section-nav](./packages/section-nav)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/section-nav)](https://www.npmjs.com/package/@leafygreen-ui/section-nav)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/section-nav?color=white)         | [Live Example](http://mongodb.design/component/section-nav/live-example)              |
| [@leafygreen-ui/segmented-control](./packages/segmented-control)     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/segmented-control)](https://www.npmjs.com/package/@leafygreen-ui/segmented-control)     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/segmented-control?color=white)   | [Live Example](http://mongodb.design/component/segmented-control/live-example)        |
| [@leafygreen-ui/select](./packages/select)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/select)](https://www.npmjs.com/package/@leafygreen-ui/select)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/select?color=white)              | [Live Example](http://mongodb.design/component/select/live-example)                   |
| [@leafygreen-ui/side-nav](./packages/side-nav)                       | [![version](https://img.shields.io/npm/v/@leafygreen-ui/side-nav)](https://www.npmjs.com/package/@leafygreen-ui/side-nav)                       | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/side-nav?color=white)            | [Live Example](http://mongodb.design/component/side-nav/live-example)                 |
| [@leafygreen-ui/skeleton-loader](./packages/skeleton-loader)         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/skeleton-loader)](https://www.npmjs.com/package/@leafygreen-ui/skeleton-loader)         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/skeleton-loader?color=white)     | [Live Example](http://mongodb.design/component/skeleton-loader/live-example)          |
| [@leafygreen-ui/split-button](./packages/split-button)               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/split-button)](https://www.npmjs.com/package/@leafygreen-ui/split-button)               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/split-button?color=white)        | [Live Example](http://mongodb.design/component/split-button/live-example)             |
| [@leafygreen-ui/stepper](./packages/stepper)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/stepper)](https://www.npmjs.com/package/@leafygreen-ui/stepper)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/stepper?color=white)             | [Live Example](http://mongodb.design/component/stepper/live-example)                  |
| [@leafygreen-ui/table](./packages/table)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/table)](https://www.npmjs.com/package/@leafygreen-ui/table)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/table?color=white)               | [Live Example](http://mongodb.design/component/table/live-example)                    |
| [@leafygreen-ui/tabs](./packages/tabs)                               | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tabs)](https://www.npmjs.com/package/@leafygreen-ui/tabs)                               | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tabs?color=white)                | [Live Example](http://mongodb.design/component/tabs/live-example)                     |
| [@leafygreen-ui/testing-lib](./packages/testing-lib)                 | [![version](https://img.shields.io/npm/v/@leafygreen-ui/testing-lib)](https://www.npmjs.com/package/@leafygreen-ui/testing-lib)                 | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/testing-lib?color=white)         | [Live Example](http://mongodb.design/component/testing-lib/live-example)              |
| [@leafygreen-ui/text-area](./packages/text-area)                     | [![version](https://img.shields.io/npm/v/@leafygreen-ui/text-area)](https://www.npmjs.com/package/@leafygreen-ui/text-area)                     | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/text-area?color=white)           | [Live Example](http://mongodb.design/component/text-area/live-example)                |
| [@leafygreen-ui/text-input](./packages/text-input)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/text-input)](https://www.npmjs.com/package/@leafygreen-ui/text-input)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/text-input?color=white)          | [Live Example](http://mongodb.design/component/text-input/live-example)               |
| [@leafygreen-ui/toast](./packages/toast)                             | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toast)](https://www.npmjs.com/package/@leafygreen-ui/toast)                             | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toast?color=white)               | [Live Example](http://mongodb.design/component/toast/live-example)                    |
| [@leafygreen-ui/toggle](./packages/toggle)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toggle)](https://www.npmjs.com/package/@leafygreen-ui/toggle)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toggle?color=white)              | [Live Example](http://mongodb.design/component/toggle/live-example)                   |
| [@leafygreen-ui/tokens](./packages/tokens)                           | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tokens)](https://www.npmjs.com/package/@leafygreen-ui/tokens)                           | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tokens?color=white)              | [Live Example](http://mongodb.design/component/tokens/live-example)                   |
| [@leafygreen-ui/toolbar](./packages/toolbar)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/toolbar)](https://www.npmjs.com/package/@leafygreen-ui/toolbar)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/toolbar?color=white)             | [Live Example](http://mongodb.design/component/toolbar/live-example)                  |
| [@leafygreen-ui/tooltip](./packages/tooltip)                         | [![version](https://img.shields.io/npm/v/@leafygreen-ui/tooltip)](https://www.npmjs.com/package/@leafygreen-ui/tooltip)                         | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/tooltip?color=white)             | [Live Example](http://mongodb.design/component/tooltip/live-example)                  |
| [@leafygreen-ui/typography](./packages/typography)                   | [![version](https://img.shields.io/npm/v/@leafygreen-ui/typography)](https://www.npmjs.com/package/@leafygreen-ui/typography)                   | ![downloads](https://img.shields.io/npm/dm/@leafygreen-ui/typography?color=white)          | [Live Example](http://mongodb.design/component/typography/live-example)               |
| [@lg-charts/chart-card](./charts/chart-card)                         | [![version](https://img.shields.io/npm/v/@lg-charts/chart-card)](https://www.npmjs.com/package/@lg-charts/chart-card)                           | ![downloads](https://img.shields.io/npm/dm/@lg-charts/chart-card?color=white)              | [Live Example](http://mongodb.design/component/chart-card/live-example)               |
| [@lg-charts/colors](./charts/colors)                                 | [![version](https://img.shields.io/npm/v/@lg-charts/colors)](https://www.npmjs.com/package/@lg-charts/colors)                                   | ![downloads](https://img.shields.io/npm/dm/@lg-charts/colors?color=white)                  | [Live Example](http://mongodb.design/component/colors/live-example)                   |
| [@lg-charts/core](./charts/core)                                     | [![version](https://img.shields.io/npm/v/@lg-charts/core)](https://www.npmjs.com/package/@lg-charts/core)                                       | ![downloads](https://img.shields.io/npm/dm/@lg-charts/core?color=white)                    | [Live Example](http://mongodb.design/component/core/live-example)                     |
| [@lg-charts/drag-provider](./charts/drag-provider)                   | [![version](https://img.shields.io/npm/v/@lg-charts/drag-provider)](https://www.npmjs.com/package/@lg-charts/drag-provider)                     | ![downloads](https://img.shields.io/npm/dm/@lg-charts/drag-provider?color=white)           | [Live Example](http://mongodb.design/component/drag-provider/live-example)            |
| [@lg-charts/legend](./charts/legend)                                 | [![version](https://img.shields.io/npm/v/@lg-charts/legend)](https://www.npmjs.com/package/@lg-charts/legend)                                   | ![downloads](https://img.shields.io/npm/dm/@lg-charts/legend?color=white)                  | [Live Example](http://mongodb.design/component/legend/live-example)                   |
| [@lg-charts/series-provider](./charts/series-provider)               | [![version](https://img.shields.io/npm/v/@lg-charts/series-provider)](https://www.npmjs.com/package/@lg-charts/series-provider)                 | ![downloads](https://img.shields.io/npm/dm/@lg-charts/series-provider?color=white)         | [Live Example](http://mongodb.design/component/series-provider/live-example)          |
| [@lg-chat/avatar](./chat/avatar)                                     | [![version](https://img.shields.io/npm/v/@lg-chat/avatar)](https://www.npmjs.com/package/@lg-chat/avatar)                                       | ![downloads](https://img.shields.io/npm/dm/@lg-chat/avatar?color=white)                    | [Live Example](http://mongodb.design/component/avatar/live-example)                   |
| [@lg-chat/chat-disclaimer](./chat/chat-disclaimer)                   | [![version](https://img.shields.io/npm/v/@lg-chat/chat-disclaimer)](https://www.npmjs.com/package/@lg-chat/chat-disclaimer)                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/chat-disclaimer?color=white)           | [Live Example](http://mongodb.design/component/chat-disclaimer/live-example)          |
| [@lg-chat/chat-window](./chat/chat-window)                           | [![version](https://img.shields.io/npm/v/@lg-chat/chat-window)](https://www.npmjs.com/package/@lg-chat/chat-window)                             | ![downloads](https://img.shields.io/npm/dm/@lg-chat/chat-window?color=white)               | [Live Example](http://mongodb.design/component/chat-window/live-example)              |
| [@lg-chat/fixed-chat-window](./chat/fixed-chat-window)               | [![version](https://img.shields.io/npm/v/@lg-chat/fixed-chat-window)](https://www.npmjs.com/package/@lg-chat/fixed-chat-window)                 | ![downloads](https://img.shields.io/npm/dm/@lg-chat/fixed-chat-window?color=white)         | [Live Example](http://mongodb.design/component/fixed-chat-window/live-example)        |
| [@lg-chat/input-bar](./chat/input-bar)                               | [![version](https://img.shields.io/npm/v/@lg-chat/input-bar)](https://www.npmjs.com/package/@lg-chat/input-bar)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-chat/input-bar?color=white)                 | [Live Example](http://mongodb.design/component/input-bar/live-example)                |
| [@lg-chat/leafygreen-chat-provider](./chat/leafygreen-chat-provider) | [![version](https://img.shields.io/npm/v/@lg-chat/leafygreen-chat-provider)](https://www.npmjs.com/package/@lg-chat/leafygreen-chat-provider)   | ![downloads](https://img.shields.io/npm/dm/@lg-chat/leafygreen-chat-provider?color=white)  | [Live Example](http://mongodb.design/component/leafygreen-chat-provider/live-example) |
| [@lg-chat/lg-markdown](./chat/lg-markdown)                           | [![version](https://img.shields.io/npm/v/@lg-chat/lg-markdown)](https://www.npmjs.com/package/@lg-chat/lg-markdown)                             | ![downloads](https://img.shields.io/npm/dm/@lg-chat/lg-markdown?color=white)               | [Live Example](http://mongodb.design/component/lg-markdown/live-example)              |
| [@lg-chat/message](./chat/message)                                   | [![version](https://img.shields.io/npm/v/@lg-chat/message)](https://www.npmjs.com/package/@lg-chat/message)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message?color=white)                   | [Live Example](http://mongodb.design/component/message/live-example)                  |
| [@lg-chat/message-actions](./chat/message-actions)                   | [![version](https://img.shields.io/npm/v/@lg-chat/message-actions)](https://www.npmjs.com/package/@lg-chat/message-actions)                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-actions?color=white)           | [Live Example](http://mongodb.design/component/message-actions/live-example)          |
| [@lg-chat/message-feed](./chat/message-feed)                         | [![version](https://img.shields.io/npm/v/@lg-chat/message-feed)](https://www.npmjs.com/package/@lg-chat/message-feed)                           | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-feed?color=white)              | [Live Example](http://mongodb.design/component/message-feed/live-example)             |
| [@lg-chat/message-feedback](./chat/message-feedback)                 | [![version](https://img.shields.io/npm/v/@lg-chat/message-feedback)](https://www.npmjs.com/package/@lg-chat/message-feedback)                   | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-feedback?color=white)          | [Live Example](http://mongodb.design/component/message-feedback/live-example)         |
| [@lg-chat/message-prompts](./chat/message-prompts)                   | [![version](https://img.shields.io/npm/v/@lg-chat/message-prompts)](https://www.npmjs.com/package/@lg-chat/message-prompts)                     | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-prompts?color=white)           | [Live Example](http://mongodb.design/component/message-prompts/live-example)          |
| [@lg-chat/message-rating](./chat/message-rating)                     | [![version](https://img.shields.io/npm/v/@lg-chat/message-rating)](https://www.npmjs.com/package/@lg-chat/message-rating)                       | ![downloads](https://img.shields.io/npm/dm/@lg-chat/message-rating?color=white)            | [Live Example](http://mongodb.design/component/message-rating/live-example)           |
| [@lg-chat/rich-links](./chat/rich-links)                             | [![version](https://img.shields.io/npm/v/@lg-chat/rich-links)](https://www.npmjs.com/package/@lg-chat/rich-links)                               | ![downloads](https://img.shields.io/npm/dm/@lg-chat/rich-links?color=white)                | [Live Example](http://mongodb.design/component/rich-links/live-example)               |
| [@lg-chat/suggestions](./chat/suggestions)                           | [![version](https://img.shields.io/npm/v/@lg-chat/suggestions)](https://www.npmjs.com/package/@lg-chat/suggestions)                             | ![downloads](https://img.shields.io/npm/dm/@lg-chat/suggestions?color=white)               | [Live Example](http://mongodb.design/component/suggestions/live-example)              |
| [@lg-chat/title-bar](./chat/title-bar)                               | [![version](https://img.shields.io/npm/v/@lg-chat/title-bar)](https://www.npmjs.com/package/@lg-chat/title-bar)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-chat/title-bar?color=white)                 | [Live Example](http://mongodb.design/component/title-bar/live-example)                |
| [@lg-tools/build](./tools/build)                                     | [![version](https://img.shields.io/npm/v/@lg-tools/build)](https://www.npmjs.com/package/@lg-tools/build)                                       | ![downloads](https://img.shields.io/npm/dm/@lg-tools/build?color=white)                    |                                                                                       |
| [@lg-tools/cli](./tools/cli)                                         | [![version](https://img.shields.io/npm/v/@lg-tools/cli)](https://www.npmjs.com/package/@lg-tools/cli)                                           | ![downloads](https://img.shields.io/npm/dm/@lg-tools/cli?color=white)                      |                                                                                       |
| [@lg-tools/codemods](./tools/codemods)                               | [![version](https://img.shields.io/npm/v/@lg-tools/codemods)](https://www.npmjs.com/package/@lg-tools/codemods)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/codemods?color=white)                 |                                                                                       |
| [@lg-tools/create](./tools/create)                                   | [![version](https://img.shields.io/npm/v/@lg-tools/create)](https://www.npmjs.com/package/@lg-tools/create)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/create?color=white)                   |                                                                                       |
| [@lg-tools/install](./tools/install)                                 | [![version](https://img.shields.io/npm/v/@lg-tools/install)](https://www.npmjs.com/package/@lg-tools/install)                                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/install?color=white)                  |                                                                                       |
| [@lg-tools/link](./tools/link)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/link)](https://www.npmjs.com/package/@lg-tools/link)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/link?color=white)                     |                                                                                       |
| [@lg-tools/lint](./tools/lint)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/lint)](https://www.npmjs.com/package/@lg-tools/lint)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/lint?color=white)                     |                                                                                       |
| [@lg-tools/meta](./tools/meta)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/meta)](https://www.npmjs.com/package/@lg-tools/meta)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/meta?color=white)                     |                                                                                       |
| [@lg-tools/slackbot](./tools/slackbot)                               | [![version](https://img.shields.io/npm/v/@lg-tools/slackbot)](https://www.npmjs.com/package/@lg-tools/slackbot)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/slackbot?color=white)                 |                                                                                       |
| [@lg-tools/storybook-addon](./tools/storybook-addon)                 | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-addon)](https://www.npmjs.com/package/@lg-tools/storybook-addon)                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-addon?color=white)          |                                                                                       |
| [@lg-tools/storybook-decorators](./tools/storybook-decorators)       | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-decorators)](https://www.npmjs.com/package/@lg-tools/storybook-decorators)         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-decorators?color=white)     |                                                                                       |
| [@lg-tools/storybook-utils](./tools/storybook-utils)                 | [![version](https://img.shields.io/npm/v/@lg-tools/storybook-utils)](https://www.npmjs.com/package/@lg-tools/storybook-utils)                   | ![downloads](https://img.shields.io/npm/dm/@lg-tools/storybook-utils?color=white)          |                                                                                       |
| [@lg-tools/test](./tools/test)                                       | [![version](https://img.shields.io/npm/v/@lg-tools/test)](https://www.npmjs.com/package/@lg-tools/test)                                         | ![downloads](https://img.shields.io/npm/dm/@lg-tools/test?color=white)                     |                                                                                       |
| [@lg-tools/test-harnesses](./tools/test-harnesses)                   | [![version](https://img.shields.io/npm/v/@lg-tools/test-harnesses)](https://www.npmjs.com/package/@lg-tools/test-harnesses)                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/test-harnesses?color=white)           |                                                                                       |
| [@lg-tools/update](./tools/update)                                   | [![version](https://img.shields.io/npm/v/@lg-tools/update)](https://www.npmjs.com/package/@lg-tools/update)                                     | ![downloads](https://img.shields.io/npm/dm/@lg-tools/update?color=white)                   |                                                                                       |
| [@lg-tools/validate](./tools/validate)                               | [![version](https://img.shields.io/npm/v/@lg-tools/validate)](https://www.npmjs.com/package/@lg-tools/validate)                                 | ![downloads](https://img.shields.io/npm/dm/@lg-tools/validate?color=white)                 |                                                                                       |

## Development

### Setup

1. Node >= 18.0.0 required.

   via [homebrew](https://brew.sh/) with `brew install node`

   via [nodejs installer](https://nodejs.org/en/)

2. Install PNPM >= 9.15.0.

   [PNPM Installation documentation](https://pnpm.io/installation)

3. Clone the repository.

   ```bash
   # Navigate to the directory you'd like to clone the repository into
   $ cd ~/my/repositories

   # Clone the repository.

   # We recommend installing using the SSH address rather than the HTTPS one to make authentication easier for you. To set up SSH authentication with GitHub, see their guide: https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account
   ```

4. Install dependencies and link packages.
   ```ts
   pnpm run init
   ```

### Storybook

Start up storybook to see all UI components that exist:

```ts
pnpm start
```

Note: Running storybook doesn't trigger changes in dependencies, only the main component's — e.g. If you're looking at `Button`, and make a change to `Lib`, you need to rebuild `Lib` for Storybook to see those changes in `Button`.

### Building Packages

To rebuild all packages:

```ts
pnpm build
```

To rebuild select packages, filter using `--filter`:

```ts
pnpm build --filter="[package]"
// ex. --filter="@leafygreen-ui/hooks"
```

### Development within an Application

To actively develop `leafygreen-ui` components within an application, the following script will link all `leafygreen-ui` components within your application to the local `leafygreen-ui` repository.

This will allow you to make changes to your local repository of `leafygreen-ui` and see those changes immediately reflected within your running application. This allows you to develop both in isolation (within `leafygreen-ui`) and in the context of your application.

To do this, clone this repository and navigate to the root directory (where `package.json` is located), then run the following:

```
pnpm run link -- ${PATH_TO_APPLICATION}
```

The script does several things in order:

1. This builds every `leafygreen-ui` component so they are ready to be linked

2. It scans your application for any installed `leafygreen-ui` components in your `node_modules/@leafygreen-ui` folder.
   **NOTE:** If the package is new and unpublished/not installed, you will need to create a directory for the new component within your application inside `node_modules/@leafygreen-ui` before running this command.

3. If any `leafygreen-ui` components are found then the script uses `pnpm link` to link every `node_modules/@leafygreen-ui` module to your local `leafygreen-ui` repository.

After the script completes, you can make changes directly to the component in your local `leafygreen-ui` repository. Once you do this, run `pnpm build` in the root of the `leafygreen-ui` repository and the changes will be visible on your running application.

## Creating New Component

### Getting Started

To get started quickly and easily run `pnpm create-package my-new-package`. When you run this command, we create a directory containing all of the boilerplate code that you'll need to start developing your new Component.

Note: it's important to follow the kebab-casing convention described above.

- Add the new component to `build.tsconfig.json`
- If you are using any `leafygreen-ui` dependencies in your new component, add the dependency to the component directory's `tsconfig.json`.
- Run `pnpm run init` to link all packages before starting development

## Formatting and linting

When you run `pnpm fix`, we do the following:

- We run `pnpm prettier:fix` so that we have consistently formatted code.
- We run `pnpm eslint:fix` to catch any syntax errors, unused variables, and any other easy-to-catch issues.

To fix all files in the repository, run the following:

```
pnpm fix
```

To check if any files need formatting without automatically formatting them, run the following:

```
pnpm prettier:check
```

To run linting without automatically fixing issues, run the following:

```
pnpm eslint:check
```

## Typechecking

To run typechecking without compiling the code, run the following:

```
pnpm ts
```

## Testing

To run the unit tests for our components, run the following:

```
pnpm test
```

## Committing

When making a PR that contains changes that should be included in a package's changelog, be sure to do so by running:

```
pnpm changeset
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
2. Enter pre-release mode: `pnpm changeset pre enter beta` (name can be `next`, `beta`, `alpha`, or any other name)
3. Update package versions `pnpm changeset version`
   - This will update any packages with existing changeset files to version `X.Y.Z-beta.0` (or whatever name you used)
4. Commit these updates `git commit -am "Prerelease version packages"`
5. Build the component(s) you're pre-releasing `pnpm build <...components>`
6. Publish the prerelease with `pnpm changeset publish`

Any new work you do should be done in the _original_ (`new-feature`) branch.
To publish a new pre-release version, pull the changes from `new-feature` into branch `pre-release`, and follow steps 3-5.

When `new-feature` is merged into `main`, you can safely delete the `pre-release` branch

## Deploy gh-pages

You can deploy a static build of our Storybook site to gh-pages from the `main` branch.

1. First be sure you've built a static version of Storybook with the script: `build-storybook`
2. Then deploy to gh-pages: `pnpm release:site`

### To deploy to your own mirror of leafygreen-ui

1. Run `pnpm demo:site [your_github_username]`.
2. If you haven't built a static version of Storybook yet, you will be prompted to do so.
3. You will be asked for confirmation before Storybook is published.

## License

The source files in this repository are made available under the terms of the Apache License, version 2.0.
