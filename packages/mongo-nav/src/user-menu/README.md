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

```Javascript
import { UserMenu } from '@leafygreen-ui/mongo-nav';

<UserMenu
  account={account}
  activeProduct={activeProduct}
  urls={urls}
  hosts={hosts}
/>;
```

**Output HTML**

```html
<button data-leafygreen-ui="button-data-prop" class="leafygreen-ui-161kcxt">
  <span class="leafygreen-ui-1w553ho">DevMode</span>
  <svg>...</svg>
</button>
<div>
  <div class="leafygreen-ui-14miqj0">
    <ul class="leafygreen-ui-9rckhy" role="menu">
      <div class="leafygreen-ui-16vs4iz">
        <div class="leafygreen-ui-ey57f9">
          <svg>...</svg>
        </div>
        <h3 class="leafygreen-ui-1sz0213">DevMode Developer</h3>
        <p class="leafygreen-ui-eb24fp">dev+only+mode@example.com</p>
        <a
          href="https://account.mongodb.com/account/profile/overview"
          class="leafygreen-ui-64m91y"
          aria-disabled="false"
        >
          <span class="leafygreen-ui-1pz0klt">Manage your MongoDB Account</span>
        </a>
      </div>
      <li role="separator" class="leafygreen-ui-1xz620q"></li>
      <li role="none" class="leafygreen-ui-1ipix51">
        <a
          data-leafygreen-ui="sub-menu-container"
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          href="https://cloud.mongodb.com"
          aria-haspopup="true"
          class="leafygreen-ui-5zw952"
        >
          <svg>...</svg>
          <div>
            <div class="leafygreen-ui-1cw9d0t">Atlas</div>
            <div class="">
              <div class="leafygreen-ui-12kbxt0">
                cloud.mongodb.com
                <svg>...</svg>
              </div>
            </div>
          </div>
        </a>
        <button
          data-leafygreen-ui="icon-button"
          aria-disabled="false"
          aria-label="Close Sub-menu"
          class="leafygreen-ui-1x584s8"
        >
          <span class="leafygreen-ui-1rvdyoi"><svg>...</svg></span>
        </button>
        <ul class="leafygreen-ui-23uywq" role="menu" aria-label="Atlas">
          <li role="none">
            <a
              target="_self"
              rel=""
              href="https://cloud.mongodb.com/v2#/preferences/personalization"
              data-leafygreen-ui="menu-item-container"
              class="leafygreen-ui-127tgf0"
              role="menuitem"
              aria-disabled="false"
            >
              <div class="leafygreen-ui-vrj1me">
                <div class="leafygreen-ui-2863pl">
                  <div class="leafygreen-ui-3f75pk"></div>
                  User Preferences
                </div>
              </div>
            </a>
          </li>
          <li role="none">
            <a
              target="_self"
              rel=""
              href="https://cloud.mongodb.com/v2#/preferences/invitations"
              data-leafygreen-ui="menu-item-container"
              class="leafygreen-ui-127tgf0"
              role="menuitem"
              aria-disabled="false"
            >
              <div class="leafygreen-ui-vrj1me">
                <div class="leafygreen-ui-2863pl">
                  <div class="leafygreen-ui-3f75pk"></div>
                  <span class="leafygreen-ui-uf1ume">
                    Invitations
                    <div class="leafygreen-ui-g4d1vq">1</div>
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li role="none">
            <a
              target="_self"
              rel=""
              href="https://cloud.mongodb.com/v2#/preferences/organizations"
              data-leafygreen-ui="menu-item-container"
              class="leafygreen-ui-127tgf0"
              role="menuitem"
              aria-disabled="false"
            >
              <div class="leafygreen-ui-vrj1me">
                <div class="leafygreen-ui-2863pl">
                  <div class="leafygreen-ui-3f75pk"></div>
                  Organizations
                </div>
              </div>
            </a>
          </li>
          <li role="none">
            <a
              target="_self"
              rel=""
              href="https://cloud.mongodb.com/v2#/preferences/2fa"
              data-leafygreen-ui="menu-item-container"
              class="leafygreen-ui-127tgf0"
              role="menuitem"
              aria-disabled="false"
            >
              <div class="leafygreen-ui-vrj1me">
                <div class="leafygreen-ui-2863pl">
                  <div class="leafygreen-ui-3f75pk"></div>
                  Two-Factor Authorization
                </div>
              </div>
            </a>
          </li>
        </ul>
      </li>
      <li role="none" class="leafygreen-ui-1ipix51">
        <a
          data-leafygreen-ui="sub-menu-container"
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          href="https://university.mongodb.com"
          aria-haspopup="true"
          class="leafygreen-ui-lcbwlw"
        >
          <svg>...</svg>
          <div>
            <div class="leafygreen-ui-x1ohas">University</div>
            <div class="">
              <div class="leafygreen-ui-1y5lwzw">
                university.mongodb.com
                <svg>...</svg>
              </div>
            </div>
          </div>
        </a>
        <button
          data-leafygreen-ui="icon-button"
          aria-disabled="false"
          aria-label="Open Sub-menu"
          class="leafygreen-ui-1fct8le"
        >
          <span class="leafygreen-ui-1rvdyoi">
            <svg>...</svg>
          </span>
        </button>
      </li>
      <li role="none" class="leafygreen-ui-1ipix51">
        <a
          data-leafygreen-ui="sub-menu-container"
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          href="https://support.mongodb.com"
          aria-haspopup="true"
          class="leafygreen-ui-lcbwlw"
        >
          <svg>...</svg>
          <div>
            <div class="leafygreen-ui-x1ohas">Support</div>
            <div class="">
              <div class="leafygreen-ui-1y5lwzw">
                support.mongodb.com
                <svg>...</svg>
              </div>
            </div>
          </div>
        </a>
        <button
          data-leafygreen-ui="icon-button"
          aria-disabled="false"
          aria-label="Open Sub-menu"
          class="leafygreen-ui-1fct8le"
        >
          <span class="leafygreen-ui-1rvdyoi">
            <svg>...</svg>
          </span>
        </button>
      </li>
      <li role="separator" class="leafygreen-ui-1xz620q"></li>
      <li role="none">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://feedback.mongodb.com/"
          data-leafygreen-ui="menu-item-container"
          class="leafygreen-ui-1yd5tpt"
          role="menuitem"
          aria-disabled="false"
        >
          <svg>...</svg>
          <div class="leafygreen-ui-vrj1me">
            <div class="leafygreen-ui-2863pl">Give us feedback</div>
          </div>
        </a>
      </li>
      <li role="separator" class="leafygreen-ui-1xz620q"></li>
      <li role="none">
        <button
          data-leafygreen-ui="menu-item-container"
          class="leafygreen-ui-1yd5tpt"
          role="menuitem"
          aria-disabled="false"
        >
          <div class="leafygreen-ui-vrj1me">
            <div class="leafygreen-ui-2863pl">Logout</div>
          </div>
        </button>
      </li>
    </ul>
  </div>
</div>
```

## Properties

| Prop              | Type                                                                                                                                                                      | Description                                                                                                                                                | Default                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `account`         | `{firstName: string, lastName: string, email: string, alerts: number}`                                                                                                    | Object that contains information about the active user.                                                                                                    |                                                                                                                                                                               |
| `activeProduct`   | `'account'`, `'charts'`, `'cloud'`, `'realm'`, `'support'`, or `'university'`                                                                                             | MongoDB product that is currently active                                                                                                                   |                                                                                                                                                                               |
| `onLogout`        | `Function`                                                                                                                                                                | Callback invoked after the user clicks log out                                                                                                             | `() => {}`                                                                                                                                                                    |
| `onProductChange` | `Function`                                                                                                                                                                | Callback invoked after the user clicks a product.                                                                                                          | `() => {}`                                                                                                                                                                    |
| `hosts`           | `{ cloud, support, university, account }`                                                                                                                                 | Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<UserMenu />` to work across all environments. | `{ cloud: 'cloud.mongodb.com', support: 'support.mongodb.com', university: 'university.mongodb.com', account: 'account.mongodb.com' }`                                        |
| `urls`            | `{ userMenu:{ cloud: { userPreferences, organizations, invitations, mfa }, university: { universityPreferences }, support: { userPreferences }, account: { homepage } }}` | Object to enable custom overrides for every `href` used in `<UserMenu />`.                                                                                 | If overrides are not passed in, default values are constructed based on hosts prop. In the absence of the hosts prop, will default to URLS that suit a production environment |
| `activeNav`       | `UserMenuCloudInvitations`, `UserMenuCloudMFA`, `UserMenuCloudOrganizations`, `UserMenuCloudOther`, `UserMenuCloudUserPreferences`                                        | Determines what MenuItem to display as active.                                                                                                             |                                                                                                                                                                               |
