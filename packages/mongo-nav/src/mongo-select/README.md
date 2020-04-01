# Project Select

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/mongo-nav.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/mongo-nav
```

### NPM

```shell
npm install @leafygreen-ui/mongo-nav
```

## Example

```js
import { ProjectSelect } from '@leafygreen-ui/mongo-nav';

<ProjectSelect
  current={currentProject}
  data={allProjects}
  onClick={onClickProjectSelect}
  onChange={onChangeProject}
  constructProjectURL={constructProjectURL}
  urls={mongoSelectURLs}
  loading={loading}
  className={projectSelectButtonClassName}
/>;
```

## Properties

| Prop                  | Type                                          | Description                                                         | Default |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------- | ------- |
| current               | `CurrentProject`                              | The current active project                                          |         |
| data                  | `Array<Project>`                              | A list of projects to display                                       | `[]`    |
| onClick               | `MouseEventHandler`                           | Callback invoked after the user clicks the Project Select button    |         |
| onChange              | `(value: string, event: ChangeEvent) => void` | Callback invoked after the user clicks a Project link               |         |
| `constructProjectURL` | `(Project) => string`                         | Function to determine destination URL when user selects a project   |         |
| urls                  | see below                                     | A subset of URLs used by the Project and Org Selects                |         |
| loading               | `boolean`                                     | Indicates whether or not the data for the Projet Select is loading  |         |
| className             | `string`                                      | Applies a className to the root element (the Project Select button) |         |

## MongoSelect URLs

Project Select requires a subset of the URLs interface required by `MongoNav`, corresponding to the value `urls.mongoSelect`. This object's shape is as follows:

```typescript
interface MongoSelectUrls = {
  viewAllProjects?: string,
  newProject?: string,
  viewAllOrganizations?: string,
  orgSettings?: string,
};
```
