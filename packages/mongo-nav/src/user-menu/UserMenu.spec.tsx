import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { urlDefaults, hostDefaults } from '../data';
import UserMenu from '.';

afterAll(cleanup);

describe('packages/UserMenu', () => {
  const account = {
    firstName: 'Leafy',
    lastName: 'Green',
    email: 'leafy@mongodb.com',
  };
  const onElementClick = jest.fn();
  const onProductChange = jest.fn();

  const renderedComponent = render(
    <UserMenu
      account={account}
      activeProduct={'cloud'}
      onElementClick={onElementClick}
      onProductChange={onProductChange}
      urls={urlDefaults}
      hosts={hostDefaults}
    />,
  );

  const { getByText } = renderedComponent;
  test('renders closed UserMenu with users name in button by default', () => {
    const leafy = getByText('Leafy');
    expect(leafy).toBeInTheDocument();
  });

  test('opens when trigger is clicked', () => {
    const trigger = getByText('Leafy');
    fireEvent.click(trigger);
  });

  test('renders atlas MenuItems when atlas is the active product', () => {
    const userPreferences = getByText('User Preferences');
    const invitations = getByText('Invitations');
    const organizations = getByText('Organizations');
    const mfa = getByText('Two-Factor Authorization');

    expect(userPreferences).toBeInTheDocument();
    expect(invitations).toBeInTheDocument();
    expect(organizations).toBeInTheDocument();
    expect(mfa).toBeInTheDocument();
  });

  test('renders university MenuItems when university dropdown is clicked and closes other SubMenus', () => {
    const userPreferences = getByText('User Preferences');
    const university = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[1];

    const universityArrowButton = university?.parentNode?.querySelector(
      'button',
    );
    fireEvent.click(universityArrowButton as HTMLElement);

    const universityMenuItem = getByText('Video Preferences');
    expect(universityMenuItem).toBeInTheDocument();
    waitForElementToBeRemoved(() => userPreferences).then(() =>
      expect(userPreferences).not.toBeVisible(),
    );
  });

  test('atlas MenuItem links to cloud.mongodb.com', () => {
    const atlasItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[0];
    expect((atlasItem as HTMLAnchorElement).href).toBe(
      'https://cloud.mongodb.com/',
    );
  });

  test('university MenuItem links to university.mongodb.com', () => {
    const universityItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[1];
    expect((universityItem as HTMLAnchorElement).href).toBe(
      'https://university.mongodb.com/',
    );
  });

  test('support MenuItem links to support.mongodb.com', () => {
    const supportItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[2];
    expect((supportItem as HTMLAnchorElement).href).toBe(
      'https://support.mongodb.com/',
    );
  });

  test('onLogout fires when logout is clicked', () => {
    const logout = getByText('Logout');

    fireEvent.click(logout);

    expect(onElementClick).toHaveBeenCalledTimes(1);
  });

  describe('renders appropriate links to SubMenu Items based on overrides prop', () => {
    test('renders particular url override, when the urls prop is set', () => {
      const universityItem = document.querySelectorAll(
        '[data-leafygreen-ui="sub-menu-container"]',
      )[1];

      fireEvent.click(universityItem);

      const universitySubMenuItem = getByText('Video Preferences');
      expect(
        (universitySubMenuItem?.parentNode?.parentNode as HTMLAnchorElement)
          .href,
      ).toBe('https://university.mongodb.com/override-test');
    });
  });

  test('renders the account link as a disabled button when set to the empty string', () => {
    renderedComponent.rerender(
      <UserMenu
        account={account}
        activeProduct="account"
        urls={urlDefaults}
        hosts={hostDefaults}
      />,
    );

    const accountButton = getByText('Manage your MongoDB Account')
      .parentElement as HTMLButtonElement;
    expect(accountButton.tagName.toLowerCase()).toBe('button');
    expect(accountButton.disabled).toBe(true);
    expect(accountButton.getAttribute('aria-disabled')).toBe('true');
  });
});
