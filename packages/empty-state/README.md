# Empty State

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/empty-state.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/empty-state/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/empty-state
```

### NPM

```shell
npm install @leafygreen-ui/empty-state
```

## Example

**Output HTML**

## Properties

#### BasicEmptyState

```
import { BasicEmptyState } from '@leafygreen-ui/empty-state';

<BasicEmptyState
  title="No Results Found"
  description="Try adjusting your filters or search terms"
  graphic={<SvgOrImgComponent />}
  primaryButton={<Button />}
  secondaryButton={<Button />}
  externalLink={<Link />}
/>

```

A basic empty state component to be used with MongoDB marketing-approved graphics.

| Prop              | Type           | Description                                                                                                        | Default     |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `graphic`         | `ReactElement` | Graphic shown left of text content. The component is designed to be used with MongoDB marketing-approved graphics. | `undefined` |
| `title`\*         | `string`       | Heading text.                                                                                                      |             |
| `description`\*   | `ReactChild`   | Secondary text.                                                                                                    |             |
| `primaryButton`   | `ReactElement` | Optional primary call-to-action button.                                                                            | `undefined` |
| `secondaryButton` | `ReactElement` | Optional secondary call-to-action button. This should only exist when a `primaryButton` exists.                    | `undefined` |

#### FeaturesEmptyState

A component to highlight a set of features in an empty state.

```
import { FeaturesEmptyState } from '@leafygreen-ui/empty-state';

<FeaturesEmptyState
  title="Explore Your Data"
  features={[
    { graphic: <YourIcon1 />, title: "Feature 1", description: "Description of feature 1" },
    { graphic: <YourIcon2 />, title: "Feature 2", description: "Description of feature 2" },
    { graphic: <YourIcon3 />, title: "Feature 3", description: "Description of feature 3" },
  ]}
  primaryButton={<Button />}
  secondaryButton={<Button />}
  externalLink={<Link />}
/>

```

| Prop              | Type             | Description                                                                                     | Default     |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| `title`\*         | `string`         | Heading text.                                                                                   |             |
| `features`\*      | `Array<Feature>` | Array of feature objects (length should be 2 or 3 elements).                                    |             |
| `primaryButton`   | `ReactElement`   | Optional primary call-to-action button.                                                         | `undefined` |
| `secondaryButton` | `ReactElement`   | Optional secondary call-to-action button. This should only exist when a `primaryButton` exists. | `undefined` |
| `externalLink`    | `ReactElement`   | Optional link to external page for additional information.                                      | `undefined` |

Note: The features prop must contain an array of feature objects, where each object should have the `icon`, `title`, and `description` properties.

#### Feature

| Property      | Type           | Description                              |
| ------------- | -------------- | ---------------------------------------- |
| `graphic`     | `ReactElement` | Icon element to display for the feature. |
| `title`       | `string`       | Title of the feature.                    |
| `description` | `ReactChild`   | Description of the feature.              |
