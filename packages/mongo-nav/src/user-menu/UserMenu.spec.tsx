import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { urlFixtures, hostDefaults } from '../data';
import UserMenu from '.';

const account = {
  firstName: 'Leafy',
  lastName: 'Green',
  email: 'leafy@mongodb.com',
};
const onLogout = jest.fn();
const onProductChange = jest.fn();

function renderUserMenu(props = {}) {
  const utils = render(
    <UserMenu
      account={account}
      onLogout={onLogout}
      onProductChange={onProductChange}
      urls={urlFixtures}
      hosts={hostDefaults}
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
  });

  test('when "activeProduct" is set to "cloud, renders Cloud MenuItems', () => {
    const { getByTestId, getByText } = renderUserMenu({
      activeProduct: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const userPreferences = getByText('User Preferences');
    const invitations = getByText('Invitations');
    const organizations = getByText('Organizations');
    const mfa = getByText('Two-Factor Authentication');

    expect(userPreferences).toBeInTheDocument();
    expect(invitations).toBeInTheDocument();
    expect(organizations).toBeInTheDocument();
    expect(mfa).toBeInTheDocument();
  });

  test('renders university MenuItems when university dropdown is clicked and closes other SubMenus', () => {
    const { getByTestId } = renderUserMenu({
      activeProduct: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const university = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[1];

    const universityArrowButton = university?.parentNode?.querySelector(
      'button',
    );

    fireEvent.click(universityArrowButton as HTMLElement);

    const universityMenuItem = getByTestId(
      'user-menuitem-university-preferences',
    );
    expect(universityMenuItem).toBeInTheDocument();
  });

  test('atlas MenuItem links to cloud.mongodb.com', () => {
    const { getByTestId } = renderUserMenu({
      activeProduct: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const atlasItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[0];
    expect((atlasItem as HTMLAnchorElement).href).toBe(
      'https://cloud.mongodb.com/',
    );
  });

  test('university MenuItem links to university.mongodb.com', () => {
    const { getByTestId } = renderUserMenu({
      activeProduct: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const universityItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[1];
    expect((universityItem as HTMLAnchorElement).href).toBe(
      'https://university.mongodb.com/',
    );
  });

  test('support MenuItem links to support.mongodb.com', () => {
    const { getByTestId } = renderUserMenu({
      activeProduct: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);

    const supportItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[2];
    expect((supportItem as HTMLAnchorElement).href).toBe(
      'https://support.mongodb.com/',
    );
  });

  test('onLogout fires when logout is clicked', () => {
    const { getByText, getByTestId } = renderUserMenu({
      activeProduct: 'cloud',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);
    const logout = getByText('Log out');

    fireEvent.click(logout);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  test('renders the account link as a disabled button when set to the empty string', () => {
    const { getByText, getByTestId } = renderUserMenu({
      activeProduct: 'account',
    });
    const trigger = getByTestId('user-menu-trigger');
    fireEvent.click(trigger);
    const accountButton = getByText('Manage your MongoDB Account')
      .parentElement as HTMLButtonElement;
    expect(accountButton.tagName.toLowerCase()).toBe('button');
    expect(accountButton.disabled).toBe(true);
    expect(accountButton.getAttribute('aria-disabled')).toBe('true');
  });

  test('does not render atlas MenuItems when a non-cloud product is active', () => {
    const { queryByText, getByTestId } = renderUserMenu({
      activeProduct: 'account',
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
      const { getByTestId, getByText } = renderUserMenu({
        activeProduct: 'university',
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
});
