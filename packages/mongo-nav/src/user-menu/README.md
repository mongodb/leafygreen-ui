# UserMenu

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
import { UserMenu } from '@leafygreen-ui/mongo-nav';

<UserMenu
  account={account}
  activeProduct={activeProduct}
  urls={urls}
  hosts={hosts}
/>;
```

**Output HTML**

## Properties

| Prop              | Type                                                                                                                                                                 | Description                                                                                                                                                | Default                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `account`         | `{firstName: string, lastName: string, email: string, alerts: number}`                                                                                               | Object that contains information about the active user.                                                                                                    |                                                                                                                                                                               |
| `activeProduct`   | `cloud`, `university` or `support`                                                                                                                                   | MongoDB product that is currently active                                                                                                                   |                                                                                                                                                                               |
| `onLogout`        | `Function`                                                                                                                                                           | Callback invoked after the user clicks log out                                                                                                             | `() => {}`                                                                                                                                                                    |
| `onProductChange` | `Function`                                                                                                                                                           | Callback invoked after the user clicks a product.                                                                                                          | `() => {}`                                                                                                                                                                    |
| `hosts`           | `{ cloud, support, university, account }`                                                                                                                            | Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<UserMenu />` to work across all environments. | `{ cloud: 'cloud.mongodb.com', support: 'support.mongodb.com', university: 'university.mongodb.com', account: 'account.mongodb.com' }`                                        |
| `urls`            | `{ userMenu:{ cloud: { userPreferences, organizations, invitations, mfa }, university: { videoPreferences }, support: { userPreferences }, account: { homepage } }}` | Object to enable custom overrides for every `href` used in `<UserMenu />`.                                                                                 | If overrides are not passed in, default values are constructed based on hosts prop. In the absence of the hosts prop, will default to URLS that suit a production environment |
