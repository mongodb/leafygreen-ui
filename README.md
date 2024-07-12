# Canvas Header

![npm (scoped)](https://img.shields.io/npm/v/@lg-private/canvas-header.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/canvas-header/example/)

## Installation

### Yarn

```shell
yarn add @lg-private/canvas-header
```

### NPM

```shell
npm install @lg-private/canvas-header
```

## Example

```js
import { CanvasHeader } from `@lg-private/canvas-header`;
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { BackLink } from '@leafygreen-ui/typography';


  <CanvasHeader
    pageTitle="page title"
    resourceName='ac_iqttxwn_shard-00-01.hvcuthh.mongodbnet:27017_324892384903284902384903284903284902384903284832908_long_name'
    resourceIcon={<Icon glyph={'ShardedCluster'} />}
    backLink={
      <BackLink
        href="/home"
      >
        Back to Cluster
      </BackLink>
    }
    actions={
      <Button
        variant="primary"
        leftGlyph={<Icon glyph={'InviteUser'} />}
      >
        Invite user
      </Button>
    }
    badges={
      <>
        <Badge variant="green">Enabled</Badge>
        <Badge variant="blue">In Dev Mode</Badge>
      </>
    }
  />
```

## Properties

| Prop           | Type              | Description                                                                   | Default |
| -------------- | ----------------- | ----------------------------------------------------------------------------- | ------- |
| `darkMode`     | `boolean`         | Determines if the component renders in dark mode                              | `false` |
| `pageTitle`    | `React.ReactNode` | Required page title                                                           |         |
| `resourceName` | `string`          | Opitional resource name that will copy to the clipboard when clicked          |         |
| `resourceIcon` | `React.ReachNode` | Optional icon that will render to the left of the resource name               |         |
| `badges`       | `React.ReachNode` | Optional badges that will render to the right of the resource name            |         |
| `actions`      | `React.ReachNode` | Optional buttons that will render to the right of the badges or resource name |         |
| `backLink`     | `React.ReactNode` | Optional link that will render above the page title.                          |         |
