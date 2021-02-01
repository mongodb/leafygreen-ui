import React from 'react';
import {
  render,
  fireEvent,
  getByLabelText,
  waitFor,
  screen,
} from '@testing-library/react';
import { JestDOM } from '@leafygreen-ui/testing-lib';
import { urlFixtures, hostDefaults } from '../data';
import UserMenu from '.';

const defaultAccount = {
  firstName: 'Leafy',
  lastName: 'Green',
  email: 'leafy@mongodb.com',
  hasLegacy2fa: true,
  admin: false,
};
const onLogout = jest.fn();
const onProductChange = jest.fn();

function renderUserMenu(props = {}, account = defaultAccount) {
  const utils = render(
    <UserMenu
      account={account}
      onLogout={onLogout}
      onProductChange={onProductChange}
      urls={urlFixtures}
      hosts={hostDefaults()}
      {...props}
    />,
  );

  return utils;
}

describe('packages/mongo-nav/user-menu', () => {
  test('by default, renders closed UserMenu with users name in button', () => {
    const { getByTestId } = renderUserMenu();
    const trigger = getByTestId('user-menu-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  test('when "activePlatform" is set to "cloud", renders Cloud MenuItems', () => {
    const { getByTestId, getByText } = renderUserMenu({
      activePlatform: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const userPreferences = getByText('User Preferences');
    const invitations = getByText('Invitations');
    const organizations = getByText('Organizations');
    const mfa = getByText('Legacy 2FA');

    expect(userPreferences).toBeInTheDocument();
    expect(invitations).toBeInTheDocument();
    expect(organizations).toBeInTheDocument();
    expect(mfa).toBeInTheDocument();
  });

  test('renders university MenuItems when university dropdown is clicked and closes other SubMenus', async () => {
    const { getByTestId, getByText } = renderUserMenu({
      activePlatform: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const universitySubMenu = getByText('University').closest('li');
    const universityTrigger = getByLabelText(
      universitySubMenu!,
      'Open Sub-menu',
    );
    await waitFor(() => expect(universityTrigger).toBeVisible());

    fireEvent.click(universityTrigger);

    const universityItem = getByText('University Preferences');
    expect(universityItem).toBeVisible();
  });

  test('when "shouldSeeAccountMfaBanner" is set to false, does not render the Account MFA Banner', () => {
    const { getByTestId, queryByText } = renderUserMenu({
      account: {
        ...defaultAccount,
        shouldSeeAccountMfaBanner: false,
      },
    });

    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    expect(
      queryByText('MFA is now available for your MongoDB Account!'),
    ).not.toBeInTheDocument();
  });

  test('when "shouldSeeAccountMfaBanner" is set to true, renders the Account MFA Banner', () => {
    const { getByTestId, getByText } = renderUserMenu({
      account: {
        ...defaultAccount,
        shouldSeeAccountMfaBanner: true,
      },
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const accountMfaBanner = getByText(
      'MFA is now available for your MongoDB Account!',
    );
    expect(accountMfaBanner).toBeInTheDocument();
  });

  test('when "hasLegacy2fa" is set to false, does not render mfa menu item', () => {
    const { queryByText, getByTestId } = renderUserMenu({
      activePlatform: 'cloud',
      account: {
        ...defaultAccount,
        hasLegacy2fa: false,
      },
    });

    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);
    expect(queryByText('Legacy 2FA')).not.toBeInTheDocument();
  });

  describe('SubMenus link to their respective URL', () => {
    beforeEach(() => {
      renderUserMenu({ activePlatform: 'cloud' });

      const trigger = screen.getByTestId('user-menu-trigger');
      fireEvent.click(trigger);
    });

    test('atlas SubMenu links to cloud.mongodb.com', () => {
      const cloud = screen.getByText('Cloud').closest('a');
      expect(cloud?.href).toBe('https://cloud.mongodb.com/');
    });

    test('university SubMenu links to university.mongodb.com', () => {
      const cloud = screen.getByText('University').closest('a');
      expect(cloud?.href).toBe('https://university.mongodb.com/');
    });

    test('docs SubMenu links to docs.mongodb.com', () => {
      const cloud = screen.getByText('Documentation').closest('a');
      expect(cloud?.href).toBe('https://docs.mongodb.com/');
    });

    test('devhub SubMenu links to developer.mongodb.com', () => {
      const cloud = screen.getByText('Developer Hub').closest('a');
      expect(cloud?.href).toBe('https://developer.mongodb.com/');
    });

    test('support SubMenu links to support.mongodb.com', () => {
      const cloud = screen.getByText('Support').closest('a');
      expect(cloud?.href).toBe('https://support.mongodb.com/');
    });
  });

  test('onLogout fires when logout is clicked', async () => {
    const { getByText, getByTestId } = renderUserMenu({
      activePlatform: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);
    const logout = getByText('Log out');

    await JestDOM.silenceNavigationErrors(async waitForNavigation => {
      fireEvent.click(logout);

      await waitForNavigation();
    });

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  test('renders the account link as a disabled button when set to the empty string', () => {
    const { getByTestId } = renderUserMenu({
      activePlatform: 'account',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);
    const accountButton = getByTestId(
      'user-menu-account-button',
    ) as HTMLButtonElement;

    expect(accountButton.tagName.toLowerCase()).toBe('button');
    expect(accountButton.disabled).toBe(true);
    expect(accountButton.getAttribute('aria-disabled')).toBe('true');
  });

  test('does not render atlas MenuItems when a non-cloud product is active', () => {
    const { queryByText, getByTestId } = renderUserMenu({
      activePlatform: 'account',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const userPreferences = queryByText('User Preferences');
    const invitations = queryByText('Invitations');
    const organizations = queryByText('Organizations');
    const mfa = queryByText('Two-Factor Authentication');

    expect(userPreferences).toBeNull();
    expect(invitations).toBeNull();
    expect(organizations).toBeNull();
    expect(mfa).toBeNull();
  });

  describe('renders appropriate links to SubMenu Items based on overrides prop', () => {
    test('renders particular url override, when the urls prop is set', () => {
      const { getByTestId } = renderUserMenu({
        activePlatform: 'university',
      });

      const trigger = getByTestId('user-menu-trigger');
      fireEvent.click(trigger);

      const universitySubMenuItem = getByTestId(
        'user-menuitem-university-preferences',
      );
      expect((universitySubMenuItem as HTMLAnchorElement).href).toBe(
        'https://university.mongodb.com/override-test',
      );
    });
  });

  describe('when the environment is set to "government"', () => {
    test('it renders "Cloud for Government" as the title of Cloud SubMenu', () => {
      const { getByTestId, getByText } = renderUserMenu({
        activePlatform: 'cloud',
        environment: 'government',
      });

      const trigger = getByTestId('user-menu-trigger');
      fireEvent.click(trigger);

      expect(getByText('Cloud for Government')).toBeInTheDocument();
    });

    test('it renders "cloud.mongodbgov.com" as description for Cloud SubMenu', () => {
      const { getByTestId, getByText } = renderUserMenu({
        activePlatform: 'cloud',
        environment: 'government',
      });

      const trigger = getByTestId('user-menu-trigger');
      fireEvent.click(trigger);
      expect(getByText('cloud.mongodbgov.com')).toBeInTheDocument();
    });

    test('mfa menu item does not appear', () => {
      const { queryByText, getByTestId } = renderUserMenu({
        activePlatform: 'cloud',
        environment: 'government',
      });

      const trigger = getByTestId('user-menu-trigger');
      fireEvent.click(trigger);
      expect(queryByText('Legacy 2FA')).not.toBeInTheDocument();
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('the types behave as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('does not error when all URLS are passed to urls prop', () => {
      <UserMenu urls={urlFixtures} />;
    });
    // eslint-disable-next-line jest/expect-expect
    test('does not error when only userMenu object is passed to urls prop', () => {
      <UserMenu
        urls={{
          userMenu: {
            cloud: {
              userPreferences: 'string',
              invitations: 'string',
              mfa: 'string',
              organizations: 'string',
            },
            university: {
              universityPreferences: 'string',
            },
            support: {
              userPreferences: 'string',
            },
          },
        }}
      />;
    });
  });
});
